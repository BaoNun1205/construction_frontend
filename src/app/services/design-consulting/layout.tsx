import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { buildMetadata, serviceJsonLd } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Tư Vấn Thiết Kế Kiến Trúc Và Kết Cấu',
  description:
    'Dịch vụ tư vấn thiết kế kiến trúc, công năng, concept 3D và hồ sơ kỹ thuật cho công trình dân dụng và công nghiệp.',
  path: '/services/design-consulting',
  image: '/design-consulting/target.jpg',
  keywords: [
    'tư vấn thiết kế kiến trúc',
    'thiết kế nhà phố',
    'thiết kế biệt thự',
    'thiết kế công trình',
    'concept 3D xây dựng'
  ]
})

export default function DesignConsultingLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: 'Tư vấn thiết kế kiến trúc và kết cấu',
          description:
            'Thiết kế kiến trúc, concept 3D, bố trí công năng và hồ sơ kỹ thuật cho công trình xây dựng.',
          path: '/services/design-consulting'
        })}
      />
      {children}
    </>
  )
}
