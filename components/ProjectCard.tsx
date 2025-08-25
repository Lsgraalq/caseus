import Image from 'next/image'
import Link from 'next/link'
import {urlForImage} from '@/sanity/sanity.image'

type Props = {
  title: string
  summary?: string
  slug: string
  heroImage?: any
  start?: string
  end?: string
  ongoing?: boolean
  href?: string            // ✅ добавили явный href
}

export default function ProjectCard({
  title, summary, slug, heroImage, start, end, ongoing, href,
}: Props) {
  const subtitle = start
    ? `${start} — ${ongoing ? 'heute' : (end ?? '')}`.trim() // можно оставить 'present' — по желанию
    : undefined

  const link = href ?? `/projects/${slug}` // fallback на старое поведение

  return (
    <Link href={link} className="group block rounded-2xl border p-4 hover:shadow-md transition">
      {heroImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl mb-3">
          <Image
            src={urlForImage(heroImage).width(1200).height(675).url()}
            alt={title}
            fill
            className="object-cover group-hover:scale-[1.02] transition"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      {summary && <p className="mt-2 line-clamp-2">{summary}</p>}
    </Link>
  )
}
