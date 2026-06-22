"use client";

import { usePathname } from "next/navigation";

export default function GlobalBackgroundVideo() {
  const pathname = usePathname();
  // Show only on root/homepage locales: "/", "/en", "/de"
  const isHome = pathname === "/" || pathname === "/en" || pathname === "/de";

  if (!isHome) return null;

  return (
    <div
      id="global-bg-video-container"
      className="fixed inset-0 w-full h-screen z-[-1] pointer-events-none"
    >
      <video
        id="global-bg-video"
        src="/StartScreen.mp4"
        className="hidden md:landscape:block w-full h-full object-cover rounded-4xl p-5"
        autoPlay
        muted
        loop
        playsInline
      />
      <video
        id="global-bg-video-vertical"
        src="/Start Screen V.mp4"
        className="block md:landscape:hidden w-full h-full object-cover rounded-3xl p-4"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}
