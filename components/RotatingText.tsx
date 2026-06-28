"use client"; 

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function RotatingText({ text, size = "large" }: { text: string; size?: "small" | "large" }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Двигаем обертку ровно на половину её длины (-50%)
      gsap.to(wrapperRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 15, // Скорость (чем больше цифра, тем медленнее)
        repeat: -1,
      });
    });

    return () => ctx.revert(); 
  }, []);

  const isSmall = size === "small";

  // Создаем массив из нескольких слов, чтобы заполнить экран
  const items = [...Array(4)].map((_, i) => (
    <h1 key={i} className={`${isSmall ? "text-[35px] md:text-[55px]" : "text-[60px] md:text-[130px]"} apercu-bold uppercase px-8 shrink-0`}>
      {text}
    </h1>
  ));

  return (
    <div className={`w-full ${isSmall ? "h-[60px] md:h-[90px]" : "h-[100px] md:h-[180px]"} bg-white text-black flex items-center overflow-hidden`}>
      
      {/* ОБЕРТКА: w-max заставляет див быть шириной ровно с контент внутри.
        will-change-transform включает аппаратное ускорение (видюху).
      */}
      <div ref={wrapperRef} className="flex w-max will-change-transform">
        
        {/* ПЕРВАЯ ПОЛОВИНА */}
        <div className="flex shrink-0">
          {items}
        </div>

        {/* ВТОРАЯ ПОЛОВИНА (Точная копия первой) */}
        <div className="flex shrink-0">
          {items}
        </div>

      </div>

    </div>
  );
}