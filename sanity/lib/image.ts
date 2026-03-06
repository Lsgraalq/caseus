// sanity/lib/image.ts
import { createImageUrlBuilder } from '@sanity/image-url'
 // Или впиши ID строками, если нет env.ts

const imageBuilder = createImageUrlBuilder({
  projectId: 'q6so6655',
  dataset:  'production',
})

export const urlFor = (source: any) => {
  return imageBuilder.image(source)
}