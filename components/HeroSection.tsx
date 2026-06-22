"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { translations, Locale } from "@/utils/translations";

gsap.registerPlugin(SplitText, ScrollTrigger);

// Module-level variable to track if the Hero animation has run
let globalHeroAnimated = false;

export default function HeroSection({ locale }: { locale: Locale }) {
  const textRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroRef = useRef(null);

  const t = translations[locale].hero;

  // Initial Hero Animation and ScrollTrigger
  useEffect(() => {
    const ctx = gsap.context(() => {
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

      if (typeof window !== "undefined" && heroTextRef.current && globalVideo) {
        const isMobile = window.innerWidth < 768;
        const heroHeight = isMobile ? 1300 : 3000;
        const endHeight = isMobile ? 1250 : 3000;
        const startPosition = isMobile ? "top 60%" : "top 20%";
        const split = new SplitText(heroTextRef.current, { type: "lines,chars" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#scroll-container",
            start: "top top",
            end: heroHeight,
            scrub: true,
            pin: true,
          },
        });

        tl.fromTo(
          globalVideo,
          { scale: 1, transformOrigin: "top left" },
          { scale: 0.2, duration: 1, ease: "power1.out" }
        )
          .fromTo(
            globalVideo,
            { x: "0vw", y: "0vh" },
            { x: "75vw", y: "0vh", duration: 1, ease: "power1.out" },
            "-=1"
          )
          .fromTo(
            split.lines,
            { y: 0, opacity: 0.2 },
            { duration: 0.7, ease: "power1.out", y: -500, opacity: 1, stagger: 0.04 },
            "-=0.9"
          )
          .fromTo(
            split.chars,
            { color: "#ced4da" },
            { color: "#000", duration: 0.5, ease: "none", stagger: { amount: 1.2 } },
            "-=0.5"
          )
          .to(
            globalVideo,
            { y: "-100vh", duration: 0.5, ease: "none" },
            "+=0"
          );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div id="start"></div>
      <section className="h-screen w-full" id="scroll-container" ref={heroRef}>
        <div className="relative p-0 m-0">
          {/* Global video is rendered in layout and animated using globalVideo element reference */}
          <div className="w-full h-screen z-0" />
        </div>

        <div className="sm:max-w-[70%] md:max-w-[60%] lg:max-w-[70%] max-w-[75%] pl-5 lg:pl-20" ref={heroTextRef} id="animated-text">
          <p className="text-gray-400 text-4xl z-2 md:text-6xl lg:text-7xl">
            {t.mainParagraph}
          </p>
        </div>
      </section>
    </>
  );
}
