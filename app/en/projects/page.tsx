import {sanityClient} from '@/sanity/client'
import {PROJECTS_LIST} from '@/sanity/queries'
import ProjectCard from '@/components/ProjectCard'

export const revalidate = 60 // ISR

export default async function ProjectsPage() {
  const projects = await sanityClient.fetch(PROJECTS_LIST)

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Проекты</h1>

      {(!projects || projects.length === 0) && (
        <p>Пока пусто.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects?.map((p: any) => (
          <ProjectCard
            key={p._id}
            title={p.title}
            summary={p.summary}
            slug={p.slug}
            heroImage={p.heroImage}
            start={p.timeline?.startDate}
            end={p.timeline?.endDate}
            ongoing={p.timeline?.ongoing}
          />
        ))}
      </div>
    </main>
  )
}
