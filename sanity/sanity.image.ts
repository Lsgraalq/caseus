import {createClient} from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

const client = createClient({projectId, dataset, apiVersion: '2025-01-01', useCdn: true})
const builder = createImageUrlBuilder(client)

export function urlForImage(source: any) {
  return builder.image(source)
}
