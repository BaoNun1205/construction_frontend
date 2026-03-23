import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Cửa Hàng Vật Liệu Xây Dựng Và Thiết Bị',
  description:
    'Khám phá danh mục vật liệu xây dựng, thiết bị và dịch vụ hỗ trợ cho công trình từ Lai Phát.',
  path: '/store',
  image: '/banner/banner_home5.jpg',
  keywords: [
    'vật liệu xây dựng',
    'thiết bị xây dựng',
    'cửa hàng xây dựng',
    'mua vật tư công trình'
  ]
})

export default function StoreLayout({
  children
}: {
  children: React.ReactNode
}) {
  return children
}
