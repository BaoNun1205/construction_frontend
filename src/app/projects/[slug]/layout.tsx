import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { fetchPublicProjectBySlug } from '@/lib/public-api'
import {
  buildMetadata,
  humanizeSlug,
  projectJsonLd,
  trimDescription
} from '@/lib/seo'

interface Props {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await fetchPublicProjectBySlug(slug)

  if (!project) {
    return buildMetadata({
      title: `Dự án ${humanizeSlug(slug)}`,
      description:
        'Chi tiết dự án xây dựng, hình ảnh công trình và phạm vi thi công được thực hiện bởi Lai Phát.',
      path: `/projects/${slug}`,
      keywords: ['chi tiết dự án xây dựng', 'dự án công trình', humanizeSlug(slug)]
    })
  }

  return buildMetadata({
    title: project.title,
    description: trimDescription(project.description),
    path: `/projects/${project.slug}`,
    image: project.mainImage,
    type: 'article',
    keywords: [
      project.category?.name,
      ...(project.workingScope || []),
      'dự án xây dựng',
      'công trình xây dựng'
    ].filter((value): value is string => Boolean(value))
  })
}

export default async function ProjectSlugLayout({
  children,
  params
}: Props) {
  const { slug } = await params
  const project = await fetchPublicProjectBySlug(slug)

  return (
    <>
      {project && <JsonLd data={projectJsonLd(project)} />}
      {children}
    </>
  )
}
