import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Link from "next/link";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import Footer from "@/components/Footer";
import { translations } from "@/utils/translations";

export const revalidate = 60;

const query = `
{
  "project": *[_type == "project" && slug.current == $slug][0] {
    ...,
    tags
  },
  "moreProjects": *[_type == "project" && slug.current != $slug] | order(_createdAt desc) [0...2] {
    _id,
    title,
    title2,
    mainImage,
    cardImage,
    year,
    slug
  }
}
`;

type Props = {
  params: { slug: string };
};

// Metadata generator
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Query sanity (only the fields needed for SEO)
  const metadataQuery = `*[_type == "project" && slug.current == $slug][0]{
    title,
    description,
    "ogImage": mainImage.asset->url
  }`;

  const project = await client.fetch(metadataQuery, { slug });

  if (!project) {
    return {
      title: "Project Not Found | Caseus Studio",
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Caseus Studio`,
      description: project.description,
      images: [
        {
          url: project.ogImage || "/default-og.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: any) {
  const { slug } = await params;
  const lang = "de";
  const t = translations[lang];

  const data = await client.fetch(query, { slug });

  const project = data.project;
  const moreProjects = data.moreProjects;

  if (!project) return <div>{t.projectDetails.notFound}</div>;

  return (
    <>
      {/* --- MAIN CONTENT LAYER --- */}
      <main className="bg-white relative z-[1]">
        <AnimatedNavbar locale={lang} />
        <div className="absolute right-10 pt-12 px-3 md:px-10 z-[10000]">
          <div className="flex-row right-0 gap-1 md:flex hidden">
            <Link href={`/en/projects/${project.slug.current}`} className="apercu-thin hover:underline">EN</Link>
            /
            <Link href={`/de/projects/${project.slug.current}`} className="apercu-bold underline">DE</Link>
          </div>
        </div>

        {/* Breadcrumbs & Navigation */}
        <div className="pt-30 flex flex-row md:px-10 gap-1 text-sm md:text-base px-3 relative z-[2]">
          <Link href={`/${lang}`} className="text-blue-700">{t.projectDetails.home}</Link>
          <div className="hidden md:flex">{"(☆ω☆)"}</div>
          <div className="md:hidden flex">-</div>
          <Link href={`/${lang}/projects`} className="text-blue-700">{t.projectDetails.projects}</Link>
          <div className="md:hidden flex">-</div>
          <div className="hidden md:flex">{"( ･ω･)☞"}</div>
          {project.title2?.[lang]}
        </div>

        {/* Main Title */}
        <h1 className="2xl:text-[165px] bold 2xl:px-10 apercu-semibold 2xl:leading-40 2xl:pb-20 2xl:pt-5 pt-5 px-3 text-5xl md:text-[80px] md:px-10 xl:text-[130px] pb-8">
          {project.title?.[lang]}
        </h1>

        {/* Hero Image */}
        {project.mainImage && (
          <div className="w-full aspect-[1/2] md:aspect-[2/1] overflow-hidden pb-15">
            <img 
              src={urlFor(project.mainImage).width(2500).url()} 
              className="w-full h-full object-cover hidden md:flex" 
              alt="Hero"
            />
            <img 
              src={urlFor(project.mainImageForPhones).width(1200).url()} 
              className="w-full h-full object-cover md:hidden flex" 
              alt="HeroForPhones"
            />
          </div>
        )}

        {/* --- PROJECT DETAILS GRID --- */}
        <div className="flex px-3 flex-col md:grid md:grid-cols-2 md:gap-10 md:px-10 pb-20">
          {/* Left Column: Title2, Tags, Video */}
          <div className="flex flex-col gap-2">
            {/* Secondary Title */}
            <p className="pt-5 text-6xl md:text-[75px] 2xl:text-[110px] apercu-bold pb-7">
              {project.title2?.[lang]}
            </p>
            
            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-col gap-2 pb-7">
                {project.tags.map((tag: any, index: number) => {
                  const tagLabel = tag.label?.[lang];
                  if (!tagLabel) return null;

                  if (tag.link) {
                    return (
                      <a
                        key={tag._key || index}
                        href={tag.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-sm uppercase apercu-thin cursor-pointer"
                      >
                        {tagLabel} 
                      </a>
                    );
                  }

                  return (
                    <div key={tag._key || index} className="text-sm uppercase apercu-thin">
                      {tagLabel}
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* YouTube Video Embed */}
            {project.youtubeUrl && (
              <div className="w-full aspect-video rounded-md overflow-hidden">
                <iframe 
                  className="w-full h-full" 
                  src={project.youtubeUrl.replace("watch?v=", "embed/")}
                  frameBorder="0" 
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Right Column: Descriptions & Info Blocks */}
          <div className="flex flex-col pb-15">
            <div>
              {/* Descriptions */}
              <div className="flex flex-col gap-10">
                <div className="text-[20px] md:text-[35px] md:leading-9.5 leading-6.5">
                  <PortableText value={project.description?.[lang]} />
                </div>
                <div className="text-[18px] leading-6.5">
                  <PortableText value={project.description2?.[lang]} />
                </div>
              </div>

              {/* Project Info: Client, Year, Services, Location */}
              <div className="pt-10 pb-10 flex flex-col gap-7 text-lg md:flex-row">
                <div>
                  <h3 className="apercu-bold">{t.projectDetails.client}</h3>
                  <p>{project.client}</p>
                </div>
                
                <div>
                  <h3 className="apercu-bold">{t.projectDetails.year}</h3>
                  <p>{project.year}</p>
                </div>
                
                <div>
                  {project.tags && project.tags.length > 0 && (
                    <div>
                      <h3 className="apercu-bold">{t.projectDetails.services}</h3>
                      <div>
                        {project.tags.map((tag: any, index: number) => {
                          const tagLabel = tag.label?.[lang];
                          if (!tagLabel) return null;

                          return (
                            <div key={tag._key || index}>
                              <span></span>
                              <span>{tagLabel}</span>
                              {index !== project.tags.length - 1 && <span>, </span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="apercu-bold">{t.projectDetails.location}</h3>
                  <p>{project.location?.[lang]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- GALLERY SECTION --- */}
        <div className="pb-30 grid grid-cols-1 md:grid-cols-2 gap-4 px-3 md:px-10">
          {project.gallery?.map((img: any, index: number) => {
            const isWide = (index + 1) % 3 === 0;
            return (
              <div key={img._key || index} className={`${isWide ? "md:col-span-2" : ""}`}>
                <img 
                  src={urlFor(img).width(1920).url()} 
                  className="rounded-3xl w-full h-full object-cover" 
                  alt="Gallery"
                />
              </div>
            );
          })}
        </div>

        {/* --- MORE PROJECTS SECTION --- */}
        {moreProjects && moreProjects.length > 0 && (
          <div className="bg-[#0500FF]">
            <div className="px-3 md:px-10 bg-white rounded-b-3xl border-0 pb-15">
              <h3 className="text-5xl apercu-bold pb-7 md:text-[75px]">
                {t.projectDetails.moreProjects}
              </h3>

              <div className="flex flex-col gap-7 md:flex-row w-full">
                {moreProjects.slice(0, 2).map((item: any, index: number) => {
                  const title = item.title?.[lang] || item.title?.en || "";
                  const title2 = item.title2?.[lang] || "";
                    
                  return (
                    <div key={item._id || index} className="flex-1 w-full">
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
                        
                        <div className="pt-2">
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
          </div>
        )}
      </main>

      <Footer locale={lang} />
    </>
  );
}