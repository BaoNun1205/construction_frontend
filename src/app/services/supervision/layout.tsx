import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { buildMetadata, serviceJsonLd } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Tư Vấn Giám Sát Thi Công Công Trình',
  description:
    'Dịch vụ tư vấn giám sát thi công giúp kiểm soát chất lượng, tiến độ và an toàn cho công trình xây dựng.',
  path: '/services/supervision',
  image: '/banner/banner_home2.jpg',
  keywords: [
    'tư vấn giám sát thi công',
    'giám sát công trình',
    'kiểm soát chất lượng xây dựng',
    'an toàn công trình'
  ]
})

export default function SupervisionLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: 'Tư vấn giám sát thi công công trình',
          description:
            'Giám sát chất lượng, tiến độ và an toàn thi công cho công trình dân dụng và công nghiệp.',
          path: '/services/supervision'
        })}
      />
      {children}
    </>
  )
}
