import { useEffect, useRef, useState } from "react";

export function useNavbar() {
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isContrast, setIsContrast] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

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

  // Contrast logic
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

      const overHeroVideo = hasHeroVideo && currentScrollY < heroHeight;
      const overFooter = mainAbsoluteBottom > 0 && (currentScrollY >= mainAbsoluteBottom - 96);

      if (overHeroVideo || overFooter) {
        setIsContrast(true);
      } else {
        setIsContrast(false);
      }
    };

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

  return {
    isMenuOpen,
    setIsMenuOpen,
    show,
    isContrast,
    toggleMenu,
    menuContainerRef,
    menuButtonRef,
  };
}
