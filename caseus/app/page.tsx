"use client"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import 'lenis/dist/lenis.css'
import { ReactLenis } from 'lenis/react';



gsap.registerPlugin(ScrollTrigger)

export default function Home() {
    const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time);
      requestAnimationFrame(update);
    }
    const rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const videoWrapper = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "+=1500",
        scrub: true,
        pin: true,
      },
    });

    // Анимация уменьшения видео
    tl.to(videoWrapper.current, {
      scale: 0.2,
      x: "75vw",
      y: "1vh",
      transformOrigin: "top left",
      ease: "power2.out",
    });

    // Анимация исчезновения текста
    tl.to(
      textRef.current,
      {
        opacity: 0,
        y: -100,
        ease: "power2.out",
      },
      "<" // одновременно с предыдущим
    );
  }, []);


  return (
    <>
      <ReactLenis root options={{ autoRaf: true }} ref={lenisRef} />
     
    <section className="h-screen w-screen" id="hero">
      <div className="h-screen w-screen p-4 relative">

        
       <div className="" ref={videoWrapper}>
          <video
            src="/titul.mp4"
            className="hidden md:block w-full h-full object-cover rounded-3xl z-1"
            autoPlay
            muted
            loop
          />
          <video
            src="/titul_small.mp4"
            className="block md:hidden w-full h-full object-cover rounded-3xl"
            autoPlay
            muted
            loop
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center md:justify-between z-10" ref={textRef}>
          <h3 className="z-1  lg:text-2xl   text-xl text-white uppercase font-thin ">CREATIVE STUDIO</h3>
          <h3 className="z-100   lg:text-2xl   text-xl text-white uppercase font-thin">INGENIOUS</h3>
       </div>


      </div>
    </section>
    <section className="h-screen"></section>
    <section className="h-screen"></section>
    </>
  );
}
