import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Mẫu Thiết Kế Nhà Đẹp & Công Trình Tiêu Biểu',
  description:
    'Khám phá bộ sưu tập mẫu thiết kế biệt thự, nhà phố, nhà vườn, căn hộ cao cấp và shophouse đẹp, hiện đại, tối ưu công năng từ Lai Phát.',
  path: '/projects/design-templates',
  keywords: [
    'mẫu thiết kế nhà đẹp',
    'thiết kế biệt thự',
    'thiết kế nhà phố',
    'mẫu nhà vườn đẹp',
    'thiết kế kiến trúc Lai Phát',
    'mẫu thiết kế công trình'
  ]
})

export default function ProjectsDesignTemplatesLayout({
  children
}: {
  children: React.ReactNode
}) {
  return children
}
