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
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";


gsap.registerPlugin(ScrambleTextPlugin) 
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
  const projectRef = useRef(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef(null);
  const whyUsVideoOne = useRef(null);
  const block1 = useRef(null);
  const block2 = useRef(null);
  const block3 = useRef(null);
  const whyUsVideoTwo= useRef(null);
// start animation + cursor logic
  useEffect (() => {
    if (typeof window !== "undefined" && textRef.current) {
      const isTouchDevice = 'ontouchstart' in window;
     
  
// Function for Mouse Move Scale Change (Jelly Effect)
      function getScale(diffX: number, diffY: number): number {
      const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
      return Math.min(distance / 100, 0.25);
      }

      function getAngle(diffX: number, diffY: number): number {
        return (Math.atan2(diffY, diffX) * 180) / Math.PI;
      }

      // Variables
      const elasticCursor = document.getElementById("jelly-cursor");
      const pos = { x: 0, y: 0 };
      const vel = { x: 0, y: 0 };
      let targetPos = { x: 0, y: 0 };
      let isHoveringClickable = false;

      // Use gsap.quickSetter for optimized property setting
      const setX = gsap.quickSetter(elasticCursor, "x", "px");
      const setY = gsap.quickSetter(elasticCursor, "y", "px");
      const setRotation = gsap.quickSetter(elasticCursor, "rotate", "deg");
      const setScaleX = gsap.quickSetter(elasticCursor, "scaleX");
      const setScaleY = gsap.quickSetter(elasticCursor, "scaleY");
      const setOpacity = gsap.quickSetter(elasticCursor, "opacity");

      // Update position and rotation (without affecting the scale)
      function update() {
        const rotation = getAngle(vel.x, vel.y);
        const scale = getScale(vel.x, vel.y);

        // Apply jelly-like effect (position and rotation), keeping scale separate
        setX(pos.x);
        setY(pos.y);
        setRotation(rotation);

        // If not hovering, apply the jelly scale effect
      
      }

      // Animation loop
      function animate() {
        const speed = 0.35;

        // Update cursor's position based on targetPos
        pos.x += (targetPos.x - pos.x) * speed;
        pos.y += (targetPos.y - pos.y) * speed;
        vel.x = targetPos.x - pos.x;
        vel.y = targetPos.y - pos.y;

        update();
        requestAnimationFrame(animate);
      }

      // Handle mouse move event
      window.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        targetPos.x = clientX;
        targetPos.y = clientY;

        // Always update position, regardless of hover state
        update();
      });


      // Function to hide the cursor
      function hideCursor() {
        gsap.to(elasticCursor, {
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
        });
      }

      // Function to show the cursor
      function showCursor() {
        gsap.to(elasticCursor, {
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
        });
      }

      // Hiding the cursor when it leaves the viewport
      document.addEventListener('mouseleave', hideCursor);

      // Re-show the cursor when mouse re-enters the viewport
      document.addEventListener('mouseenter', showCursor);

      // Detect when entering and exiting an iframe
      const iframes = document.querySelectorAll('iframe');

      iframes.forEach((iframe) => {
        // Add event listener to hide cursor when entering the iframe
        iframe.addEventListener('mouseenter', hideCursor);

        // Add event listener to show cursor when leaving the iframe
        iframe.addEventListener('mouseleave', showCursor);
      });

      // Only invoke the animation if it's not a touch device
      if (!isTouchDevice) {
        animate();
      }
       const split = new SplitText(textRef.current, { type: "chars" });
      let tl = gsap.timeline();

      tl.from(split.chars, {
      x: -20,
      y:-10,
      opacity: 0,
      duration: 0.3, 
      ease: "power4",
      stagger: 0.04,
     
   }).fromTo(
      videoRef.current,
      { transformOrigin: "top left", opacity: 0,  scaleY: 0.25 ,x:0, scaleX: 0.25},
      
      { x:0,
        scaleY:1,
        
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.inOut",
      },"-=0.5"
    ).fromTo(split.chars,
      {color:"#000000"},
      {color:"#ffffff"},
      "-=0.68");
      return () => split.revert();
  
  }
  },[])



// header timeline animation
  useEffect (() => {
    if (typeof window !== "undefined" && textRef.current) {
        gsap.registerPlugin(ScrollTrigger);
    const isMobile = window.innerWidth < 768;
    const heroHeight = isMobile ? 1300 : 3000;
    const endHeight = isMobile ? 1000 : 2000;
    const startPosition = isMobile ? "top 60%" : "top 20%";
    const startProjectPosition = isMobile ? "top 99%" : "top 85%";
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
  opacity:0.2
  },
  {duration:0.7,ease: "power1.out", y: -300,opacity:1,stagger:0.04,},
  "-=0.9"
).to(
  videoRef.current,
  { y:-200,duration:0.7,},
  "+=0.2"
).fromTo(split.lines, {
  y: -300,
  },
  {duration:0.3,ease: "power1.out", y: -400,stagger:0.03,},
  "-=0.5"
)

//hero section text color change animation 
gsap.timeline({
  scrollTrigger: {
    trigger: "#animated-text",
    start: startPosition,    
    end: endHeight,        
    scrub: true,
    markers: false,       
    pin:false,
  },
})
.fromTo(split.chars,{color:"#ced4da",}, {
  color: "#000",
  stagger: 0.05,
  duration:0.9
})

// why us color change anims



// project section anims 
gsap.utils.toArray<HTMLElement>(".project").forEach((box) => {
  gsap.fromTo(box,{opacity:0,y:200}
    ,
     {
    scrollTrigger: {
      trigger: box,
      start: startProjectPosition,
      toggleActions: "play none none reverse",
      
    },
    y:0,
    opacity:1,
    duration: 0.7,
    ease: "power2.out"
        }
);
});


    }
  },[])


  //  why us section anims
 useEffect(() => {


const tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: "#why-us",
    start: "top 95%",    
    end: "bottom 50%",        
    scrub: true,
    markers: true,
    pin: false,
  }
});





const tl4 = gsap.timeline({
  scrollTrigger: {
    trigger: "#why-us",
    start: "top 95%",    
    end: "bottom 50%",        
    scrub: true,
    markers: true,
    pin: whyUsVideoOne.current,
  }
});

tl4.fromTo(whyUsVideoOne.current, 
  {x:0},
  {x:250, rotate:90, duration:0},
  
).fromTo(whyUsVideoOne.current, 
  {opacity:0 },
  {opacity:1, duration:0.2},
  
).fromTo(whyUsVideoOne.current, 
  {y:0 },
  {y:-450, duration:3},
  "<"
).fromTo(whyUsVideoOne.current, 
  {opacity:1 },
  {opacity:0, duration:0.5},
  "-=0.5"
)




 },[])

useEffect(() => {
  const el = text3Ref.current;
  if (!el) return;

  const paragraphs = el.querySelectorAll("p");

  // Установим всем параграфам opacity: 0 в начале
  gsap.set(paragraphs, { opacity: 0 });

  paragraphs.forEach((p) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: p,
        start: "top 80%",
        end: "bottom 60%",
        scrub: true,
      },
    });

    tl.fromTo(
      p,
      {
        opacity: 0,
        scrambleText: { text: "", revealDelay: 0.2 },
      },
      {
        opacity: 1,
        scrambleText: {
          text: p.textContent || "",
          chars: "upperCase",
          speed: 0.5,
          revealDelay: 0.2,
        },
        duration: 2,
      }
    );
  });

  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);



  
  return (
    <>
    <ReactLenis
  root
  options={{
    duration: 1.5,
    wheelMultiplier: 0.8,
    touchMultiplier: 0.7, // попробуй значения от 0.3 до 1
    smoothWheel: true,
    autoRaf: true,
  }}
  ref={lenisRef}
>
    
      <AnimatedNavbar />

     

      
{/* HERO SECRION */}
<div id="jelly-cursor" className="hidden md:flex"></div>

      <section className="h-screen w-full " id="scroll-container" ref={heroRef}>
        
        <div className="relative p-0 m-0 ">
          {/* Video preload="auto" hero section */}
          <div className="w-full h-screen z-0" ref={videoRef}>
            <video
              src="/titul.mp4"
              className="hidden md:block w-full h-full object-cover rounded-4xl p-5 "
              autoPlay
              muted
              
              loop
            />
            {/* second video preload="auto" in hero section for phones */}
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
        <div className=" max-w-[70%] md:max-w-[60%] pl-5 lg:pl-20" ref={heroTextRef} id="animated-text">
        <p className="text-gray-400 text-4xl z-2 md:text-6xl">Combining creativity and expertise, we reveal the character of brands that stand out in their time.</p>
        </div>
      </section>


{/* project section */}
    <section className="w-full mx-auto" id="section2" ref={section2Ref}>
  <div className="flex flex-col gap-5 md:mx-10 mx-2" id="projectFlex">


    <div className="flex flex-col md:flex-row gap-5">
      <div className="relative group rounded-2xl overflow-hidden flex-1 cursor-pointer project aspect-[4/3]">
        <img src="photo1.jpg" alt="" className="block w-full h-full rounded-2xl transition-opacity duration-300 group-hover:opacity-0 object-cover" />
        <video src="video1.mp4" className="absolute inset-0 w-full h-full opacity-0 object-cover group-hover:opacity-100 rounded-2xl transition-opacity duration-300" muted onMouseEnter={e => e.currentTarget.play()} onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }} />
        <div className="absolute bottom-4 left-4 bg-white px-5 pt-3 pb-3 rounded-xl flex flex-row gap-3">
          <p className="text-black font-semibold text-2xl m-auto">Autotransfer</p>
          <div className="inline-flex items-center justify-center rounded-full bg-gray-100 transition-colors duration-550 ease-in-out group-hover:bg-black p-2 md:p-3">
            <PiArrowRightThin className="text-xl text-black group-hover:text-white transition-colors duration-550 ease-in-out" />
          </div>
        </div>
      </div>

      <div className="relative group rounded-2xl overflow-hidden flex-1 cursor-pointer project aspect-[4/3]">
        <img src="photo3.jpg" alt="" className="block w-full h-full rounded-2xl transition-opacity duration-300 group-hover:opacity-0 object-cover" />
        <video src="video2.mp4" className="absolute inset-0 w-full h-full opacity-0 object-cover group-hover:opacity-100 rounded-2xl transition-opacity duration-300" muted onMouseEnter={e => e.currentTarget.play()} onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }} />
        <div className="absolute bottom-4 left-4 bg-white px-5 pt-3 pb-3 rounded-xl flex flex-row gap-3">
          <p className="text-black font-semibold text-2xl m-auto">Autotransfer</p>
          <div className="inline-flex items-center justify-center rounded-full bg-gray-100 transition-colors duration-550 ease-in-out group-hover:bg-black p-2 md:p-3">
            <PiArrowRightThin className="text-xl text-black group-hover:text-white transition-colors duration-550 ease-in-out" />
          </div>
        </div>
      </div>
    </div>


    <div className="relative group rounded-2xl overflow-hidden w-full cursor-pointer project md:aspect-[16/7] aspect-[4/4]">
      <img src="photo2.jpg" alt="" className="block w-full h-full rounded-2xl transition-opacity duration-300 group-hover:opacity-0 object-cover" />
      <video src="video3.mp4" className="absolute inset-0 w-full h-full opacity-0 object-cover group-hover:opacity-100 rounded-2xl transition-opacity duration-300" muted onMouseEnter={e => e.currentTarget.play()} onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }} />
      <div className="absolute bottom-4 left-4 bg-white px-5 pt-3 pb-3 rounded-xl flex flex-row gap-3">
        <p className="text-black font-semibold text-2xl m-auto">Autotransfer</p>
        <div className="inline-flex items-center justify-center rounded-full bg-gray-100 transition-colors duration-550 ease-in-out group-hover:bg-black p-2 md:p-3">
          <PiArrowRightThin className="text-xl text-black group-hover:text-white transition-colors duration-550 ease-in-out" />
        </div>
      </div>
    </div>

  </div>
</section>


     


      {/* about us section */}

      <section className="h-screen w-full pt-20" ref={section3Ref}>
        <div className="relative md:hidden items-center">
          <video loop autoPlay muted  src="/whyUsVideoOne.mp4" className="absolute w-50  rotate-90 rounded-xl" ref={whyUsVideoOne}></video>
          
          {/* <video loop autoPlay muted  src="/whyUsVideoTwo.mp4" className="absolute" ref={whyUsVideoTwo}></video> */}
        </div>
        <div className="flex flex-col mx-4 md:mx-10 gap-8" id="why-us" ref={text3Ref}>
          <div className="flex md:flex-row md:items-center flex-col">
            <h2 className=" text-5xl  flex-none font-heading ">Profiles</h2>
            <p className="flex-1 text-3xl pt-2"  >Create and manage social media accounts.</p>
          </div>
          <div className="flex md:flex-row md:items-center flex-col">
            <h2 className=" text-5xl  flex-none font-heading ">Content</h2>
            <p className="flex-1 text-3xl pt-2"  >Plan and post engaging updates.</p>
          </div>
          <div className="flex md:flex-row md:items-center flex-col">
            <h2 className=" text-5xl  flex-none font-heading ">Ads</h2>
            <p className="flex-1 text-3xl pt-2"  >Targeted advertising to reach clients.</p>
          </div>
          <div className="flex md:flex-row md:items-center flex-col">
            <h2 className=" text-5xl  flex-none font-heading ">Analytics</h2>
            <p className="flex-1 text-3xl pt-2"  >Track results and improve strategies.</p>
          </div>
          <div className="flex md:flex-row md:items-center flex-col">
            <h2 className=" text-5xl  flex-none font-heading ">Engagement</h2>
            <p className="flex-1 text-3xl pt-2"  >Build active communities with followers.</p>
          </div>
        </div>
      </section>
      <section className="h-screen w-full pt-20">
      <h1>section 4</h1>
      </section>
    </ReactLenis>
     </>
  );
}
