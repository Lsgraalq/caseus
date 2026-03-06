"use client"
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";


export default function SmoothScroll({ children }: { children: React.ReactNode }) {

  return (
    <ReactLenis
      root
      options={{
        anchors: true,
        duration: 1.5,
        lerp: 0.1,
        wheelMultiplier: 0.8,
        touchMultiplier: 0.7, 
        smoothWheel: true,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}