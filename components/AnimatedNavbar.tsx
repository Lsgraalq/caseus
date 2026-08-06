"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { translations, Locale } from "@/utils/translations";
import { useNavbar } from "@/lib/hooks/useNavbar";
import { MobileMenu } from "./MobileMenu";
import { MenuItem } from "@/types/navbar";

// Module-level variable to track if the navbar animation has run
let globalNavbarAnimated = false;

export default function AnimatedNavbar({ locale }: { locale: Locale }) {
  const circletwoRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  const {
    isMenuOpen,
    setIsMenuOpen,
    show,
    isContrast,
    toggleMenu,
    menuContainerRef,
    menuButtonRef,
  } = useNavbar();

  const t = translations[locale].navbar;

  const menuItems: MenuItem[] = [
    { text: t.homepage, href: `/${locale}` },
    { text: t.projects, href: `/${locale}/projects` },
    { text: t.contact, href: "/start" },
    {
      lang: {
        from: t.langFrom,
        to: t.langTo,
        link: t.langLink,
        flagSrc: t.flagSrc,
      },
    },
  ];

  // Initial animation
  useEffect(() => {
    const runNavbarAnimation = () => {
      if (globalNavbarAnimated) {
        gsap.set(circletwoRef.current, { opacity: 1, x: 0, y: 0 });
        gsap.set(navbarRef.current, { opacity: 1 });
        return;
      }

      let startX = 0;
      if (circletwoRef.current) {
        const logoRect = circletwoRef.current.getBoundingClientRect();
        const screenCenterX = window.innerWidth / 2;
        const logoLeft = logoRect.left;
        // Calculate offset to align logo center with screen center
        startX = screenCenterX - logoLeft - 28;
      }

      const tl = gsap.timeline({ delay: 0 });
      tl.fromTo(
        circletwoRef.current,
        { y: -60, x: startX, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.5"
      )
        .to(
          circletwoRef.current,
          { x: 0, duration: 0.5, ease: "power2.inOut" },
          "+=0.2"
        )
        .fromTo(
          navbarRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            onComplete: () => {
              globalNavbarAnimated = true;
            },
          },
          "-=0.3"
        );
    };

    const hasPreloader = typeof document !== "undefined" && document.querySelector(".preloader") !== null;
    const alreadyFinished = typeof window !== "undefined" && (window as any).preloaderFinished === true;

    if (hasPreloader && !alreadyFinished) {
      // Hide them initially so they don't flash before preloader finishes
      gsap.set(circletwoRef.current, { opacity: 0 });
      gsap.set(navbarRef.current, { opacity: 0 });

      const handleFinished = () => {
        runNavbarAnimation();
      };
      window.addEventListener("preloaderFinished", handleFinished);
      return () => {
        window.removeEventListener("preloaderFinished", handleFinished);
      };
    } else {
      runNavbarAnimation();
    }
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex justify-center items-start z-50 transition-transform duration-550 ${
          show ? "translate-y-0" : "-translate-y-full"
        } ${isContrast ? "text-[#0802E2]" : "text-white"}`}
      >
        <div
          className={`relative flex flex-row mt-8 ml-5 pl-5 pr-5 pt-2 pb-2 border rounded-full items-center gap-8 transition-all duration-300 ${
            isContrast ? "bg-white border-[#0802E2]/25 shadow-lg" : "bg-[#0802E2] border-white/20"
          }`}
          ref={navbarRef}
        >
          {/* Logo Container */}
          <div
            className="rounded-full relative flex items-center justify-center"
            style={{ width: "56px", height: "56px" }}
          >
            <div
              ref={circletwoRef}
              className={`absolute rounded-full flex items-center justify-center transition-colors duration-300 z-1000 ${
                isContrast ? "bg-[#0802E2]" : "bg-transparent"
              }`}
              style={{
                width: "56px",
                height: "56px",
                padding: "4px",
                left: 0,
                top: 0,
              }}
            >
              <img
                src="/CaseusRebrandingTranspertLogo.png"
                alt="Logo"
                className="z-1000 object-contain w-full h-full"
              />
            </div>
          </div>

          {/* Desktop Links */}
          <Link
            href={`/${locale}`}
            className={`hidden md:flex cursor-pointer relative group px-2 transition-colors duration-300 ${
              isContrast ? "text-[#0802E2]" : "text-white"
            }`}
          >
            {t.home}
            <span
              className={`absolute bottom-0 left-0 h-[2px] w-0 transition-all group-hover:w-full ${
                isContrast ? "bg-[#0802E2]" : "bg-white"
              }`}
            ></span>
          </Link>

          <Link
            href={`/${locale}/projects`}
            className={`hidden md:flex cursor-pointer relative group px-2 transition-colors duration-300 ${
              isContrast ? "text-[#0802E2]" : "text-white"
            }`}
          >
            {t.projects}
            <span
              className={`absolute bottom-0 left-0 h-[2px] w-0 transition-all group-hover:w-full ${
                isContrast ? "bg-[#0802E2]" : "bg-white"
              }`}
            ></span>
          </Link>

          <Link
            href={`/${locale}#why-us`}
            className={`hidden md:flex cursor-pointer relative group px-2 transition-colors duration-300 ${
              isContrast ? "text-[#0802E2]" : "text-white"
            }`}
          >
            {t.services}
            <span
              className={`absolute bottom-0 left-0 h-[2px] w-0 transition-all group-hover:w-full ${
                isContrast ? "bg-[#0802E2]" : "bg-white"
              }`}
            ></span>
          </Link>

          {/* Mobile Menu Toggle */}
          <div
            className={`flex flex-row group items-center gap-2 text-center px-8 pt-2 pb-3 rounded-full md:hidden glassbutton cursor-pointer ${
              isContrast ? "contrast" : ""
            }`}
            onClick={toggleMenu}
            ref={menuButtonRef}
          >
            <span
              className={`transition-colors duration-300 font-semibold ${
                isContrast ? "text-white group-hover:text-[#0802E2]" : "text-[#0802E2] group-hover:text-white"
              }`}
            >
              {isMenuOpen ? (locale === "de" ? "Schließen" : "Close") : t.menu}
            </span>
          </div>

          {/* Desktop Start Now Button */}
          <Link
            href="/start"
            className={`flex-row group items-center gap-2 text-center px-8 pt-2 pb-3 rounded-full hidden md:flex glassbutton cursor-pointer ${
              isContrast ? "contrast" : ""
            }`}
          >
            <span
              className={`transition-colors duration-300 font-semibold cursor-pointer ${
                isContrast ? "text-white group-hover:text-[#0802E2]" : "text-[#0802E2] group-hover:text-white"
              }`}
            >
              {t.contact}
            </span>
          </Link>

          {/* Mobile Dropdown Menu Component */}
          <MobileMenu
            ref={menuContainerRef}
            locale={locale}
            isContrast={isContrast}
            menuItems={menuItems}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
      </nav>
    </>
  );
}
