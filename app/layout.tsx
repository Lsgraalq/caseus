import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}



// "use client"
// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import Image from "next/image";
// import 'lenis/dist/lenis.css'
// import { ReactLenis } from 'lenis/react';
// import Navbar from "@/components/AnimatedNavbar";
// import AnimatedNavbar from "@/components/AnimatedNavbar";


// gsap.registerPlugin(ScrollTrigger)

// export default function Home() {
//     const lenisRef = useRef<any>(null);

//   useEffect(() => {
//     function update(time: number) {
//       lenisRef.current?.lenis?.raf(time);
//       requestAnimationFrame(update);
//     }
//     const rafId = requestAnimationFrame(update);
//     return () => cancelAnimationFrame(rafId);
//   }, []);

//   const videoWrapper = useRef(null);
//   const textRef = useRef(null);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: "#hero",
//         start: "top top",
//         end: "+=1500",
//         scrub: true,
//         pin: true,
//       },
//     });

//   
//     tl.to(videoWrapper.current, {
//       scale: 0.2,
//       x: "75vw",
//       y: "0vh",
//       transformOrigin: "top left",
//       ease: "power2.out",
//     });

//     
//     tl.to(
//       textRef.current,
//       {
//         opacity: 0,
//         y: -100,
//         ease: "power2.out",
//       },
//       "<" // одновременно с предыдущим
//     );
//   }, []);


//   return (
//     <>
//     <AnimatedNavbar></AnimatedNavbar>
//       <ReactLenis root options={{ autoRaf: true }} ref={lenisRef} />
     
//     <section className="h-screen max-w-screen" id="hero">

//       <div className="relative">
//        <div className="w-screen h-screen p-4 pr-10 z-0" ref={videoWrapper}>
//           <video
//             src="/titul.mp4"
//             className="hidden md:block w-full h-full object-cover rounded-3xl z-1"
//             autoPlay
//             muted
//             loop
//           />
//           <video
//             src="/titul_small.mp4"
//             className="block md:hidden w-full h-full object-cover rounded-3xl"
//             autoPlay
//             muted
//             loop
//           />
//         </div>

//         <div className="absolute flex items-center justify-center z-10  w-screen" ref={textRef}>
//           <h3 className="z-1  lg:text-2xl   text-xl text-black uppercase font-thin md:w-[1/2] md:text-left">CREATIVE STUDIO</h3>
//           <h3 className="z-100   lg:text-2xl   text-xl text-black uppercase font-thin md:w-[1/2] md:text-left">INGENIOUS</h3>
//        </div>
// </div>  

//     </section>
//     <section className="h-screen max-w-screen"></section>
//     <section className="h-screen max-w-screen"></section>
//     </>
//   );
// }
