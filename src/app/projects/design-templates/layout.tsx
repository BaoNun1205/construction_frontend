import type { Metadata } from 'next'
import { buildNoIndexMetadata } from '@/lib/seo'

export const metadata: Metadata = buildNoIndexMetadata({
  title: 'Mẫu Thiết Kế Công Trình',
  description: 'Trang nội dung đang được cập nhật.',
  path: '/projects/design-templates'
})

export default function ProjectsDesignTemplatesLayout({
  children
}: {
  children: React.ReactNode
}) {
  return children
}
