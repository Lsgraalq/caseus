// app/en/projects/[slug]/page.tsx
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { sanityClient } from '@/sanity/client'
import { PROJECT_BY_SLUG, PROJECT_SLUGS } from '@/sanity/queries'
import { urlForImage } from '@/sanity/sanity.image'
import Portable from '@/components/Portable'

export const revalidate = 60

type Params = { slug: string }

// если у тебя Next 15+ — await params
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const data = await sanityClient.fetch(PROJECT_BY_SLUG, { slug })
  if (!data) return {}
  return {
    title: `${data.title} — Project`,
    description: data.summary ?? '',
  }
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await sanityClient.fetch(PROJECT_SLUGS)
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const project = await sanityClient.fetch(PROJECT_BY_SLUG, { slug })
  if (!project) return notFound()

  const { title, summary, heroImage, timeline, sections } = project
  const subtitle = timeline?.startDate
    ? `${timeline.startDate} — ${timeline.ongoing ? 'present' : timeline.endDate ?? ''}`.trim()
    : null

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        {summary && <p className="mt-2">{summary}</p>}
      </div>

      {heroImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl mb-8">
          <Image
            src={urlForImage(heroImage).width(1600).height(900).url()}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {sections?.length > 0 && (
        <aside className="mb-8 rounded-xl border p-4 bg-white/50">
          <h2 className="font-semibold mb-2">Оглавление</h2>
          <ul className="flex flex-wrap gap-3">
            {sections.map((s: any) => (
              <li key={s.anchor}>
                <a href={`#${s.anchor}`} className="text-blue-600 hover:underline">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <div className="space-y-12">
        {sections?.map((s: any) => (
          <section key={s.anchor} id={s.anchor} className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-4">{s.title}</h2>
            <ol className="list-decimal pl-6 space-y-6">
              {s.items?.map((it: any, i: number) => (
                <li key={i}>
                  {it.heading && <h3 className="font-semibold mb-1">{it.heading}</h3>}
                  {it.body && <Portable value={it.body} />}
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </main>
  )
}
