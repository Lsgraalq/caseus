"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ReactLenis } from "lenis/react";
import AnimatedNavbar from "@/components/AnimatedNavbarDE";
import SplitText from "gsap/SplitText";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PiArrowRightThin } from "react-icons/pi";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Preloader from "@/components/preloaderDe";
import FooterDE from "@/components/FooterDE"; // <-- Подключили твой немецкий футер

// Подключаем Sanity
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(SplitText, ScrollTrigger);
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

  // 1. СТЕЙТ ДЛЯ ПРОЕКТОВ
  const [projects, setProjects] = useState<any[]>([]);

  // 2. ФЕТЧИМ ПРОЕКТЫ ИЗ SANITY
  useEffect(() => {
    const fetchProjects = async () => {
      const query = `*[_type == "project"] | order(_createdAt desc) [0...3] {
        _id,
        title,
        slug,
        cardImage
      }`;
      const data = await client.fetch(query);
      setProjects(data);
    };
    fetchProjects();
  }, []);

  // start animation + cursor logic
  useEffect(() => {
    if (typeof window !== "undefined" && textRef.current) {
      const isTouchDevice = 'ontouchstart' in window;

      function getScale(diffX: number, diffY: number): number {
        const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
        return Math.min(distance / 100, 0.25);
      }

      function getAngle(diffX: number, diffY: number): number {
        return (Math.atan2(diffY, diffX) * 180) / Math.PI;
      }

      const elasticCursor = document.getElementById("jelly-cursor");
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
        const { clientX, clientY } = e;
        targetPos.x = clientX;
        targetPos.y = clientY;
        update();
      });

      function hideCursor() {
        gsap.to(elasticCursor, { opacity: 0, duration: 0.7, ease: 'power2.out' });
      }

      function showCursor() {
        gsap.to(elasticCursor, { opacity: 1, duration: 0.7, ease: 'power2.out' });
      }

      document.addEventListener('mouseleave', hideCursor);
      document.addEventListener('mouseenter', showCursor);

      const iframes = document.querySelectorAll('iframe');
      iframes.forEach((iframe) => {
        iframe.addEventListener('mouseenter', hideCursor);
        iframe.addEventListener('mouseleave', showCursor);
      });

      if (!isTouchDevice) {
        animate();
      }

      const cursorDiv = document.getElementById("jelly-cursor") as HTMLVideoElement;
      const cursorPointer = document.getElementById("cursor-event") as HTMLVideoElement;
      const targetSection = document.querySelector(".why-us");

      if (targetSection && cursorPointer) {
        targetSection.addEventListener("mouseenter", () => {
          cursorPointer.style.display = "flex";
          cursorDiv.style.width = "200px";
          cursorDiv.style.border = "0px";
        });

        targetSection.addEventListener("mouseleave", () => {
          cursorPointer.style.display = "none";
          cursorDiv.style.width = "42px";
          cursorDiv.style.border = "2px, solid, gray";
        });
      }

      const split = new SplitText(textRef.current, { type: "chars" });
      let tl = gsap.timeline();

      tl.from(split.chars, {
        x: -20, y: -10, opacity: 0, duration: 0.3, ease: "power4", stagger: 0.04,
      }).fromTo(
        videoRef.current,
        { transformOrigin: "top left", opacity: 0, scaleY: 0.25, x: 0, scaleX: 0.25 },
        { x: 0, scaleY: 1, opacity: 1, scale: 1, duration: 1, ease: "power3.inOut" },
        "-=0.5"
      ).fromTo(split.chars,
        { color: "#000000" },
        { color: "#ffffff" },
        "-=0.68"
      );
      
      return () => split.revert();
    }
  }, []);

  // header timeline animation
  useEffect(() => {
    if (typeof window !== "undefined" && textRef.current) {
      gsap.registerPlugin(ScrollTrigger);
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

      tl.fromTo(videoRef.current,
        { scale: 1, transformOrigin: "top left" },
        { scale: 0.2, duration: 1, ease: "power1.out" },
      ).fromTo(videoRef.current,
        { x: "0vw", y: "0vh" },
        { x: "75vw", y: "0vh", duration: 1, ease: "power1.out" },
        "-=1"
      ).fromTo(split.lines, { y: 0, opacity: 0.2 },
        { duration: 0.7, ease: "power1.out", y: -500, opacity: 1, stagger: 0.04 },
        "-=0.9"
      ).to(videoRef.current,
        { y: -150, duration: 0.5, ease: "none" },
        "+=0"
      );

      gsap.timeline({
        scrollTrigger: {
          trigger: "#animated-text", start: startPosition, end: endHeight, scrub: true, markers: false, pin: false,
        },
      })
      .fromTo(split.chars, { color: "#ced4da" }, { color: "#000", stagger: 0.3 });
    }
  }, []);

  // 3. ОТДЕЛЬНЫЙ USE-EFFECT ДЛЯ АНИМАЦИИ ПРОЕКТОВ
  useEffect(() => {
    if (projects.length > 0) {
      const isMobile = window.innerWidth < 768;
      const startProjectPosition = isMobile ? "top 99%" : "top 85%";

      gsap.utils.toArray<HTMLElement>(".project").forEach((box) => {
        gsap.fromTo(box, { opacity: 0, y: 200 },
          {
            scrollTrigger: {
              trigger: box,
              start: startProjectPosition,
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out"
          }
        );
      });
      ScrollTrigger.refresh();
    }
  }, [projects]);

  // why us section anims
  useEffect(() => {
    const isMobile = window.innerWidth < 400;
    const x = isMobile ? 200 : 245; // <-- Твоя логика сохранена!
    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: "#why-us", start: "top 95%", end: "bottom 50%", scrub: true, markers: false, pin: whyUsVideoOne.current,
      }
    });

    tl4.fromTo(whyUsVideoOne.current, { x: 0 }, { x: x, rotate: 90, duration: 0 },)
       .fromTo(whyUsVideoOne.current, { opacity: 0 }, { opacity: 1, duration: 0.2 },)
       .fromTo(whyUsVideoOne.current, { y: 0 }, { y: -450, duration: 3 }, "<")
       .fromTo(whyUsVideoOne.current, { opacity: 1 }, { opacity: 0, duration: 0.5 }, "-=0.5");
  }, []);

  // section 3 text scramble anim
  useEffect(() => {
    const el = text3Ref.current;
    if (!el) return;
    const isMobile = window.innerWidth < 768;
    const pHeight = isMobile ? "bottom 55%" : "+=300";
    const paragraphs = el.querySelectorAll("p");

    gsap.set(paragraphs, { opacity: 0 });

    paragraphs.forEach((p) => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: p, start: "top 90%", end: pHeight, scrub: true, markers: false },
      });

      tl.fromTo(p,
        { opacity: 0, scrambleText: { text: "", revealDelay: 0.2 } },
        { opacity: 1, scrambleText: { text: p.textContent || "", chars: "upperCase", speed: 0.5, revealDelay: 0.2 }, duration: 2 }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        anchors: true,
        duration: 1.5,
        wheelMultiplier: 0.8,
        touchMultiplier: 0.7, 
        smoothWheel: true,
        autoRaf: true,
      }}
      ref={lenisRef}
    >
      
      {/* 4. Обернули всё ДО футера в main с отступом для липкого подвала */}
      <main className="relative z-10 bg-white mb-[100vh]">
        
        <AnimatedNavbar />

        {/* HERO SECTION */}
        <div className="" id="start"></div>

        <div id="jelly-cursor" className="hidden md:flex">
          <div className="text-blue-300 text-2xl border-b-1 pb-0 libre-regular" id="cursor-event">Was wir tun</div>
        </div>
        
        <Preloader></Preloader>

        <section className="h-screen w-full " id="scroll-container" ref={heroRef}>
          <div className="relative p-0 m-0 ">
            <div className="w-full h-screen z-0" ref={videoRef}>
              <video src="/titul.mp4" className="hidden md:block w-full h-full object-cover rounded-4xl p-5 " autoPlay muted loop />
              <video src="/titul_small.mp4" className="block md:hidden w-full h-full object-cover rounded-3xl  p-4 " autoPlay muted loop />
            </div>

            <div className="w-full absolute h-screen top-[50vh] " ref={textRef}>
              <h3 className="lg:text-2xl text-xl uppercase font-thin text-center ">
                 Wirkung sichtbar machen.
              </h3>
            </div>
          </div>
          
          <div className=" sm:max-w-[70%] md:max-w-[60%] lg:max-w-[70%] max-w-[75%] pl-5 lg:pl-20" ref={heroTextRef} id="animated-text">
            <p className="text-gray-400 sm:text-4xl z-2 md:text-6xl lg:text-7xl text-3xl">
              Wir machen Ihre Wirkungen sichtbar. Wir übernehmen Webseiten, Videos und Promotion und halten Ihnen den Rücken frei für das Wesentliche — diese Welt zum Besseren zu verändern.
            </p>
          </div>
        </section>

        {/* PROJECT SECTION - ДИНАМИЧЕСКАЯ И НЕМЕЦКАЯ */}
        <section className="w-full mx-auto" id="section2" ref={section2Ref}>
          <div className="flex flex-col gap-5 md:mx-10 mx-2" id="projectFlex">
            
            {projects.length > 0 && (
              <>
                {/* ВЕРХНИЙ РЯД: 2 проекта */}
                <div className="flex flex-col md:flex-row gap-5">
                  {projects.slice(0, 2).map((proj) => (
                    <a key={proj._id} href={`/de/projects/${proj.slug.current}`} className="relative group rounded-2xl overflow-hidden flex-1 cursor-pointer project aspect-[4/2] block">
                      {proj.cardImage && (
                        <img 
                          src={urlFor(proj.cardImage).width(1200).url()} 
                          alt={proj.title?.de || proj.title?.en} 
                          className="block w-full h-full rounded-2xl transition-transform duration-500 group-hover:scale-105 object-cover" 
                        />
                      )}
                      <div className="absolute bottom-4 left-4 bg-white px-5 pt-3 pb-3 rounded-xl flex flex-row gap-3 z-10">
                        {/* Выводим немецкий тайтл (или фолбэк на английский, если вдруг не заполнен) */}
                        <p className="text-black font-semibold text-xl md:text-2xl m-auto">{proj.title?.de || proj.title?.en}</p>
                        <div className="inline-flex items-center justify-center rounded-full bg-gray-100 transition-colors duration-550 ease-in-out group-hover:bg-black p-2 md:p-3">
                          <PiArrowRightThin className="text-xl text-black group-hover:text-white transition-colors duration-550 ease-in-out" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* НИЖНИЙ РЯД: 1 широкий проект */}
                {projects[2] && (
                  <a href={`/de/projects/${projects[2].slug.current}`} className="relative group rounded-2xl overflow-hidden w-full cursor-pointer project md:aspect-[16/8] aspect-[4/2] block">
                    {projects[2].cardImage && (
                      <img 
                        src={urlFor(projects[2].cardImage).width(1920).url()} 
                        alt={projects[2].title?.de || projects[2].title?.en} 
                        className="block w-full h-full rounded-2xl transition-transform duration-500 group-hover:scale-105 object-cover" 
                      />
                    )}
                    <div className="absolute bottom-4 left-4 bg-white px-5 pt-3 pb-3 rounded-xl flex flex-row gap-3 z-10">
                      <p className="text-black font-semibold text-xl md:text-2xl m-auto">{projects[2].title?.de || projects[2].title?.en}</p>
                      <div className="inline-flex items-center justify-center rounded-full bg-gray-100 transition-colors duration-550 ease-in-out group-hover:bg-black p-2 md:p-3">
                        <PiArrowRightThin className="text-xl text-black group-hover:text-white transition-colors duration-550 ease-in-out" />
                      </div>
                    </div>
                  </a>
                )}
              </>
            )}

          </div>
        </section>

        {/* about us section (GERMAN) */}
        <section className="h-screen w-full pt-20 why-us mb-40" id="why-us" ref={section3Ref}>
          <div className="relative md:hidden items-center">
            <video loop autoPlay muted src="/whyUsVideoOne.mp4" className="absolute w-50 rotate-90 rounded-xl" ref={whyUsVideoOne}></video>
          </div>
          <div className="flex flex-col mx-4 md:mx-10 gap-8 md:gap-15 lg:gap-20" id="why-us" ref={text3Ref}>
            <div className="flex md:flex-row md:items-center flex-col">
              <h2 className="text-5xl flex-1 font-heading">Profile</h2>
              <p className="flex-1 md:flex-none text-3xl lg:text-4xl pt-2 overflow-hidden">Professionelle Präsenz aufbauen, die Vertrauen schafft.</p>
            </div>
            <div className="flex md:flex-row md:items-center flex-col">
              <h2 className="text-5xl flex-1 font-heading">Inhalte</h2>
              <p className="flex-1 md:flex-none text-3xl lg:text-4xl pt-2 overflow-hidden ">Storytelling, das bewegt und Ihre Mission sichtbar macht.</p>
            </div>
            <div className="flex md:flex-row md:items-center flex-col">
              <h2 className="text-5xl flex-1 font-heading">Sichtbarkeit</h2>
              <p className="flex-1 md:flex-none text-3xl lg:text-4xl pt-2 overflow-hidden">Gezielte Kampagnen zur Gewinnung von Spendern und Ehrenamtlichen.</p>
            </div>
            <div className="flex md:flex-row md:items-center flex-col">
              <h2 className="text-5xl flex-1 font-heading">Wirkung</h2>
              <p className="flex-1 md:flex-none text-3xl lg:text-4xl pt-2 overflow-hidden">Ergebnisse messen, um die soziale Reichweite zu maximieren.</p>
            </div>
            <div className="flex md:flex-row md:items-center flex-col ">
              <h2 className="text-5xl flex-1 font-heading">Community</h2>
              <p className="flex-1 md:flex-none text-3xl lg:text-4xl pt-2 overflow-hidden ">Aktiven Austausch mit Unterstützern und Förderern fördern.</p>
            </div>
          </div>
        </section>

      </main>

      
      <FooterDE />

    </ReactLenis>
  );
}