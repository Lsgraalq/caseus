"use client";

import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

function ScrollPreserver() {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);
  const scrollPosRef = useRef(0);
  const lenis = useLenis();

  // Listen to scrolling to capture current scroll position
  useEffect(() => {
    const handleScroll = () => {
      scrollPosRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen to pathname changes to restore scroll if transitioning between languages of the same page
  useEffect(() => {
    const prevPath = prevPathRef.current;
    if (prevPath !== pathname) {
      const cleanPrev = prevPath.replace(/^\/(en|de)/, '');
      const cleanCurrent = pathname.replace(/^\/(en|de)/, '');

      if (cleanPrev === cleanCurrent) {
        const savedPos = scrollPosRef.current;
        // Restoring scroll position on a setTimeout to allow Next.js route transition to complete rendering
        setTimeout(() => {
          if (lenis) {
            lenis.scrollTo(savedPos, { immediate: true });
          } else {
            window.scrollTo(0, savedPos);
          }
        }, 40);
      }
      prevPathRef.current = pathname;
    }
  }, [pathname, lenis]);

  return null;
}

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
        duration: 1.2,
        wheelMultiplier: 1.0,
        touchMultiplier: 0.7, 
        smoothWheel: true,
        autoRaf: true,
      }}
    >
      <ScrollPreserver />
      {children}
    </ReactLenis>
  );
}