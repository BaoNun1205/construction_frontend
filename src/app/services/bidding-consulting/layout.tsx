import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { buildMetadata, serviceJsonLd } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Tư Vấn Đấu Thầu Xây Dựng',
  description:
    'Dịch vụ tư vấn đấu thầu xây dựng gồm chuẩn bị hồ sơ, đánh giá và lựa chọn nhà thầu phù hợp cho dự án.',
  path: '/services/bidding-consulting',
  image: '/banner/banner_home5.jpg',
  keywords: [
    'tư vấn đấu thầu xây dựng',
    'hồ sơ đấu thầu',
    'đánh giá nhà thầu',
    'lựa chọn nhà thầu xây dựng'
  ]
})

export default function BiddingConsultingLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: 'Tư vấn đấu thầu xây dựng',
          description:
            'Chuẩn bị hồ sơ, đánh giá và lựa chọn nhà thầu xây dựng phù hợp cho từng dự án.',
          path: '/services/bidding-consulting'
        })}
      />
      {children}
    </>
  )
}
