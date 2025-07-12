"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { useState } from "react";

export default function AnimatedNavbar() {
  const circleRef = useRef<HTMLDivElement>(null);
  const circletwoRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);

   const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.9 });
    const isMobile = window.innerWidth < 768;
    const distance = isMobile ? 60 : 190;
    
    // 1. Кружочек падает сверху
    tl.from(circletwoRef.current, {
      y: -60,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    },"-=0").fromTo(
      circletwoRef.current,
      {x:0, color:"#1e2939"},
      {x: -distance, duration:1, color:"#101828"},"+=0.4"
    ).fromTo(
      navbarRef.current,
      {opacity:0},
      {opacity:1, duration:1},"+=1"
    )
  }, []);


  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo(
        linksRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.2,
          ease: "power2.out",
        }
      );
    }
  }, [isMenuOpen]);

  return (
    <>
    <nav className="fixed top-0 left-0 w-full flex justify-center items-start z-50">
             
             
                <div
                  ref={circletwoRef}
                  className="absolute w-12 h-12  rounded-full  text-white text-xl font-bold  mt-12 z-1000 "
                >
                  <img src="/logo.png" alt=""  className="z-1000  "/>
                </div>
            
      <div className="relative flex flex-row bg-gray-800 mt-10 ml-5 pl-5 pr-5 pt-2 pb-2 rounded-2xl  " ref={navbarRef}>
        {/* Круг */}
        {/* <div
           ref={circleRef}
          className=" w-12 h-12 bg-gray-600 rounded-full  text-white text-xl font-bold z-20"
        >
          <img src="/logo.png" alt=""  className="z-20"/>
        </div> */}
        <div className="w-12 h-12 bg-gray-600 rounded-full mr-7">

        </div>
          <a href="#" className="hover:bg-gray-800 hidden">Home</a>

          <a href="#" className="hover:bg-gray-800 hidden">About</a>

          <a href="#" className="hover:bg-gray-800 hidden">Contact</a>

          <div className="bg-white flex flex-row   items-center  gap-2 text-center  px-5 rounded-xl " onClick={toggleMenu}>
            {isMenuOpen ? <IoMdClose className="w-5" /> : <IoIosMenu className="w-5" />}
            <p className="text-black font-semibold">Menu</p>
          </div>

    
      </div>
      

    </nav>
    <div className="z-1000 fixed top-0 left-0 w-full">
      {isMenuOpen && (
        <div className="absolute mx-auto w-full flex flex-col gap-2 mt-60">
          {["Work", "Services", "About", "Contact"].map((text, i) => (
            <div
              key={i}
             ref={(el) => (linksRef.current[i] = el, undefined)}
              className="bg-black z-100 rounded-2xl mx-auto flex"
            >
              <a
                href="#"
                className="text-white px-10 pt-8 pb-8 text-4xl rounded-2xl"
              >
                {text}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}
