import type { Metadata } from 'next'
import { buildNoIndexMetadata } from '@/lib/seo'

export const metadata: Metadata = buildNoIndexMetadata({
  title: 'Dự Án Đã Hoàn Thành',
  description: 'Trang nội dung đang được cập nhật.',
  path: '/projects/completed'
})

export default function ProjectsCompletedLayout({
  children
}: {
  children: React.ReactNode
}) {
  return children
}
