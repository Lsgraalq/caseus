"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import SplitText from "gsap/SplitText";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText,ScrollTrigger)

export default function Home() {
  const lenisRef = useRef<any>(null);
  const textRef = useRef(null);
  const heroTextRef = useRef(null);
  const videoRef = useRef(null);
  const videoWrapper = useRef(null);
  

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
    return () => split.revert();
  };
   
  },[]);



   useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isMobile = window.innerWidth < 768;
    const heroHeight = isMobile ? 1000 : 2500;
    const split = new SplitText(heroTextRef.current, {
  type: "lines,words"
});

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: heroHeight,
        scrub: true,
        pin: true,
      },
    });

  
    tl.fromTo(
  videoRef.current,
  {
    scale: 1,
   
    transformOrigin: "top left",
  },
  {
    scale: 0.2,
    duration:1,
    ease: "power1.out",
  },
  
).fromTo(videoRef.current, 
  { x: "0vw",
    y: "0vh",},
  { x: "75vw",
    y: "0vh",
    duration:1,
  ease: "power1.out",},
  "-=1"
).fromTo(split.lines, {
  y: 0,
  
  },
  {duration:1,ease: "power2.out", y: -500,},
  "-=0.9"
).fromTo(
  split.words,
  { color: "#DEE2E6" },
  {
    color: "#000000",
    stagger: 0.03,
    },
    "-=0.7"
);

  }, []);

  

  return (
    <>
      <AnimatedNavbar />

      <ReactLenis root options={{ autoRaf: true }} ref={lenisRef} />
      {/* HERO SECRION */}
      <section className="h-screen w-full " id="hero">
        <div className="relative p-0 m-0 ">
          {/* Video hero section */}
          <div className="w-full h-screen z-0" ref={videoRef}>
            <video
              src="/titul.mp4"
              className="hidden md:block w-full h-full object-cover rounded-4xl p-5 "
              autoPlay
              muted
              
              loop
            />
            {/* second video in hero section for phones */}
            <video
              src="/titul_small.mp4"
              className="block md:hidden w-full h-full object-cover rounded-3xl  p-4 "
              autoPlay
              muted
              loop
            />
          </div>

          {/* text above hero section with pos absolute*/}
          <div className="w-full absolute  top-0  grid grid-rows-2 h-screen gap-30 md:grid-cols-2 md:gap-0" ref={textRef}>
            <h3 className="lg:text-2xl text-xl  uppercase font-thin md:text-left text-center self-end row-span-1 md:col-span-1 md:pl-20">
              CREATIVE STUDIO
            </h3>
            <h3 className="lg:text-2xl text-xl  uppercase font-thin md:text-left text-center row-span-1 md:col-span-1 md:self-end ">
              MULTYDISCIPLINARY
            </h3>
          </div>

        </div>
        {/* animated text hero section */}
        <div className=" max-w-[70%] md:max-w-[70%] pl-5" ref={heroTextRef} id="suka">
        <p className="text-gray-400 text-4xl z-2 md:text-6xl">Combining creativity and expertise, we reveal the character of brands that stand out in their time.</p>
        </div>
      </section>

      <section className="min-h-screen w-full mx-auto px-5">
        <div className="grid grid-rows-3 md:grid-rows-4 gap-5 md:grid-cols-2 ">
        <div className="relative group rounded-2xl overflow-hidden md:col-span-1 md:row-span-1">
          <img src="photo2.jpg" alt="" className="block w-full rounded-2xl transition-opacity duration-300 group-hover:opacity-0" />
          <video src="video1.mp4" className=" absolute inset-0 w-full h-full opacity-0 object-cover group-hover:opacity-100 rounded-2xl transition-opacity duration-300" autoPlay muted loop onMouseEnter={e => e.currentTarget.play()} onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }} />
          <div className="absolute bottom-4 left-4"><p className="text-white">Your Button or Text</p></div>
        </div>
        <div className="relative group rounded-2xl overflow-hidden md:col-span-1  md:row-span-1" >
          <img src="photo1.jpg" alt="" className="block w-full rounded-2xl transition-opacity duration-300 group-hover:opacity-0" />
          <video src="video2.mp4" className=" absolute inset-0 w-full h-full  opacity-0 object-cover group-hover:opacity-100 rounded-2xl transition-opacity duration-300" autoPlay muted loop onMouseEnter={e => e.currentTarget.play()} onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }} />
          <div className="absolute bottom-4 left-4"><p className="text-white">Your Button or Text</p></div>
        </div>
        <div className="relative group rounded-2xl overflow-hidden md:col-span-2 md:h-[45%]  md:row-span-2">
          <img src="photo3.jpg" alt="" className="block w-full rounded-2xl transition-opacity duration-300 group-hover:opacity-0" />
          <video src="video3.mp4" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" autoPlay muted loop onMouseEnter={e => e.currentTarget.play()} onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }} />
          <div className="absolute bottom-4 left-4"><p className="text-white">Your Button or Text</p></div>
        </div>
        </div>
      </section>
      <section className="h-screen w-full"></section>
    </>
  );
}
