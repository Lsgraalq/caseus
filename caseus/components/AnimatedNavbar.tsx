"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { IoIosMenu } from "react-icons/io";


export default function AnimatedNavbar() {
  const circleRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.9 });
    const isMobile = window.innerWidth < 768;
    const distance = isMobile ? 100 : 190;
    // 1. Кружочек падает сверху
    tl.from(circleRef.current, {
      y: -60,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    }).fromTo(
      circleRef.current,
      {x:0, color:"#1e2939"},
      {x: -distance, duration:1, color:"#101828"}
    );

    // 2. Панелька выезжает из кружка
    // tl.fromTo(panelRef.current,
    //   {y:-60, width:0, },
    //   {width:"2rem"},
    //   "-=0.9"
    // );
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-center items-start z-50">
      <div className="relative">
        {/* Круг */}
        <div
          ref={circleRef}
          className="absolute w-16 h-16 bg-gray-800 rounded-full  text-white text-xl font-bold mt-10 "
        >
          <img src="/logo.png" alt=""  className="mr-10"/>
        </div>

        {/* Панель */}
        <div
          ref={panelRef}
          className="bg-black text-white absolute"
        >
          <a href="#" className="hover:bg-gray-800">Home</a>
          <a href="#" className="hover:bg-gray-800">About</a>
          <a href="#" className="hover:bg-gray-800">Contact</a>
          <div className="bg-white">
            <IoIosMenu />
            <p className="text-black">Menu</p>
          </div>
        </div>

      </div>
    </nav>
  );
}
