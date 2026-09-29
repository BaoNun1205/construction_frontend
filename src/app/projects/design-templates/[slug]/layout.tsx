import type { Metadata } from 'next'
import { fetchPublicDesignTemplateBySlug } from '@/lib/public-api'
import {
  buildMetadata,
  humanizeSlug,
  trimDescription
} from '@/lib/seo'

interface Props {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const template = await fetchPublicDesignTemplateBySlug(slug)

  if (!template) {
    return buildMetadata({
      title: `Mẫu Thiết Kế ${humanizeSlug(slug)}`,
      description:
        'Chi tiết mẫu thiết kế kiến trúc, công năng mặt bằng và dự toán thi công từ Lai Phát.',
      path: `/projects/design-templates/${slug}`,
      keywords: ['mẫu thiết kế kiến trúc', 'mẫu nhà đẹp', humanizeSlug(slug)]
    })
  }

  const title = (template.title as string) || `Mẫu thiết kế ${humanizeSlug(slug)}`
  const description = trimDescription((template.description as string) || '')
  const mainImage = (template.mainImage as string) || undefined
  const styleName = (template.styleName as string) || undefined
  const categoryName = ((template.category as Record<string, unknown>)?.name as string) || undefined

  return buildMetadata({
    title,
    description,
    path: `/projects/design-templates/${slug}`,
    image: mainImage,
    type: 'article',
    keywords: [
      categoryName,
      styleName,
      'mẫu thiết kế kiến trúc',
      'bản vẽ thiết kế nhà đẹp',
      'thiết kế thi công Lai Phát'
    ].filter((value): value is string => Boolean(value))
  })
}

export default function DesignTemplateSlugLayout({ children }: Props) {
  return children
}
