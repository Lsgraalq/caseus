"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PiArrowRightThin } from "react-icons/pi";
import { urlFor } from "@/sanity/lib/image";

gsap.registerPlugin(ScrollTrigger);

// Define prop types for safety
type ProjectProps = {
  projects: any[];
};

export default function ProjectsSection({ projects }: ProjectProps) {
  const section2Ref = useRef(null);

  // Projects scroll animation
  useEffect(() => {
    if (projects.length > 0) {
      const isMobile = window.innerWidth < 768;
      const startProjectPosition = isMobile ? "top 99%" : "top 85%";

      gsap.utils.toArray<HTMLElement>(".project").forEach((box) => {
        gsap.fromTo(
          box,
          { opacity: 0, y: 200 },
          {
            scrollTrigger: {
              trigger: box,
              start: startProjectPosition,
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
          }
        );
      });
      
      ScrollTrigger.refresh();
    }
  }, [projects]);

  return (
    <section className="w-full mx-auto" id="section2" ref={section2Ref}>
      <div className="flex flex-col gap-5 md:mx-10 mx-2" id="projectFlex">
        {projects.length > 0 && (
          <>
            {/* Top row: 2 projects */}
            <div className="flex flex-col md:flex-row gap-5">
              {projects.slice(0, 2).map((proj) => (
                <a key={proj._id} href={`/en/projects/${proj.slug.current}`} className="relative group rounded-2xl overflow-hidden flex-1 cursor-pointer project aspect-[4/2] block">
                  {proj.cardImage && (
                    <img
                      src={urlFor(proj.cardImage).width(1200).url()}
                      alt={proj.title?.en}
                      className="block w-full h-full rounded-2xl transition-transform duration-500 group-hover:scale-105 object-cover"
                    />
                  )}
                  <div className="absolute bottom-4 left-4 bg-white px-5 pt-3 pb-3 rounded-xl flex flex-row gap-3 z-10">
                    <p className="text-black font-semibold text-xl md:text-2xl m-auto">{proj.title?.en}</p>
                    <div className="inline-flex items-center justify-center rounded-full bg-gray-100 transition-colors duration-550 ease-in-out group-hover:bg-black p-2 md:p-3">
                      <PiArrowRightThin className="text-xl text-black group-hover:text-white transition-colors duration-550 ease-in-out" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Bottom row: 1 wide project */}
            {projects[2] && (
              <a href={`/en/projects/${projects[2].slug.current}`} className="relative group rounded-2xl overflow-hidden w-full cursor-pointer project md:aspect-[16/7] aspect-[4/4] block">
                {projects[2].cardImage && (
                  <img
                    src={urlFor(projects[2].cardImage).width(1920).url()}
                    alt={projects[2].title?.en}
                    className="block w-full h-full rounded-2xl transition-transform duration-500 group-hover:scale-105 object-cover"
                  />
                )}
                <div className="absolute bottom-4 left-4 bg-white px-5 pt-3 pb-3 rounded-xl flex flex-row gap-3 z-10">
                  <p className="text-black font-semibold text-xl md:text-2xl m-auto">{projects[2].title?.en}</p>
                  <div className="inline-flex items-center justify-center rounded-full bg-gray-100 transition-colors duration-550 ease-in-out group-hover:bg-black p-2 md:p-3">
                    <PiArrowRightThin className="text-xl text-black group-hover:text-white transition-colors duration-550 ease-in-out" />
                  </div>
                </div>
              </a>
            )}
          </>
        )}
      </div>
    </section>
  );
}