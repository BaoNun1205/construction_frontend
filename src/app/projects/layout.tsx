import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Dự Án Xây Dựng Tiêu Biểu',
  description:
    'Khám phá các dự án xây dựng tiêu biểu của Lai Phát trong lĩnh vực dân dụng, công nghiệp và hạ tầng.',
  path: '/projects',
  image: '/banner/banner_home3.png',
  keywords: [
    'dự án xây dựng',
    'công trình tiêu biểu',
    'dự án dân dụng',
    'dự án công nghiệp',
    'portfolio xây dựng'
  ]
})

export default function ProjectsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return children
}
