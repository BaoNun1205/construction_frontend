import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Giới Thiệu Công Ty Xây Dựng Lai Phát',
  description:
    'Tìm hiểu về Lai Phát, hồ sơ năng lực, tầm nhìn, đội ngũ và chứng chỉ năng lực hoạt động xây dựng của doanh nghiệp tại TP.HCM.',
  path: '/about',
  image: '/banner/banner_home4.jpg',
  keywords: [
    'giới thiệu công ty xây dựng',
    'hồ sơ năng lực xây dựng',
    'chứng chỉ năng lực xây dựng',
    'công ty xây dựng TP.HCM'
  ]
})

export default function AboutLayout({
  children
}: {
  children: React.ReactNode
}) {
  return children
}
