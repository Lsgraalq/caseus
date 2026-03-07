"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";



export default function AnimatedNavbar() {
  const circleRef = useRef<HTMLDivElement>(null);
  const circletwoRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
const menuContainerRef = useRef<HTMLDivElement>(null);
const menuButtonRef = useRef<HTMLDivElement>(null);
const langRef = useRef<HTMLDivElement | null>(null);
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const menuItems: Array<
  { text: string; href: string } | { lang: { from: string; to: string; link: string; flagSrc: string } }
> = [
  { text: "Startseite", href: "/de" },
  { text: "Projekte", href: "/de/projects" },
  // { text: "Leistungen", href: "#why-us" },
  { text: "Kontakt", href: "/en/contact-us" },
  { lang: { from: "DE", to: "EN", link: "/en", flagSrc: "germany.png" } }, // переключатель
];
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  
  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.9 });
    const isMobile = window.innerWidth < 768;
    const distance = isMobile ? 60 : 230;

    tl.from(circletwoRef.current, {
      y: -60,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
    }, "-=0.5")
      .fromTo(
        circletwoRef.current,
        { x: 0, color: "#1e2939" },
        { x: -distance, duration: 0.5, color: "#101828" },
        "+=0.2"
      )
      .fromTo(
        navbarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        "+=0"
      );
  }, []);

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

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo(
        linksRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.2,
          ease: "power2.out",
        }
      );
    }
  }, [isMenuOpen]);


   useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Скролл вниз — скрываем
        setShow(false);
      } else {
        // Скролл вверх — показываем
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
    <nav className={`fixed top-0 left-0 w-full flex justify-center items-start z-50 text-black transition-transform duration-550 ${
  show ? "translate-y-0" : "-translate-y-full"
}`}>
  <div
    ref={circletwoRef}
    className="absolute w-12 h-12 rounded-full text-black text-xl font-bold mt-10 z-1000"
  >
    <img src="/logo.png" alt="" className="z-1000" />
  </div>

  <div
    className="relative flex flex-row mt-8 ml-5 pl-5 pr-5 pt-2 pb-2 border-white/20 border rounded-2xl items-center gap-8 glassnav"
    ref={navbarRef}
  >
    <div className="w-12 h-12 rounded-full"></div>

    <Link
      href="/de"
      className="hidden md:flex text-black cursor-pointer relative group px-2"
    >
      Startseite
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all group-hover:w-full"></span>
    </Link>

    <a
      href="/de/projects/"
      className="hidden md:flex text-black cursor-pointer relative group px-2"
    >
      Projekte
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all group-hover:w-full"></span>
    </a>

    <a
      href="/de#whyus"
      className="hidden md:flex text-black cursor-pointer relative group px-2"
    >
      Leistungen
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all group-hover:w-full"></span>
    </a>

    <div
      className="flex flex-row items-center gap-2 text-center px-5 pt-3 pb-3 rounded-xl md:hidden glassbutton"
      onClick={toggleMenu}
      ref={menuButtonRef}
    >
      {isMenuOpen ? (
        <IoMdClose className="w-5 text-black" />
      ) : (
        <IoIosMenu className="w-5 flex text-black" />
      )}
      <p className="text-black font-semibold">Menü</p>
    </div>

    <div
      className="flex-row group items-center gap-2 text-center px-8 pt-2 pb-3 rounded-xl hidden md:flex transition duration-400 glassbutton"
      onClick={toggleMenu}
    >
      <a
        href="/en/contact-us"
        className="text-black group-hover:text-black font-semibold transition-colors duration-300 cursor-pointer"
      >
        Kontakt
      </a>
    </div>
  </div>
</nav>

    <div className="z-1000 fixed top-0 left-0 w-full md:hidden">
      {isMenuOpen && (
  <div className="absolute mx-auto w-full flex flex-col gap-2 mt-44 meni" ref={menuContainerRef}>
    {menuItems.map((item, i) => {
  if ("lang" in item) {
    return (
      <div
        key={`lang-${i}`}
        className="glassmenu z-100 rounded-2xl mx-auto flex border-white/20 border items-center px-4 py-3"
      ref={(el) => (linksRef.current[i] = el, undefined)}>
        <a
          href={item.lang.link}
          className="w-40 h-15 flex items-center lang-glass-big rounded-xl p-1 px-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex items-center lang-glass-small rounded-xl px-2 py-1 mr-2 shadow-sm w-[70%] h-11"
          >
            <img
              src={item.lang.flagSrc}
              alt={item.lang.from}
              className="w-7 h-5 mr-1 ml-3"
            />
            <p className="text-black font-medium text-lg pl-2">{item.lang.from}</p>
          </div>
          <p className="text-gray-800 text-lg font-medium">{item.lang.to}</p>
        </a>
      </div>
    );
  } else {
    return (
      <div
        key={i}
        ref={(el) => (linksRef.current[i] = el, undefined)}
        onClick={() => setIsMenuOpen(false)}
        className="glassmenu z-100 rounded-2xl mx-auto flex border-white/20 border"
      >
        <a
          href={item.href}
          className="text-black px-10 pt-7 pb-7 text-4xl rounded-2xl"
        >
          {item.text}
        </a>
      </div>
    );
  }
})}
  </div>
)}
    </div>
    </>
  );
}
