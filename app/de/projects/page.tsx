import React from "react";
import Link from "next/link";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import Footer from "@/components/Footer";
import RotatingText from "@/components/RotatingText";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { translations } from "@/utils/translations";

export const revalidate = 60;

const query = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  title2,
  slug,
  cardImage
}`;

export default async function ProjectsPage() {
  const projects = await client.fetch(query);
  const lang = "de";
  const t = translations[lang];

  return (
    <>
      <main className="bg-white relative z-10 mb-[100vh] min-h-screen">
        <AnimatedNavbar locale={lang} />
        
        {/* Rotating marquee block */}
        <div className="pt-30 pb-10">
          <RotatingText text={t.projectsPage.title} />
        </div>

        {/* Projects Grid */}
        <div className="px-3 md:px-10 pb-30 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10 w-full">
            {projects.map((item: any, idx: number) => {
              const title = item.title?.[lang] || item.title?.en || "";
              const title2 = item.title2?.[lang] || "";
              
              return (
                <div key={item._id || idx} className="w-full">
                  <Link href={`/${lang}/projects/${item.slug.current}`} className="flex flex-col group">
                    {item.cardImage && (
                      <div className="w-full aspect-[4/2] overflow-hidden rounded-xl">
                        <img 
                          src={urlFor(item.cardImage).width(1600).url()} 
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                        />
                      </div>
                    )}
                    
                    <div className="pt-1">
                      <span className="md:text-[25px] apercu-bold">
                        {title}{" "}
                      </span>
                      <span className="md:text-[25px]">
                        {title2}
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer locale={lang} />
    </>
  );
}