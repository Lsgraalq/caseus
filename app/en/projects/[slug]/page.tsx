import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import AnimatedNavbar from '@/components/AnimatedNavbarEN';


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

export default async function ProjectPage({ params, searchParams }: any) {
  const { slug } = await params;
  const lang = 'en'
  
  const data = await client.fetch(query, { slug });

  const project = data.project;
  const moreProjects = data.moreProjects;

  if (!project) return <div>Project not found</div>

  const color = project.accentColor || '#000000'

  return (
<main className="">
      <AnimatedNavbar></AnimatedNavbar>
      {/* Шапка проекта с акцентным цветом */}
      <div className="md:pt-30 pt-30 flex flex-row md:px-10 gap-1 text-sm md:text-base px-3">
        <a href="/en/" className="text-blue-700">HOME</a>
        <div className="hidden md:flex">{'(☆ω☆)'}</div>
        <div className="md:hidden flex">-</div>
        <a href="/en/projects" className="text-blue-700">PROJECTS</a>
        <div className="md:hidden fle">-</div>
        <div className="hidden md:flex">{'( ･ω･)☞'}</div>
        {project.title2?.[lang]}
        
      </div>
      <h1 className="2xl:text-[165px] bold  2xl:px-10 apercu-semibold 2xl:leading-40 2xl:pb-20 2xl:pt-5 pt-5 px-3 text-5xl  md:text-[80px] md:px-10 xl:text-[130px] pb-8">
        {project.title?.[lang]}
        
      </h1>
      

      {/* Главное фото */}
      {project.mainImage && (
        <div className="w-full aspect-[3.5/4] md:aspect-video  overflow-hidden">
  <img 
    src={urlFor(project.mainImage).width(1600).url()} 
    className="w-full h-full object-cover 2xl:h-screen" 
    alt="Hero"
  />
</div>
      )}
      <p className="pt-5 text-6xl px-3 apercu-bold pb-7">
        {/* {project.title2?.[lang]} */}
Oatly On The Rocks
      </p>

      {project.youtubeUrl && (
          <div className="px-3">
            <iframe 
              width="100%" height="250" 
              className="rounded-md "
              src={project.youtubeUrl.replace("watch?v=", "embed/")}
              frameBorder="0" allowFullScreen
            />
          </div>
        )}
  


    {project.tags && project.tags.length > 0 && (
  <div className="flex flex-col gap-2 mt-7 px-3 pb-7">
    {project.tags.map((tag: any, index: number) => {
      const tagLabel = tag.label?.[lang];

      if (!tagLabel) return null;

      // 1. Вариант СО ссылкой (кликабельный тег <a>)
      if (tag.link) {
        return (
          <a
            key={tag._key || index}
            href={tag.link}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-sm uppercase  apercu-thin  cursor-pointer"
          >
            {tagLabel} 
          </a>
        );
      }

      // 2. Вариант БЕЗ ссылки (обычный div, выглядит как тег, но не ломает верстку)
      return (
        <div
          key={tag._key || index}
          className="text-sm uppercase apercu-thin"
        >
          {tagLabel}
        </div>
      );
    })}
  </div>
)}

 {/* Описание и Видео */}
      <div className="px-3">
        <div className="flex flex-col gap-10">
          <div className=" text-[20px] leading-6.5">
            <PortableText value={project.description?.[lang]} />
          </div>
          <div className=" text-[18px] leading-6.5">
             <PortableText value={project.description2?.[lang]} />
          </div>
        </div>


      {/* Инфо о проекте: Клиент, Год, Локация */}
      <div className="pt-10 pb-10 flex flex-col gap-7 text-lg">
        <div>
          <h3 className="apercu-bold ">Client:</h3>
          <p className="">{project.client}</p>
        </div>
        <div>
          <h3 className="apercu-bold">Year:</h3>
          <p className="">{project.year}</p>
        </div>
        <div className="">
           {project.tags && project.tags.length > 0 && (
  <div className="">
    <h3 className="apercu-bold">
      Services:
    </h3>

    <div className="">
      {project.tags.map((tag: any, index: number) => {
        const tagLabel = tag.label?.[lang];
        if (!tagLabel) return null;

        return (
          <div key={tag._key || index} className="">
            <span className="" />
            <span className="apercu-thin">
              {tagLabel}
            </span>
            {index !== project.tags.length - 1 && (
              <span className="">,</span>
            )}
          </div>
        );
      })}
    </div>
  </div>
)}
        </div>
        <div>
          <h3 className="apercu-bold">Location:</h3>
          <p className="">{project.location?.[lang]}</p>
        </div>
      </div>



  
        
        
      </div>

      {/* Твоя Галерея 2 квадрата + 1 широкая */}
      <div className="pb-30">
        {project.gallery?.map((img: any, index: number) => {
          const isWide = (index + 1) % 3 === 0
          return (
            <div key={img._key} className="px-3 pt-2 pb-2">
              <img 
                src={urlFor(img).width(isWide ? 1200 : 600).url()} 
                className="rounded-xl"
                alt="Gallery"
              />
            </div>
          )
        })}
      </div>



      {moreProjects && moreProjects.length > 0 && (
  <div className="  bg-black">
    <div className="px-3 bg-white rounded-b-3xl border-0">
    <h3 className="text-5xl apercu-bold pb-7">
      More Projects
    </h3>

    <div className="flex flex-col gap-7">
      {moreProjects.slice(0, 2).map((item: any, index: number) => {
        const title = item.title?.[lang];
          
        return (
          <div key={item._id || index} className="">
            {item.cardImage && (
              <div className="w-full aspect-[4/2.5] md:aspect-video  overflow-hidden">
                <img 
                  src={urlFor(item.cardImage).width(800).url()} 
                  alt={title}
                  className="w-full h-full object-cover 2xl:h-screen rounded-xl" 
                />
              </div>
            )}
            
            <div className="pt-2">
              <span className="apercu-bold">
                {title} {' '}
              </span>
              <span className="">
                {item.title2?.[lang]}
              </span>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  </div>
)}
<div className="bg-black h-screen "></div>
    </main>
  )
}