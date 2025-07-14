"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import SplitText from "gsap/SplitText";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PiArrowRightThin } from "react-icons/pi";


gsap.registerPlugin(SplitText,ScrollTrigger)
gsap.registerPlugin(ScrollTrigger);


export default function Home() {
  const lenisRef = useRef<any>(null);
  const textRef = useRef(null);
  const heroTextRef = useRef(null);
  const videoRef = useRef(null);
  const videoWrapper = useRef(null);
  const heroRef = useRef(null);
const section2Ref = useRef(null);

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
    const heroHeight = isMobile ? 1900 : 3000;
    const split = new SplitText(heroTextRef.current, {
  type: "lines,chars"
});

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
  "+=0.5"
)
.fromTo(
  split.lines,
  { y:-500 },
  { y:-600, stagger:0.5},
   
)
.fromTo(
  heroRef.current,
  {y:0},
  {y:-500, duration:1},
  "+=0"
)
// section change animation
.fromTo(
  section2Ref.current,
  {y:0},
  {y:-200, duration:1},
  "-=0.5"
)
.fromTo(
  section2Ref.current,
  {y:-200},
  {y:-1000, duration:2},
  "+=0"
)






// text color change animation
gsap.timeline({
  scrollTrigger: {
    trigger: "#animated-text",
    start: "top 20%",    // текст появляется при входе в вьюпорт
    end: "+=500",        // сколько скролла на анимацию
    scrub: true,
    markers: false,       // убери потом
  },
})
.to(split.chars, {
  color: "#000",
  stagger: 0.05,
})



  }, []);


  


  return (
    <>
      <AnimatedNavbar />

      <ReactLenis root options={{ autoRaf: true }} ref={lenisRef} />

      <div id="scroll-container">
{/* HERO SECRION */}
      <section className="h-screen w-full " id="hero" ref={heroRef}>
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
        <div className=" max-w-[70%] md:max-w-[70%] pl-5" ref={heroTextRef} id="animated-text">
        <p className="text-gray-400 text-4xl z-2 md:text-6xl">Combining creativity and expertise, we reveal the character of brands that stand out in their time.</p>
        </div>
      </section>
{/* project section */}
      <section className="min-h-screen w-full mx-auto lg:px-20 px-5" id="section2" ref={section2Ref}>
        <div className="grid grid-rows-3 md:grid-rows-4  md:grid-cols-2 lg:gap-7 gap-5">
        <div className="relative group rounded-2xl overflow-hidden md:col-span-1 md:row-span-1 cursor-pointer ">
          <img src="photo2.jpg" alt="" className="  block w-full rounded-2xl transition-opacity duration-300 group-hover:opacity-0" />
          <video src="video1.mp4" className="  absolute inset-0 w-full h-full opacity-0 object-cover group-hover:opacity-100 rounded-2xl transition-opacity duration-300" autoPlay muted loop onMouseEnter={e => e.currentTarget.play()} onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }} />
          <div className="absolute bottom-4 left-4 bg-white px-5 pt-3 pb-3 rounded-xl flex flex-row gap-3"><p className="text-black  font-semibold text-2xl m-auto">Autotransfer</p> 
          <div className="inline-flex items-center justify-center rounded-full bg-gray-100  transition-colors duration-550 ease-in-out group-hover:bg-black p-2 md:p-3">
  <PiArrowRightThin className="text-xl text-black group-hover:text-white transition-colors duration-550 ease-in-out " />
</div></div>
        </div>
        <div className="relative group rounded-2xl overflow-hidden md:col-span-1 md:row-span-1 cursor-pointer ">
          <img src="photo1.jpg" alt="" className="block w-full rounded-2xl transition-opacity duration-300 group-hover:opacity-0" />
          <video src="video2.mp4" className=" absolute inset-0 w-full h-full opacity-0 object-cover group-hover:opacity-100 rounded-2xl transition-opacity duration-300" autoPlay muted loop onMouseEnter={e => e.currentTarget.play()} onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }} />
          <div className="absolute bottom-4 left-4 bg-white px-5 pt-3 pb-3 rounded-xl flex flex-row gap-3"><p className="text-black  font-semibold text-2xl m-auto">Autotransfer</p> 
          <div className="inline-flex items-center justify-center rounded-full bg-gray-100  transition-colors duration-550 ease-in-out group-hover:bg-black p-2 md:p-3">
  <PiArrowRightThin className="text-xl text-black group-hover:text-white transition-colors duration-550 ease-in-out " />
</div></div>
        </div>
        <div className="md:max-h-[45%] relative group rounded-2xl overflow-hidden md:col-span-2 md:row-span-2 cursor-pointer ">
          <img src="photo3.jpg" alt="" className="block w-full rounded-2xl transition-opacity duration-300 group-hover:opacity-0" />
          <video src="video3.mp4" className=" absolute inset-0 w-full h-full opacity-0 object-cover group-hover:opacity-100 rounded-2xl transition-opacity duration-300" autoPlay muted loop onMouseEnter={e => e.currentTarget.play()} onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }} />
          <div className="absolute bottom-4 left-4 bg-white px-5 pt-3 pb-3 rounded-xl flex flex-row gap-3"><p className="text-black  font-semibold text-2xl m-auto">Autotransfer</p> 
          <div className="inline-flex items-center justify-center rounded-full bg-gray-100  transition-colors duration-550 ease-in-out group-hover:bg-black p-2 md:p-3">
  <PiArrowRightThin className="text-xl text-black group-hover:text-white transition-colors duration-550 ease-in-out " />
</div></div>
        </div>
        </div>
      </section>
      </div>
      <section className="h-screen w-full"></section>
    </>
  );
}
