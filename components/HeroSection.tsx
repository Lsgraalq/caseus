"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { translations, Locale } from "@/utils/translations";

gsap.registerPlugin(SplitText, ScrollTrigger);

// Module-level variable to track if the Hero animation has run
let globalHeroAnimated = false;

// Helper function to calculate exact coordinates of a character relative to the wrapper,
// avoiding scroll-dependent and pinning coordinate bugs of getBoundingClientRect.
function getRelativeCoords(element: HTMLElement, wrapper: HTMLElement) {
  let x = 0;
  let y = 0;
  let curr: HTMLElement | null = element;
  while (curr && curr !== wrapper) {
    x += curr.offsetLeft || 0;
    y += curr.offsetTop || 0;
    curr = curr.offsetParent as HTMLElement;
  }
  return { x, y };
}

export default function HeroSection({ locale }: { locale: Locale }) {
  const textRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLParagraphElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const t = translations[locale].hero;

  // Initial Hero Animation and ScrollTrigger
  useEffect(() => {
    let ctx: gsap.Context;
    let isMounted = true;

    const initGsap = () => {
      if (!isMounted) return;
      if (ctx) ctx.revert();

      ctx = gsap.context(() => {
        const globalVideo = document.getElementById("global-bg-video-container");
        if (globalVideo) {
          if (globalHeroAnimated) {
            gsap.set(globalVideo, { opacity: 1, scale: 1, x: 0, scaleY: 1, scaleX: 1 });
          } else {
            gsap.fromTo(
              globalVideo,
              { transformOrigin: "top left", opacity: 0, scaleY: 0.25, x: 0, scaleX: 0.25 },
              { x: 0, scaleY: 1, opacity: 1, scale: 1, duration: 1, ease: "power3.inOut", onComplete: () => { globalHeroAnimated = true; } }
            );
          }
        }

        if (
          typeof window !== "undefined" &&
          heroTextRef.current &&
          wrapperRef.current &&
          cursorRef.current &&
          globalVideo
        ) {
          const isMobile = window.innerWidth < 768;
          const heroHeight = isMobile ? 900 : 1800;
          const split = new SplitText(heroTextRef.current, { type: "lines,chars" });

          // Set initial gray color for characters and hide cursor
          gsap.set(split.chars, { color: "#8a8a8f" });
          gsap.set(cursorRef.current, { display: "none" });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: "#scroll-container",
              start: "top top",
              end: heroHeight,
              scrub: true,
              pin: true,
              onLeave: () => {
                // Pin ended — show footer (it's covered by white content until page bottom)
                const footer = document.getElementById("site-footer");
                if (footer) gsap.set(footer, { opacity: 1, visibility: "visible" });
                // Make pin spacer opaque so footer doesn't bleed through the
                // transparent gap between hero and white content sections.
                const sc = document.getElementById("scroll-container");
                if (sc?.parentElement) sc.parentElement.style.backgroundColor = "#ffffff";
              },
              onEnterBack: () => {
                // Scrolled back into pin — hide footer and restore transparency
                const footer = document.getElementById("site-footer");
                if (footer) gsap.set(footer, { opacity: 0, visibility: "hidden" });
                const sc = document.getElementById("scroll-container");
                if (sc?.parentElement) sc.parentElement.style.backgroundColor = "transparent";
              },
            },
          });

          // 1. Video position/scale animation
          tl.fromTo(
            globalVideo,
            { scale: 1, transformOrigin: "top left" },
            { scale: 0.2, duration: 1.2, ease: "power2.out" }
          )
            .fromTo(
              globalVideo,
              { x: "0vw", y: "0vh" },
              { x: "75vw", y: "6vh", duration: 1.2, ease: "power2.out" },
              "-=1.2"
            )
            // 2. Rising text animation
            .fromTo(
              split.lines,
              { y: "80vh", opacity: 0 },
              { duration: 1.0, ease: "power2.out", y: 0, opacity: 1, stagger: 0.08 },
              "-=1.0"
            );

          // 3. Typing animation with moving cursor
          const chars = split.chars as HTMLElement[];
          const firstChar = chars[0];
          if (firstChar && wrapperRef.current) {
            const coords = getRelativeCoords(firstChar, wrapperRef.current);
            tl.set(cursorRef.current, {
              display: "block",
              x: coords.x,
              y: coords.y,
              height: firstChar.offsetHeight,
            });
          } else {
            tl.set(cursorRef.current, { display: "block" });
          }

          // Build sequential character color reveal and cursor steps
          const charDuration = 0.01;
          const charStagger = 0.02;

          chars.forEach((char, index) => {
            const timeOffset = `+=${charStagger}`;

            // Turn character color to brand blue
            tl.to(char, { color: "#0802E2", duration: charDuration }, timeOffset);

            // Move the cursor to the right side of this character (+2px gap)
            if (wrapperRef.current) {
              const coords = getRelativeCoords(char, wrapperRef.current);

              tl.to(
                cursorRef.current,
                {
                  x: coords.x + char.offsetWidth + 2,
                  y: coords.y,
                  height: char.offsetHeight,
                  duration: 0.01,
                  ease: "none",
                },
                "<"
              );
            }
          });

          // Hide cursor at the end
          tl.set(cursorRef.current, { display: "none" });

          // 4. Video fade out (ends with typing)
          tl.fromTo(
            globalVideo,
            { opacity: 1 },
            { opacity: 0, duration: 0.6, ease: "power2.out" },
            "-=0.6"
          );

          // 5. Pull up the main content trigger dynamically as the typing animation finishes
          const pullUpDistance = isMobile ? -80 : -220;
          tl.fromTo(
            "#main-content-trigger",
            { y: 0 },
            { y: pullUpDistance, duration: 1.5, ease: "power2.out" },
            "-=1.5"
          );

        }
      });
    };

    // Wait for fonts to load to prevent race conditions during SplitText coordinate calculation
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        initGsap();
      });
    } else {
      initGsap();
    }

    window.addEventListener("resize", initGsap);
    return () => {
      isMounted = false;
      if (ctx) ctx.revert();
      window.removeEventListener("resize", initGsap);
    };
  }, [locale]);

  return (
    <>
      <div id="start"></div>
      <section className="relative h-[85vh] w-full" id="scroll-container" ref={heroRef}>
        <div className="relative p-0 m-0">
          {/* Global video is rendered in layout and animated using globalVideo element reference */}
          <div className="w-full h-[85vh] z-0" />
        </div>

        <div className="absolute top-[6vh] left-0 sm:max-w-[65vw] md:max-w-[60vw] lg:max-w-[62vw] max-w-[70vw] pl-5 lg:pl-20" id="animated-text">
          <div className="relative" ref={wrapperRef}>
            {/* The single text layer (initially styling characters gray and coloring blue dynamically) */}
            <p ref={heroTextRef} className="text-gray-400 text-4xl md:text-6xl lg:text-7xl">
              {t.mainParagraph}
            </p>
            {/* Blinking typewriter cursor */}
            <span ref={cursorRef} className="absolute left-0 top-0 w-[5px] md:w-[6px] lg:w-[8px] bg-[#0802E2] rounded-sm pointer-events-none z-10" style={{ display: "none", animation: "cursorBlink 0.8s steps(2, start) infinite" }} />
          </div>
        </div>
      </section>
      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </>
  );
}
