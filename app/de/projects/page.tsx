import React from 'react';
import AnimatedNavbar from '@/components/AnimatedNavbarDE';
import FooterDE from '@/components/FooterDE'; // 
import RotatingText from '@/components/RotatingText';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
export const revalidate = 60;
// 1. Запрос в Sanity: берем все проекты и сортируем от новых к старым
const query = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  title2,
  slug,
  cardImage
}`;







// 2. Делаем функцию async, чтобы она могла фетчить данные на сервере
export default async function ProjectsPage() {
  // Фетчим данные
  const projects = await client.fetch(query);
  const lang = 'de';

  return (
    <>
      {/* Основной контент (z-10 и mb-[100vh] для работы липкого футера) */}
      <main className="bg-white relative z-10 mb-[100vh] min-h-screen">
        <AnimatedNavbar />
        
        {/* Блок с бегущей строкой */}
        <div className="pt-30 pb-10">
          <RotatingText text="PROJEKTE" />
        </div>

        {/* Сетка проектов (Grid) */}
        <div className="px-3 md:px-10 pb-30 pt-10">
          {/* Сетка: 1 колонка на мобилке, 2 на ПК */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10 w-full">
            
            {projects.map((item: any, index: number) => {
              const title = item.title?.[lang]; 
                
              return (
                <div key={item._id || index} className="w-full">
                  <a href={`/de/projects/${item.slug.current}`} className="flex flex-col group">
                    
                    {/* Картинка с анимацией зума */}
                    {item.cardImage && (
                      <div className="w-full aspect-4/2 overflow-hidden rounded-xl">
                        <img 
                          src={urlFor(item.cardImage).width(1600).url()} 
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                        />
                      </div>
                    )}
                    
                    {/* Текст под картинкой */}
                    <div className="pt-1">
                      <span className="md:text-[25px] apercu-bold">
                        {title} {' '}
                      </span>
                      <span className="md:text-[25px]">
                        {item.title2?.[lang]}
                      </span>
                    </div>
                    
                  </a>
                </div>
              );
            })}
            
          </div>
        </div>
      </main>

      {/* Твой подвал */}
      <FooterDE />
    </>
  );
}