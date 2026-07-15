# caseus

> **Created: 2025** — commercial project (bilingual studio / agency website with a headless CMS).

A polished, **bilingual (German / English)** website for a creative studio, built with **Next.js 16** and powered by **Sanity** as a headless CMS. One of the largest and most complete projects in this repo (100+ commits), combining a content-managed portfolio with a heavily animated, custom front end.

## Features

- 🌍 **Full internationalization** — separate `de/` and `en/` route trees (home, projects, project detail, contact, legal pages).
- 🧩 **Headless CMS (Sanity)** — projects are authored in an **embedded Sanity Studio** (`/studio`), with schemas, GROQ queries, PortableText rendering, and image URL building.
- 🎬 **Rich motion & UX** — GSAP animations, Lenis smooth scrolling, a preloader, an animated navbar, a custom "jelly" cursor, rotating text, and a global background video.
- 🔍 **SEO ready** — dynamic `sitemap.ts`, `robots.ts`, and per-locale metadata.
- ⚖️ **Legal pages** — Impressum & Datenschutz (German legal requirements).
- 📈 Vercel Speed Insights for performance monitoring.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + TypeScript
- **Sanity** (`next-sanity`, `@sanity/image-url`, `@portabletext/react`) — headless CMS
- **GSAP** + **Lenis** — animation & smooth scroll
- **styled-components**, react-icons
- Tailwind CSS

## Getting started

Configure your Sanity project in `.env.local` (project id / dataset), then:

```bash
npm install
npm run dev
```

Open http://localhost:3000. The CMS is available at `/studio`.
