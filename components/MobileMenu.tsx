"use client";

import { useEffect, useRef, forwardRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Locale } from "@/utils/translations";
import { MenuItem } from "@/types/navbar";

interface MobileMenuProps {
  locale: Locale;
  isContrast: boolean;
  menuItems: MenuItem[];
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const MobileMenu = forwardRef<HTMLDivElement, MobileMenuProps>(
  ({ locale, isContrast, menuItems, isMenuOpen, setIsMenuOpen }, ref) => {
    const linksRef = useRef<(HTMLDivElement | null)[]>([]);

    // Animate menu container and links when menu opens/closes
    useEffect(() => {
      // Since ref can be a function or ref object, resolve it safely
      const containerElement = ref && "current" in ref ? ref.current : null;
      if (!containerElement) return;

      if (isMenuOpen) {
        gsap.to(containerElement, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.fromTo(
          linksRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      } else {
        gsap.to(containerElement, {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    }, [isMenuOpen, ref]);

    return (
      <div
        className="absolute left-0 right-0 flex flex-col gap-2 mt-4 items-center w-full md:hidden pointer-events-none opacity-0"
        style={{ top: "100%" }}
        ref={ref}
      >
        {menuItems.map((item, i) => {
          if ("lang" in item) {
            return (
              <div
                key={`lang-${i}`}
                className={`z-100 rounded-full flex border transition-colors duration-300 w-[70%] h-[42px] items-center justify-center ${
                  isContrast
                    ? "bg-white border-[#0802E2]/25 shadow-lg"
                    : "bg-[#0802E2] border-white/20"
                }`}
                ref={(el) => {
                  linksRef.current[i] = el;
                }}
              >
                <div className="w-full h-full flex items-center justify-center gap-2 text-lg rounded-full font-semibold transition-colors duration-300">
                  {locale === "en" ? (
                    <>
                      <span className={isContrast ? "text-[#0802E2]" : "text-white"}>
                        EN
                      </span>
                      <span className={isContrast ? "text-gray-300" : "text-white/20"}>
                        /
                      </span>
                      <Link
                        href="/de"
                        scroll={false}
                        className={`transition-colors duration-300 hover:opacity-80 cursor-pointer ${
                          isContrast ? "text-gray-400" : "text-white/40"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        DE
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/en"
                        scroll={false}
                        className={`transition-colors duration-300 hover:opacity-80 cursor-pointer ${
                          isContrast ? "text-gray-400" : "text-white/40"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        EN
                      </Link>
                      <span className={isContrast ? "text-gray-300" : "text-white/20"}>
                        /
                      </span>
                      <span className={isContrast ? "text-[#0802E2]" : "text-white"}>
                        DE
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          } else {
            const isStartButton = item.href === "/start";
            
            let containerClasses = isContrast
              ? "bg-white border-[#0802E2]/25 shadow-lg active:bg-slate-50"
              : "bg-[#0802E2] border-white/20 active:bg-blue-800";
            let linkClasses = isContrast ? "text-[#0802E2]" : "text-white";

            if (isStartButton) {
              containerClasses = isContrast
                ? "bg-[#0802E2] border-[#0802E2] shadow-lg active:bg-white"
                : "bg-white border-white active:bg-[#0802E2]";
                
              linkClasses = isContrast
                ? "text-white group-active:text-[#0802E2]"
                : "text-[#0802E2] group-active:text-white";
            }

            return (
              <div
                key={i}
                ref={(el) => {
                  linksRef.current[i] = el;
                }}
                onClick={() => setIsMenuOpen(false)}
                className={`z-100 rounded-full flex border transition-all duration-300 w-full h-[60px] items-center justify-center group cursor-pointer ${containerClasses}`}
              >
                <Link
                  href={item.href}
                  className={`w-full h-full flex items-center justify-center text-2xl rounded-full transition-colors duration-300 ${linkClasses}`}
                >
                  {item.text}
                </Link>
              </div>
            );
          }
        })}
      </div>
    );
  }
);

MobileMenu.displayName = "MobileMenu";
