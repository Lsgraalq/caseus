// sanity/lib/queries.ts
export const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  title,
  title2,
  mainImage,
  cardImage,
  tags,
  description,
  description2,
  youtubeUrl,
  client,
  year,
  location,
  services,
  gallery,
  accentColor
}`