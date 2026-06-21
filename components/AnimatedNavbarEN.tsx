"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import Link from "next/link";


// ------------------------------
// Animated Navbar Component
// ------------------------------
export default function AnimatedNavbar() {
  const circleRef = useRef<HTMLDivElement>(null);
  const circletwoRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isContrast, setIsContrast] = useState(false);

    const menuItems: Array<
  { text: string; href: string } | { lang: { from: string; to: string; link: string; flagSrc: string } }
> = [
  { text: "Homepage", href: "/en" },
  { text: "Projects", href: "/en/projects" },
  // { text: "Services", href: "#why-us" },
  { text: "Contact", href: "/en/contact-us" },
  { lang: { from: "EN", to: "DE", link: "/de", flagSrc: "/england.png" } }, // language switcher

];
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Initial animation
  useEffect(() => {
    const runNavbarAnimation = () => {
      let startX = 0;
      if (circletwoRef.current) {
        const logoRect = circletwoRef.current.getBoundingClientRect();
        const screenCenterX = window.innerWidth / 2;
        const logoLeft = logoRect.left;
        // Calculate offset to align logo center with screen center
        startX = screenCenterX - logoLeft - 28;
      }

      const tl = gsap.timeline({ delay: 0 });
      tl.fromTo(circletwoRef.current, {
        y: -60,
        x: startX,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
      }, "-=0.5")
        .to(circletwoRef.current, {
          x: 0, // Slide into its natural placeholder position
          duration: 0.5,
          ease: "power2.inOut",
        }, "+=0.2")
        .fromTo(
          navbarRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
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
      // Just run immediately
      runNavbarAnimation();
    }
  }, []);

  // Close menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        !menuButtonRef.current?.contains(event.target as Node) &&
        !menuContainerRef.current?.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Animate menu container and links when menu opens/closes
  useEffect(() => {
    if (isMenuOpen) {
      // Set container visible and clickable
      gsap.to(menuContainerRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
        ease: "power2.out",
      });
      // Animate links with pure sequential FadeIn from top to bottom
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
      // Fade out container and set unclickable
      gsap.to(menuContainerRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isMenuOpen]);

  // Show/hide navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShow(false); // scroll down — hide navbar
        setIsMenuOpen(false); // close mobile menu when scrolling down
      } else {
        setShow(true); // scroll up — show navbar
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    let mainAbsoluteBottom = 0;
    let hasHeroVideo = false;

    const updateDimensions = () => {
      const main = document.querySelector("main");
      if (main) {
        const rect = main.getBoundingClientRect();
        mainAbsoluteBottom = rect.top + window.scrollY + rect.height;
      }
      hasHeroVideo = document.querySelector("#scroll-container") !== null;
    };

    const handleContrast = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth < 768;
      const heroHeight = isMobile ? 1300 : 3000;

      // 1. Over the hero video at the top
      const overHeroVideo = hasHeroVideo && currentScrollY < heroHeight;

      // 2. Over the footer at the bottom
      const overFooter = mainAbsoluteBottom > 0 && (currentScrollY >= mainAbsoluteBottom - 96);

      if (overHeroVideo || overFooter) {
        setIsContrast(true);
      } else {
        setIsContrast(false);
      }
    };

    // Calculate dimensions initially
    updateDimensions();
    const timer = setTimeout(updateDimensions, 500);

    window.addEventListener("resize", updateDimensions);
    window.addEventListener("scroll", handleContrast);
    window.addEventListener("load", updateDimensions);
    handleContrast();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("scroll", handleContrast);
      window.removeEventListener("load", updateDimensions);
    };
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 w-full flex justify-center items-start z-50 transition-transform duration-550 ${
        show ? "translate-y-0" : "-translate-y-full"
      } ${isContrast ? "text-[#0802E2]" : "text-white"}`}>
        <div
          className={`relative flex flex-row mt-8 ml-5 pl-5 pr-5 pt-2 pb-2 border rounded-full items-center gap-8 transition-all duration-300 ${
            isContrast ? "bg-white border-[#0802E2]/25 shadow-lg" : "bg-[#0802E2] border-white/20"
          }`}
          ref={navbarRef}
        >
          {/* Desktop Links */}
          <div className="rounded-full relative flex items-center justify-center" style={{ width: "56px", height: "56px" }}>
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
              <img src="/CaseusRebrandingTranspertLogo.png" alt="Logo" className="z-1000 object-contain w-full h-full" />
            </div>
          </div>

          <Link
            href="/en"
            className={`hidden md:flex cursor-pointer relative group px-2 transition-colors duration-300 ${
              isContrast ? "text-[#0802E2]" : "text-white"
            }`}
          >
            Home
            <span className={`absolute bottom-0 left-0 h-[2px] w-0 transition-all group-hover:w-full ${
              isContrast ? "bg-[#0802E2]" : "bg-white"
            }`}></span>
          </Link>

          <a
            href="/en/projects/"
            className={`hidden md:flex cursor-pointer relative group px-2 transition-colors duration-300 ${
              isContrast ? "text-[#0802E2]" : "text-white"
            }`}
          >
            Projects
            <span className={`absolute bottom-0 left-0 h-[2px] w-0 transition-all group-hover:w-full ${
              isContrast ? "bg-[#0802E2]" : "bg-white"
            }`}></span>
          </a>

          <a
            href="/en#why-us"
            className={`hidden md:flex cursor-pointer relative group px-2 transition-colors duration-300 ${
              isContrast ? "text-[#0802E2]" : "text-white"
            }`}
          >
            Services
            <span className={`absolute bottom-0 left-0 h-[2px] w-0 transition-all group-hover:w-full ${
              isContrast ? "bg-[#0802E2]" : "bg-white"
            }`}></span>
          </a>

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
              {isMenuOpen ? "Close" : "Menu"}
            </span>
          </div>

          {/* Desktop Contact Button */}
          <div
            className={`flex-row group items-center gap-2 text-center px-8 pt-2 pb-3 rounded-full hidden md:flex glassbutton ${
              isContrast ? "contrast" : ""
            }`}
            onClick={toggleMenu}
          >
            <a
              href="/en/contact-us"
              className={`transition-colors duration-300 cursor-pointer ${
                isContrast ? "text-white group-hover:text-[#0802E2]" : "text-[#0802E2] group-hover:text-white"
              }`}
            >
              Contact
            </a>
          </div>

          {/* Mobile Dropdown Menu */}
          <div
            className="absolute left-0 right-0 flex flex-col gap-2 mt-4 items-center w-full md:hidden pointer-events-none opacity-0"
            style={{
              top: "100%",
            }}
            ref={menuContainerRef}
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
                    ref={(el) => ((linksRef.current[i] = el), undefined)}
                  >
                    <a
                      href={item.lang.link}
                      className="w-full h-full flex items-center justify-center gap-2 text-lg rounded-full font-semibold transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className={isContrast ? "text-gray-400" : "text-white/40"}>
                        DE
                      </span>
                      <span className={isContrast ? "text-gray-300" : "text-white/20"}>
                        /
                      </span>
                      <span className={isContrast ? "text-[#0802E2]" : "text-white"}>
                        EN
                      </span>
                    </a>
                  </div>
                );
              } else {
                return (
                  <div
                    key={i}
                    ref={(el) => ((linksRef.current[i] = el), undefined)}
                    onClick={() => setIsMenuOpen(false)}
                    className={`z-100 rounded-full flex border transition-colors duration-300 w-full h-[60px] items-center justify-center ${
                      isContrast
                        ? "bg-white border-[#0802E2]/25 shadow-lg"
                        : "bg-[#0802E2] border-white/20"
                    }`}
                  >
                    <a
                      href={item.href}
                      className={`w-full h-full flex items-center justify-center text-2xl rounded-full transition-colors duration-300 ${
                        isContrast ? "text-[#0802E2]" : "text-white"
                      }`}
                    >
                      {item.text}
                    </a>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </nav>
    </>
  );
}





//  styles 

// .glassnav {
// background-color: rgba(255, 255, 255, 0.3);
//   backdrop-filter: blur(4px);

// }

// .glassbutton {
//   transition: all 0.3s ease;
//     background-color: rgba(255, 255, 255, 0.8);
//   backdrop-filter: blur(4px);
// }


// .glassbutton:hover {
//     background-color: rgb(255, 255, 255, 0);
//   backdrop-filter: blur(0px);
// }

// .glassmenu {
//     background-color: rgba(255, 255, 255, 0.3);
//   backdrop-filter: blur(4px);
// }

// .lang-glass-big {
//     background-color: rgba(255, 255, 255, 0.1);

// }

// .lang-glass-small {
//     background-color: rgb(255, 255, 255, 0.5);

// }