"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import SplitText from "gsap/SplitText";
import gsap from "gsap";

gsap.registerPlugin(SplitText)

export default function Home() {
  const lenisRef = useRef<any>(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);


    useEffect(() => {
    if (typeof window !== "undefined" && textRef.current) {
      const split = new SplitText(textRef.current, { type: "chars" });
    let tl = gsap.timeline();
    tl.from(split.chars, {
      x: 150,
      opacity: 0,
      duration: 0.5, 
      ease: "power4",
      stagger: 0.04,
      color: "#fffff"

    }).fromTo(
      videoRef.current,
      { transformOrigin: "top left", opacity: 0,  scaleY: 0.25 ,x:0, scaleX: 0.25},
      
      { x:0,
        scaleY:1,
        
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.inOut",
      }
    ).fromTo(
      split.chars,
      {color:"#000000"},
      {color:"#ffffff"},
      "-=1.05"
    )
  }
  },[]);



  // Scroll smoothing (Lenis)
  useEffect(() => {

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time);
      requestAnimationFrame(update);
    }
    const rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);

    

  }, []);

  

  return (
    <>
      <AnimatedNavbar />

      <ReactLenis root options={{ autoRaf: true }} ref={lenisRef} />

      <section className="h-screen w-full " id="hero">
        <div className="relative p-0 m-0 ">
          {/* Видеоблок */}
          <div className="w-full h-screen z-0" ref={videoRef}>
            <video
              src="/titul.mp4"
              className="hidden md:block w-full h-full object-cover rounded-3xl p-4 "
              autoPlay
              muted
              
              loop
            />
            <video
              src="/titul_small.mp4"
              className="block md:hidden w-full h-full object-cover rounded-3xl  p-4 "
              autoPlay
              muted
              loop
            />
          </div>

          {/* Текст поверх */}
          <div className="w-full absolute  top-0  grid grid-rows-2 h-screen gap-30 md:grid-cols-2 md:gap-0" ref={textRef}>
            <h3 className="lg:text-2xl text-xl  uppercase font-thin md:text-left text-center self-end row-span-1 md:col-span-1 md:pl-20">
              CREATIVE STUDIO
            </h3>
            <h3 className="lg:text-2xl text-xl  uppercase font-thin md:text-left text-center row-span-1 md:col-span-1 md:self-end ">
              MULTYDISCIPLINARY
            </h3>
          </div>

        </div>
      </section>

      <section className="h-screen w-full"></section>
      <section className="h-screen w-full"></section>
    </>
  );
}
