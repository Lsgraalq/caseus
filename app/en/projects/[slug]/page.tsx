import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'

export default async function ProjectPage({ params, searchParams }: any) {
  const { slug } = await params;
  // Допустим, язык передается через query param ?lang=en или ?lang=de
  const lang = 'en' // Тут всегда английский
  
  const project = await client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug })

  if (!project) return <div>Проект не найден</div>

  const color = project.accentColor || '#000000'

  return (
    <main className="max-w-6xl mx-auto px-4 py-20">
      {/* Шапка проекта с акцентным цветом */}
      <h1 style={{ color: color }} className="text-6xl font-bold mb-4">
        {project.title?.[lang]}
      </h1>
      <p className="text-xl mb-10 opacity-80">{project.title2?.[lang]}</p>

      {/* Главное фото */}
      {project.mainImage && (
        <div className="w-full h-[70vh] mb-20">
          <img 
            src={urlFor(project.mainImage).width(1600).url()} 
            className="w-full h-full object-cover rounded-3xl"
            alt="Hero"
          />
        </div>
      )}

      {/* Инфо о проекте: Клиент, Год, Локация */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20 border-y border-white/10 py-10">
        <div>
          <h3 className="uppercase text-sm opacity-50 mb-2">Client</h3>
          <p className="text-xl">{project.client}</p>
        </div>
        <div>
          <h3 className="uppercase text-sm opacity-50 mb-2">Year</h3>
          <p className="text-xl">{project.year}</p>
        </div>
        <div>
          <h3 className="uppercase text-sm opacity-50 mb-2">Location</h3>
          <p className="text-xl">{project.location?.[lang]}</p>
        </div>
      </div>

      {/* Описание и Видео */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
        <div className="prose prose-invert prose-xl">
          <PortableText value={project.description?.[lang]} />
          <div className="mt-10 p-6 border-l-2" style={{ borderColor: color }}>
             <PortableText value={project.description2?.[lang]} />
          </div>
        </div>
        
        {project.youtubeUrl && (
          <div className="aspect-video rounded-2xl overflow-hidden bg-white/5">
            <iframe 
              width="100%" height="100%" 
              src={project.youtubeUrl.replace("watch?v=", "embed/")}
              frameBorder="0" allowFullScreen
            />
          </div>
        )}
      </div>

      {/* Твоя Галерея 2 квадрата + 1 широкая */}
      <div className="grid grid-cols-2 gap-4">
        {project.gallery?.map((img: any, index: number) => {
          const isWide = (index + 1) % 3 === 0
          return (
            <div key={img._key} className={isWide ? "col-span-2" : "col-span-1"}>
              <img 
                src={urlFor(img).width(isWide ? 1200 : 600).url()} 
                className="w-full h-[500px] object-cover rounded-2xl"
                alt="Gallery"
              />
            </div>
          )
        })}
      </div>
    </main>
  )
}