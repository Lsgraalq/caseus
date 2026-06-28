"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { translations, Locale } from "@/utils/translations";

// Module-level variable to track if the preloader finished in this session
let globalPreloaderFinished = false;

export default function Preloader({ locale }: { locale: Locale }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(globalPreloaderFinished);
  const t = translations[locale];

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isFinished) {
      // Dispatch immediately so other components (navbar, etc.) know we're ready
      window.dispatchEvent(new Event("preloaderFinished"));
      return;
    }

    const nodes = Array.from(window.document.querySelectorAll("img, video"));
    let loaded = 0;
    const total = nodes.length;

    const tick = () => {
      loaded += 1;
      const pct = total ? Math.min(100, Math.round((loaded / total) * 100)) : 100;
      setProgress(pct);
      if (loaded >= total) {
        gsap.to(".preloader", {
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut",
          delay: 0.2,
          onComplete: () => {
            document.querySelector(".preloader")?.setAttribute("style", "display: none");
            (window as any).preloaderFinished = true;
            globalPreloaderFinished = true;
            setIsFinished(true);
            window.dispatchEvent(new Event("preloaderFinished"));
          }
        });
      }
    };

    nodes.forEach((el) => {
      if (el instanceof HTMLImageElement) {
        if (el.complete && el.naturalWidth > 0) tick();
        else {
          const on = () => {
            el.removeEventListener("load", on);
            el.removeEventListener("error", on);
            tick();
          };
          el.addEventListener("load", on);
          el.addEventListener("error", on);
        }
      } else if (el instanceof HTMLVideoElement) {
        if (el.readyState >= 3) tick();
        else {
          const on = () => {
            el.removeEventListener("loadeddata", on);
            el.removeEventListener("error", on);
            tick();
          };
          el.addEventListener("loadeddata", on);
          el.addEventListener("error", on);
        }
      }
    });

    if (total === 0) {
      setProgress(100);
      gsap.to(".preloader", {
        y: "-100%",
        duration: 0.8,
        ease: "power3.inOut",
        delay: 0.2,
        onComplete: () => {
          (window as any).preloaderFinished = true;
          globalPreloaderFinished = true;
          setIsFinished(true);
          window.dispatchEvent(new Event("preloaderFinished"));
        }
      });
    }
  }, [isFinished]);

  if (isFinished) {
    return null;
  }

  return (
    <div className="preloader fixed inset-0 flex flex-col items-center justify-center bg-[#0802E2] text-white z-50">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-64 h-64 object-contain mb-2 mix-blend-screen"
      >
        <source src="/Cheese Raster White.mp4" type="video/mp4" />
        <source src="/Cheese Raster White.mov" type="video/quicktime" />
        Ваш браузер не поддерживает видео.
      </video>
      <h1 className="text-[28px] font-mono font-extralight tracking-widest tabular-nums">
        {progress}%
      </h1>
    </div>
  );
}
