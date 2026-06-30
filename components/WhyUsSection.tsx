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

  // Mobile video positioning, smooth FadeIn, and stopping before footer
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return;

    const container = videoContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      const section = section3Ref.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // 1. Control opacity (FadeIn as user scrolls from Projects to Why Us)
      let opacity = 0;
      if (rect.top < vh * 0.95) {
        // Starts fading in at 95% of viewport, fully visible at 45% of viewport
        const progress = (vh * 0.95 - rect.top) / (vh * 0.5);
        opacity = Math.min(1, Math.max(0, progress));
      }

      // 2. Control vertical translation (pin to section bottom when footer comes up)
      let y = 0;
      const GAP = 16; // matching bottom-4 (16px)
      const limit = vh - GAP;

      if (rect.bottom < limit) {
        y = rect.bottom - limit; // translate upwards (negative y)
      }

      container.style.opacity = opacity.toString();
      container.style.transform = `translateY(${y}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll(); // run once on mount

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
          const endPos = isMobile ? "top 30%" : "+=150";

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
      {/* ── Mobile Video: fixed at bottom-right, translated upwards at section end to avoid footer ── */}
      <div
        ref={videoContainerRef}
        className="fixed bottom-4 right-4 w-36 h-36 flex items-center justify-center z-30 pointer-events-none md:hidden"
        style={{ opacity: 0 }}
      >
        <svg width="0" height="0" className="absolute">
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
            {/* Brand blue heading — fixed width so paragraphs align consistently on the right */}
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
