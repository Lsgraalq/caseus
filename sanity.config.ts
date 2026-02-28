// sanity.config.ts
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Rostik - Lox | Papich - Bog', // admin page name

  projectId: 'q6so6655', 
  dataset: 'production',

  basePath: '/studio', // url where admin page is

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
})