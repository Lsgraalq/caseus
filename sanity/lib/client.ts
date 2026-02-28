// sanity/lib/client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'q6so6655',
  dataset: 'production',
  apiVersion: '2024-01-01', // Можно оставить так
  useCdn: false, // Ставим false, чтобы контент обновлялся мгновенно
})