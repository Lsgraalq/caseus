"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { translations, Locale } from "@/utils/translations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer({ locale }: { locale: Locale }) {
  const t = translations[locale].footer;
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggerEl = document.getElementById("scroll-container");
      if (triggerEl) {
        gsap.set(footerRef.current, { opacity: 0, visibility: "hidden" });
        ScrollTrigger.create({
          trigger: triggerEl,
          start: "bottom top",
          onEnter: () => gsap.set(footerRef.current, { opacity: 1, visibility: "visible" }),
          onLeaveBack: () => gsap.set(footerRef.current, { opacity: 0, visibility: "hidden" }),
        });
      } else {
        gsap.set(footerRef.current, { opacity: 1, visibility: "visible" });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="mb-[110vh] bg-[#0500FF]"></div>
      {/* --- STICKY FOOTER LAYER --- */}
      <div 
        ref={footerRef}
        className="bg-[#0500FF] h-screen flex flex-col w-screen px-3 text-white fixed bottom-0 md:px-10"
      >
        
        {/* Footer Heading */}
        <div className={t.headingClass}>
          {t.heading.split("\n").map((line, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <br />}
              {line}
            </React.Fragment>
          ))}
        </div>
        
        {/* Footer Contacts & Links */}
        <div className="pt-15 flex flex-col gap-10">
          
          <div className="flex flex-col gap-2">
            <p className="text-lg apercu-bold md:text-2xl">{t.jobInquiry}</p>
            <a href="mailto:caseusdigitalagency@gmail.com" className="text-sm apercu-thin md:text-xl underline">
              caseusdigitalagency@gmail.com
            </a>
          </div>
          
          <div className="flex flex-col gap-1 md:gap-5">
            <p className="text-lg apercu-bold md:text-2xl">{t.followUs}</p>
            <div className="flex flex-row gap-2">
              <a href="https://www.instagram.com/caseus.studio/" className="text-lg apercu-thin md:text-2xl underline">Instagram</a>
              <a href="https://www.youtube.com/@Caseus.studio" className="text-lg apercu-thin md:text-2xl underline">YouTube</a>
              <a href="https://www.tiktok.com/@caseus.studio" className="text-lg apercu-thin md:text-2xl underline">TikTok</a>
            </div>
          </div>
          
          {/* Footer Bottom Bar */}
          <div className="flex flex-row">
            <div className="flex flex-row gap-5 w-full">
              <p className="text-sm md:text-xl">Caseus ©2026</p> 
              <Link href="/impressum" className="text-sm apercu-thin md:text-xl underline">Impressum</Link>
            </div>
            
            <div className="flex-row gap-1 md:flex hidden">
              {locale === "en" ? (
                <>
                  <div className="apercu-bold underline">EN</div>
                  /
                  <Link href="/de" scroll={false} className="apercu-thin hover:underline">DE</Link>
                </>
              ) : (
                <>
                  <Link href="/en" scroll={false} className="apercu-thin hover:underline">EN</Link>
                  /
                  <div className="apercu-bold underline">DE</div>
                </>
              )}
            </div>
          </div>

        </div>
        <div></div>
      </div>
    </>
  );
}
