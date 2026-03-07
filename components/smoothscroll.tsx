"use client";

import { ReactLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Проверяем, находимся ли мы в админке Sanity
  const isStudio = pathname.includes('/studio');

  // Если это студия — отдаем голый контент, без вмешательства Lenis
  if (isStudio) {
    return <>{children}</>;
  }

  // Для всего остального сайта включаем магию Lenis
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
    >
      {children}
    </ReactLenis>
  );
}