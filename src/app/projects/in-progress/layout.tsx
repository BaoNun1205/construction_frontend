import type { Metadata } from 'next'
import { buildNoIndexMetadata } from '@/lib/seo'

export const metadata: Metadata = buildNoIndexMetadata({
  title: 'Dự Án Đang Thi Công',
  description: 'Trang nội dung đang được cập nhật.',
  path: '/projects/in-progress'
})

export default function ProjectsInProgressLayout({
  children
}: {
  children: React.ReactNode
}) {
  return children
}
