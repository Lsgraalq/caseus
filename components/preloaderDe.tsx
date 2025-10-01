"use client"

import { useEffect, useState } from "react"
import gsap from "gsap"

export default function Preloader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return

    const nodes = Array.from(window.document.querySelectorAll("img, video"))
    let loaded = 0
    const total = nodes.length

    const tick = () => {
      loaded += 1
      const pct = total ? Math.min(100, Math.round((loaded / total) * 100)) : 100
      setProgress(pct)
      if (loaded >= total) {
        gsap.to(".preloader", { opacity:0 , duration: 0.5, ease: "power3.inOut", delay: 0.2 })
      }
    }

    nodes.forEach((el) => {
      if (el instanceof HTMLImageElement) {
        if (el.complete && el.naturalWidth > 0) tick()
        else {
          const on = () => { el.removeEventListener("load", on); el.removeEventListener("error", on); tick() }
          el.addEventListener("load", on)
          el.addEventListener("error", on)
        }
      } else if (el instanceof HTMLVideoElement) {
        if (el.readyState >= 3) tick()
        else {
          const on = () => { el.removeEventListener("loadeddata", on); el.removeEventListener("error", on); tick() }
          el.addEventListener("loadeddata", on)
          el.addEventListener("error", on)
        }
      }
    })

    if (total === 0) {
      setProgress(100)
      gsap.to(".preloader", { y: "-100%", duration: 0.8, ease: "power3.inOut", delay: 0.2 })
    }
  }, [])

  return (
   <div className="preloader fixed inset-0 flex flex-col items-center justify-center bg-white text-black z-50">
        <h1 className="text-2xl font-bold mb-4">Wird geladen… {progress}%</h1>
        <div className="w-64 h-2 bg-gray-700 rounded overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#3261fb] to-[#36f96d] transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
  )
}
