"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { translations, Locale } from "@/utils/translations";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

export default function WhyUsSection({ locale }: { locale: Locale }) {
  const section3Ref = useRef<HTMLElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const whyUsVideoOne = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const t = translations[locale].whyUs;

  // Mobile video: FadeIn + move top → bottom across section, stop at the end
  useEffect(() => {
    const container = videoContainerRef.current;
    if (!container) return;

    const videoVisualHeight = 150;
    const gap = 16;

    // Use gsap.matchMedia so this re-evaluates if the user resizes the window
    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {
      const vh = window.innerHeight;
      const endTop = vh - videoVisualHeight - gap;

      // Start hidden at top-right
      gsap.set(container, { opacity: 0, top: gap });

      // 1. FadeIn as section enters
      gsap.to(container, {
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#why-us",
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
      });

      // 2. Slide top → bottom while section scrolls through viewport
      gsap.fromTo(
        container,
        { top: gap },
        {
          top: endTop,
          ease: "none",
          scrollTrigger: {
            trigger: "#why-us",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      // Cleanup when breakpoint changes back to desktop
      return () => {
        gsap.set(container, { clearProps: "all" });
      };
    });

    return () => mm.revert();
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
        if (ctx) ctx.revert();

        const headings = el.querySelectorAll("h2");
        const paragraphs = el.querySelectorAll("p");
        headings.forEach((h, i) => {
          if (t[i]) h.textContent = t[i].title;
        });
        paragraphs.forEach((p, i) => {
          if (t[i]) p.textContent = t[i].description;
        });

        ScrollTrigger.refresh();

        ctx = gsap.context(() => {
          const isMobile = window.innerWidth < 768;
          const endPos = isMobile ? "bottom 55%" : "+=300";

          gsap.set(headings, { opacity: 0 });
          gsap.set(paragraphs, { opacity: 0 });

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

    setupAnimations(900);

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

  return (
    <section
      className="relative min-h-screen w-full pt-20 why-us md:mb-40 pb-20 rounded-3xl"
      id="why-us"
      ref={section3Ref}
    >
      {/*
        ── Mobile: cheese video, fixed to viewport right edge, slides top→bottom
           as user scrolls through Why Us section. Invisible on other sections.
           Container is `fixed` — GSAP animates `top` via ScrollTrigger.
      ──*/}
      <div
        ref={videoContainerRef}
        className="fixed right-4 md:hidden z-30 pointer-events-none"
        style={{ top: 16, opacity: 0 }}
      >
        {/* SVG chroma-key: strips black background, keeps rich blue */}
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
      </div>

      {/* ── Text content ── */}
      <div className="flex flex-col mx-2 md:mx-10 gap-10 md:gap-16 lg:gap-20" ref={text3Ref}>
        {t.map((item, idx) => (
          <div key={idx} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
            <h2 className="text-5xl md:text-6xl font-heading text-[#0802E2] md:w-[320px] lg:w-[400px] shrink-0">
              {item.title}
            </h2>
            <p className="flex-1 text-xl md:text-2xl lg:text-3xl pt-1 md:pt-0 leading-snug break-words md:text-right">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
