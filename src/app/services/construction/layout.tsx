import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { buildMetadata, serviceJsonLd } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Thi Công Xây Dựng Công Trình Dân Dụng Và Công Nghiệp',
  description:
    'Dịch vụ thi công xây dựng dân dụng, nhà phố, biệt thự, công trình công nghiệp và hạ tầng với quy trình chuyên nghiệp từ Lai Phát.',
  path: '/services/construction',
  image: '/banner/banner_home.jpg',
  keywords: [
    'thi công xây dựng',
    'xây dựng dân dụng',
    'xây dựng công nghiệp',
    'thi công nhà phố',
    'thi công biệt thự'
  ]
})

export default function ConstructionLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: 'Thi công xây dựng công trình dân dụng và công nghiệp',
          description:
            'Dịch vụ thi công nhà phố, biệt thự, công trình dân dụng, công nghiệp và hạ tầng từ Lai Phát.',
          path: '/services/construction'
        })}
      />
      {children}
    </>
  )
}
