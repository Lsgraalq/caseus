import {groq} from 'next-sanity'

// Список для /projects
export const PROJECTS_LIST = groq`*[_type=="project"] | order(timeline.startDate desc){
  _id,
  title,
  "slug": slug.current,
  summary,
  heroImage,
  timeline{startDate, endDate, ongoing}
}`

export const PROJECTS_LIST_DE = groq`*[_type=="projectDE"] | order(timeline.startDate desc){
  _id,
  title,
  "slug": slug.current,
  summary,
  heroImage,
  timeline{startDate, endDate, ongoing}
}`

// Один проект для /projects/[slug]
export const PROJECT_BY_SLUG = groq`*[_type=="project" && slug.current==$slug][0]{
  _id,
  title,
  summary,
  "slug": slug.current,
  heroImage,
  timeline{startDate, endDate, ongoing},
  sections[]{
    title,
    "anchor": anchor.current,
    items[]{
      heading,
      body
    }
  }
}`

// Все слаги (для generateStaticParams)
export const PROJECT_SLUGS = groq`*[_type=="project" && defined(slug.current)][]{
  "slug": slug.current
}`
