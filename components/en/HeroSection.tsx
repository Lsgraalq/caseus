"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function HeroSection() {
  const textRef = useRef(null);
  const heroTextRef = useRef(null);
  const videoRef = useRef(null);
  const heroRef = useRef(null);

  // Initial Hero Animation
  useEffect(() => {
    if (typeof window !== "undefined" && videoRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        videoRef.current,
        { transformOrigin: "top left", opacity: 0, scaleY: 0.25, x: 0, scaleX: 0.25 },
        { x: 0, scaleY: 1, opacity: 1, scale: 1, duration: 1, ease: "power3.inOut" }
      );
    }
  }, []);

  // Header timeline animation (ScrollTrigger)
  useEffect(() => {
    if (typeof window !== "undefined" && heroTextRef.current) {
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
        videoRef.current,
        { scale: 1, transformOrigin: "top left" },
        { scale: 0.2, duration: 1, ease: "power1.out" }
      )
        .fromTo(
          videoRef.current,
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
        .to(
          videoRef.current,
          { y: -150, duration: 0.5, ease: "none" },
          "+=0"
        );

      gsap.timeline({
        scrollTrigger: {
          trigger: "#animated-text",
          start: startPosition,
          end: endHeight,
          scrub: true,
          markers: false,
          pin: false,
        },
      }).fromTo(split.chars, { color: "#ced4da" }, { color: "#000", stagger: 0.3 });
    }
  }, []);

  return (
    <>
      <div id="start"></div>
      <section className="h-screen w-full" id="scroll-container" ref={heroRef}>
        <div className="relative p-0 m-0">
          <div className="w-full h-screen z-0" ref={videoRef}>
            <video src="/StartScreen.mp4" className="hidden md:landscape:block w-full h-full object-cover rounded-4xl p-5" autoPlay muted loop />
            <video src="/Start Screen V.mp4" className="block md:landscape:hidden w-full h-full object-cover rounded-3xl p-4" autoPlay muted loop />
          </div>

          {/* Text block removed */}
        </div>

        <div className="max-w-[75%] md:max-w-[60%] lg:max-w-[70%] pl-5 lg:pl-20" ref={heroTextRef} id="animated-text">
          <p className="text-gray-400 text-4xl z-2 md:text-6xl lg:text-7xl">
            We make your impact visible. We handle websites, videos, and promotion, freeing up your time for what matters most — changing this world for the better.
          </p>
        </div>
      </section>
    </>
  );
}