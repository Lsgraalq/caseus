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
      const isMobile = window.innerWidth < 400;
      const x = isMobile ? 200 : 245;

      const tl4 = gsap.timeline({
        scrollTrigger: {
          trigger: "#why-us",
          start: "top 95%",
          end: "bottom 50%",
          scrub: true,
          markers: false,
          pin: whyUsVideoOne.current,
        },
      });

      tl4.fromTo(whyUsVideoOne.current, { x: 0 }, { x: x, rotate: 90, duration: 0 })
         .fromTo(whyUsVideoOne.current, { opacity: 0 }, { opacity: 1, duration: 0.2 })
         .fromTo(whyUsVideoOne.current, { y: 0 }, { y: -450, duration: 3 }, "<")
         .fromTo(whyUsVideoOne.current, { opacity: 1 }, { opacity: 0, duration: 0.5 }, "-=0.5");
    });

    return () => ctx.revert();
  }, []);

  // Text scramble animation — runs after a delay so GSAP knows the
  // hero pin-spacer height and measures correct scroll positions.
  useEffect(() => {
    const el = text3Ref.current;
    if (!el) return;

    let ctx: gsap.Context;

    const timer = setTimeout(() => {
      // Refresh so ScrollTrigger knows the full page height (pin spacer included)
      ScrollTrigger.refresh();

      ctx = gsap.context(() => {
        const isMobile = window.innerWidth < 768;
        const endPos = isMobile ? "bottom 55%" : "+=300";

        // Animate both headings and paragraphs
        const headings = el.querySelectorAll("h2");
        const paragraphs = el.querySelectorAll("p");

        // Set initial state
        gsap.set(headings, { opacity: 0 });
        gsap.set(paragraphs, { opacity: 0 });

        // Scramble headings (brand blue)
        headings.forEach((h) => {
          const originalText = h.textContent || "";
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
        paragraphs.forEach((p) => {
          const originalText = p.textContent || "";
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
    }, 900); // wait for hero pin spacer to be measured

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [locale]);

  return (
    <section className="min-h-screen w-full pt-20 why-us md:mb-40 pb-20 rounded-3xl" id="why-us" ref={section3Ref}>
      <div className="relative md:hidden items-center">
        <video loop autoPlay muted src="/whyUsVideoOne.mp4" className="absolute w-50 rotate-90 rounded-xl" ref={whyUsVideoOne}></video>
      </div>

      <div className="flex flex-col mx-4 md:mx-16 lg:mx-24 gap-10 md:gap-16 lg:gap-20" ref={text3Ref}>
        {t.map((item, idx) => (
          <div key={idx} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
            {/* Brand blue heading — fixed width so paragraphs align consistently on the right */}
            <h2 className="text-5xl md:text-6xl font-heading text-[#0802E2] md:w-[320px] lg:w-[400px] shrink-0">{item.title}</h2>
            <p className="flex-1 text-xl md:text-2xl lg:text-3xl pt-1 md:pt-0 leading-snug break-words">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
