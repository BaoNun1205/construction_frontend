import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { buildMetadata, serviceJsonLd } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Tư Vấn Quản Lý Dự Án Xây Dựng',
  description:
    'Dịch vụ quản lý dự án xây dựng giúp kiểm soát phạm vi, tiến độ, chi phí, chất lượng và rủi ro trong suốt vòng đời công trình.',
  path: '/services/project-management',
  image: '/project-management/banner.webp',
  keywords: [
    'quản lý dự án xây dựng',
    'tư vấn quản lý dự án',
    'kiểm soát tiến độ công trình',
    'kiểm soát chi phí xây dựng'
  ]
})

export default function ProjectManagementLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: 'Tư vấn quản lý dự án xây dựng',
          description:
            'Quản lý phạm vi, tiến độ, chi phí, chất lượng và rủi ro cho dự án xây dựng từ Lai Phát.',
          path: '/services/project-management'
        })}
      />
      {children}
    </>
  )
}
