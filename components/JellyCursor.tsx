"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { translations, Locale } from "@/utils/translations";

export default function JellyCursor({ locale }: { locale: Locale }) {
  const t = translations[locale];

  // Global cursor animation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const elasticCursor = document.getElementById("jelly-cursor");
    const cursorDiv = document.getElementById("jelly-cursor") as HTMLDivElement;
    const cursorPointer = document.getElementById("cursor-event") as HTMLDivElement;
    const targetSection = document.querySelector(".why-us");

    const pos = { x: 0, y: 0 };
    const vel = { x: 0, y: 0 };
    let targetPos = { x: 0, y: 0 };

    const setX = gsap.quickSetter(elasticCursor, "x", "px");
    const setY = gsap.quickSetter(elasticCursor, "y", "px");

    function update() {
      setX(pos.x);
      setY(pos.y);
    }

    function animate() {
      const speed = 0.15;
      pos.x += (targetPos.x - pos.x) * speed;
      pos.y += (targetPos.y - pos.y) * speed;
      vel.x = targetPos.x - pos.x;
      vel.y = targetPos.y - pos.y;
      update();
      requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", (e) => {
      targetPos.x = e.clientX;
      targetPos.y = e.clientY;
      update();
    });

    function hideCursor() {
      gsap.to(elasticCursor, { opacity: 0, duration: 0.7, ease: "power2.out" });
    }

    function showCursor() {
      gsap.to(elasticCursor, { opacity: 1, duration: 0.7, ease: "power2.out" });
    }

    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("mouseenter", showCursor);

    const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      iframe.addEventListener("mouseenter", hideCursor);
      iframe.addEventListener("mouseleave", showCursor);
    });

    animate();

    // Hover effect for the 'Why Us' section
    if (targetSection && cursorPointer) {
      targetSection.addEventListener("mouseenter", () => {
        cursorPointer.style.display = "flex";
        if (cursorDiv) {
          cursorDiv.style.width = "200px";
          cursorDiv.style.border = "0px";
        }
      });

      targetSection.addEventListener("mouseleave", () => {
        cursorPointer.style.display = "none";
        if (cursorDiv) {
          cursorDiv.style.width = "42px";
          cursorDiv.style.border = "2px solid gray";
        }
      });
    }
  }, []);

  return (
    <div id="jelly-cursor" className="hidden md:flex" style={{ pointerEvents: "none" }}>
      <div className="text-[#0802E2] text-2xl border-b-1 pb-0 font-mono font-extralight tracking-widest" id="cursor-event" style={{ pointerEvents: "none" }}>
        {t.jellyCursor}
      </div>
    </div>
  );
}