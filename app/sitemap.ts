import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.caseus.studio';

  return [
    // 1. Главная страница (Home)
    {
      url: `${baseUrl}/en`, 
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          de: `${baseUrl}/de`,
          'x-default': `${baseUrl}/en`, 
        },
      },
    },
    
    
    {
      url: `${baseUrl}/en/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/projects`,
          de: `${baseUrl}/de/projects`,
          'x-default': `${baseUrl}/en/projects`,
        },
      },
    },


  ]
}