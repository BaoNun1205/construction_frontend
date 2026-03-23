import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Dịch Vụ Xây Dựng Trọn Gói',
  description:
    'Lai Phát cung cấp dịch vụ xây dựng trọn gói gồm thi công công trình, tư vấn thiết kế, giám sát, quản lý dự án và đấu thầu.',
  path: '/services',
  image: '/banner/banner_home3.png',
  keywords: [
    'dịch vụ xây dựng',
    'thi công trọn gói',
    'thiết kế xây dựng',
    'giám sát thi công',
    'quản lý dự án xây dựng'
  ]
})

export default function ServicesLayout({
  children
}: {
  children: React.ReactNode
}) {
  return children
}
