"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { translations, Locale } from "@/utils/translations";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

export default function WhyUsSection({ locale }: { locale: Locale }) {
  const section3Ref = useRef<HTMLElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const whyUsVideoOne = useRef<HTMLVideoElement>(null);

  // "fixed" = follows viewport corner, "absolute" = pinned to section bottom, "hidden" = invisible
  const [videoMode, setVideoMode] = useState<"hidden" | "fixed" | "absolute">("hidden");
  // Absolute offset from section bottom (px) when mode switches to "absolute"
  const [videoBottom, setVideoBottom] = useState(16);

  const t = translations[locale].whyUs;

  // Scroll listener: control video visibility + switch fixed ↔ absolute at section end
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return;

    const VIDEO_HEIGHT = 148; // rotated video apparent height (w-36 = 144px + a bit)
    const GAP = 16; // bottom-4 = 16px

    const onScroll = () => {
      const section = section3Ref.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Section fully outside viewport
      if (rect.bottom <= 0 || rect.top >= vh) {
        setVideoMode("hidden");
        return;
      }

      // How much space remains between viewport bottom and section bottom?
      // rect.bottom < (VIDEO_HEIGHT + GAP) means the section bottom is about to leave
      // which is when we want to anchor the video absolutely to prevent it going into footer
      if (rect.bottom <= VIDEO_HEIGHT + GAP * 2) {
        // Switch to absolute-within-section; keep video pinned to section bottom
        const offset = Math.max(GAP, vh - rect.bottom + GAP);
        setVideoBottom(offset);
        setVideoMode("absolute");
      } else {
        setVideoMode("fixed");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Text scramble animation with resize handling
  useEffect(() => {
    const el = text3Ref.current;
    if (!el) return;

    let ctx: gsap.Context | null = null;
    let timer: ReturnType<typeof setTimeout>;

    const setupAnimations = (delay: number) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // Revert previous context
        if (ctx) ctx.revert();

        // Restore original text from translations before GSAP scrambles it
        // (on resize the DOM might hold a partially scrambled state)
        const headings = el.querySelectorAll("h2");
        const paragraphs = el.querySelectorAll("p");
        headings.forEach((h, i) => {
          if (t[i]) h.textContent = t[i].title;
        });
        paragraphs.forEach((p, i) => {
          if (t[i]) p.textContent = t[i].description;
        });

        // Recalculate all ScrollTrigger positions (including hero pin spacer)
        ScrollTrigger.refresh();

        ctx = gsap.context(() => {
          const isMobile = window.innerWidth < 768;
          const endPos = isMobile ? "bottom 55%" : "+=300";

          // Set initial hidden state
          gsap.set(headings, { opacity: 0 });
          gsap.set(paragraphs, { opacity: 0 });

          // Scramble headings (brand blue)
          headings.forEach((h, i) => {
            const originalText = t[i]?.title || h.textContent || "";
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: h,
                start: "top 90%",
                end: endPos,
                scrub: true,
                markers: false,
              },
            });

            tl.fromTo(
              h,
              { opacity: 0, scrambleText: { text: "", revealDelay: 0.1 } },
              {
                opacity: 1,
                scrambleText: {
                  text: originalText,
                  chars: "upperCase",
                  speed: 0.6,
                  revealDelay: 0.1,
                },
                duration: 2,
              }
            );
          });

          // Scramble paragraphs
          paragraphs.forEach((p, i) => {
            const originalText = t[i]?.description || p.textContent || "";
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: p,
                start: "top 90%",
                end: endPos,
                scrub: true,
                markers: false,
              },
            });

            tl.fromTo(
              p,
              { opacity: 0, scrambleText: { text: "", revealDelay: 0.2 } },
              {
                opacity: 1,
                scrambleText: {
                  text: originalText,
                  chars: "upperCase",
                  speed: 0.5,
                  revealDelay: 0.2,
                },
                duration: 2,
              }
            );
          });
        });
      }, delay);
    };

    // Initial setup — wait for hero pin spacer to be measured
    setupAnimations(900);

    // On resize: wait longer to let HeroSection reinitialize its pin first,
    // then refresh and rebuild our ScrollTriggers.
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => setupAnimations(1100), 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      if (ctx) ctx.revert();
    };
  }, [locale]); // eslint-disable-line react-hooks/exhaustive-deps

  // Shared video element (rendered once, never unmounted to avoid GSAP issues)
  const videoEl = (
    <>
      {/* SVG chroma-key filter: strips black background while keeping rich blue */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter id="chroma-key">
            <feColorMatrix
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 3 0 0
              "
            />
          </filter>
        </defs>
      </svg>
      <video
        loop
        autoPlay
        muted
        playsInline
        className="w-36 rotate-90 rounded-xl"
        style={{ filter: "url(#chroma-key)" }}
        ref={whyUsVideoOne}
      >
        <source src="/Cheese Raster Blue.mp4" type="video/mp4" />
        <source src="/Cheese Raster Blue.mov" type="video/quicktime" />
      </video>
    </>
  );

  return (
    <section
      className="relative min-h-screen w-full pt-20 why-us md:mb-40 pb-20 rounded-3xl"
      id="why-us"
      ref={section3Ref}
    >
      {/* ── Mobile video: follows viewport bottom-right corner while in Why Us ── */}
      {videoMode !== "hidden" && (
        <div
          className="md:hidden z-30 pointer-events-none"
          style={
            videoMode === "fixed"
              ? { position: "fixed", bottom: 16, right: 16 }
              : { position: "absolute", bottom: videoBottom, right: 16 }
          }
        >
          {videoEl}
        </div>
      )}

      {/* ── Text content ── */}
      <div className="flex flex-col mx-2 md:mx-10 gap-10 md:gap-16 lg:gap-20" ref={text3Ref}>
        {t.map((item, idx) => (
          <div key={idx} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
            {/* Brand blue heading — fixed width so paragraphs align consistently on the right */}
            <h2 className="text-5xl md:text-6xl font-heading text-[#0802E2] md:w-[320px] lg:w-[400px] shrink-0">{item.title}</h2>
            <p className="flex-1 text-xl md:text-2xl lg:text-3xl pt-1 md:pt-0 leading-snug break-words md:text-right">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
