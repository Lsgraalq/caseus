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
  }, []);

  // Text scramble animation
  useEffect(() => {
    const el = text3Ref.current;
    if (!el) return;

    const isMobile = window.innerWidth < 768;
    const pHeight = isMobile ? "bottom 55%" : "+=300";
    const paragraphs = el.querySelectorAll("p");

    gsap.set(paragraphs, { opacity: 0 });

    paragraphs.forEach((p) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: p,
          start: "top 90%",
          end: pHeight,
          scrub: true,
          markers: false,
        },
      });

      tl.fromTo(
        p,
        { opacity: 0, scrambleText: { text: "", revealDelay: 0.2 } },
        { opacity: 1, scrambleText: { text: p.textContent || "", chars: "upperCase", speed: 0.5, revealDelay: 0.2 }, duration: 2 }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="min-h-screen w-full pt-20 why-us md:mb-40 pb-20 rounded-3xl" id="why-us" ref={section3Ref}>
      <div className="relative md:hidden items-center">
        <video loop autoPlay muted src="/whyUsVideoOne.mp4" className="absolute w-50 rotate-90 rounded-xl" ref={whyUsVideoOne}></video>
      </div>

      <div className="flex flex-col mx-4 md:mx-10 gap-8 md:gap-15 lg:gap-20" ref={text3Ref}>
        {t.map((item, idx) => (
          <div key={idx} className="flex md:flex-row md:items-center flex-col">
            <h2 className="text-5xl flex-1 font-heading">{item.title}</h2>
            <p className="flex-1 md:flex-none text-3xl lg:text-4xl overflow-hidden pt-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
