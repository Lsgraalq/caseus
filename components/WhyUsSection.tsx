"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { translations, Locale } from "@/utils/translations";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

export default function WhyUsSection({ locale }: { locale: Locale }) {
  const section3Ref = useRef(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const whyUsVideoOne = useRef(null);

  const t = translations[locale].whyUs;

  // Video pin animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        const tl4 = gsap.timeline({
          scrollTrigger: {
            trigger: "#why-us",
            start: "top 40%",
            end: "bottom 30%",
            scrub: true,
            markers: false,
            pin: whyUsVideoOne.current,
          },
        });

        tl4.fromTo(whyUsVideoOne.current, { opacity: 0 }, { opacity: 1, duration: 0.2 })
           .fromTo(whyUsVideoOne.current, { y: 0 }, { y: -250, duration: 3 }, "<")
           .fromTo(whyUsVideoOne.current, { opacity: 1 }, { opacity: 0, duration: 0.5 }, "-=0.5");
      });
    });

    return () => ctx.revert();
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

  return (
    <section className="min-h-screen w-full pt-20 why-us md:mb-40 pb-20 rounded-3xl" id="why-us" ref={section3Ref}>
      <div className="relative md:hidden">
        <video
          loop
          autoPlay
          muted
          playsInline
          className="absolute right-4 top-0 w-44 rotate-90 rounded-xl"
          ref={whyUsVideoOne}
        >
          <source src="/Cheese Raster Blue.mp4" type="video/mp4" />
          <source src="/Cheese Raster Blue.mov" type="video/quicktime" />
          Ваш браузер не поддерживает видео.
        </video>
      </div>

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
