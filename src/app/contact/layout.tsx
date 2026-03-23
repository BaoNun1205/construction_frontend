import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Liên Hệ Công Ty Xây Dựng Lai Phát',
  description:
    'Liên hệ Lai Phát để được tư vấn thi công xây dựng, thiết kế, giám sát, quản lý dự án và báo giá công trình tại TP.HCM.',
  path: '/contact',
  image: '/banner/banner_home3.png',
  keywords: [
    'liên hệ công ty xây dựng',
    'báo giá xây dựng',
    'tư vấn xây dựng TP.HCM',
    'liên hệ Lai Phát'
  ]
})

export default function ContactLayout({
  children
}: {
  children: React.ReactNode
}) {
  return children
}
