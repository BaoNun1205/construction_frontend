import type { Metadata } from 'next'
import { CONTACT } from '@/constants/contact'
import type { Project } from '@/types/project'

const ensureAbsoluteUrl = (value: string) =>
  value.startsWith('http://') || value.startsWith('https://')
    ? value
    : `https://${value}`

const resolveSiteUrl = () => {
  const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
  const nextAuthUrl = process.env.NEXTAUTH_URL
  const contactWebsite = CONTACT.WEBSITE

  const preferredUrl = [envSiteUrl, nextAuthUrl, contactWebsite]
    .filter((value): value is string => Boolean(value))
    .map(ensureAbsoluteUrl)
    .find((value) => !/localhost|127\.0\.0\.1/i.test(value))

  return preferredUrl || 'https://laiphat.com'
}

export const siteConfig = {
  name: 'Lai Phát',
  legalName: 'Công Ty Cổ Phần Tư Vấn Và Xây Dựng Lai Phát',
  shortName: 'Lai Phát',
  description:
    'Lai Phát cung cấp dịch vụ thi công xây dựng, tư vấn thiết kế, giám sát, quản lý dự án và đấu thầu cho công trình dân dụng, công nghiệp tại TP.HCM và các khu vực lân cận.',
  siteUrl: resolveSiteUrl(),
  locale: 'vi_VN',
  country: 'VN',
  address: {
    streetAddress: 'B7/12E8 Ấp 2A, xã Vĩnh Lộc A',
    addressLocality: 'Bình Chánh',
    addressRegion: 'Thành phố Hồ Chí Minh',
    postalCode: '700000',
    addressCountry: 'VN'
  },
  contact: {
    phone: CONTACT.PHONE,
    email: CONTACT.EMAIL,
    website: ensureAbsoluteUrl(CONTACT.WEBSITE)
  },
  socialProfiles: [CONTACT.FACEBOOK],
  defaultOgImage: '/banner/banner_home3.png'
} as const

export const defaultKeywords = [
  'công ty xây dựng Lai Phát',
  'xây dựng dân dụng',
  'thi công xây dựng',
  'tư vấn thiết kế xây dựng',
  'tư vấn giám sát thi công',
  'tư vấn quản lý dự án xây dựng',
  'tư vấn đấu thầu xây dựng',
  'thi công nhà phố',
  'thi công biệt thự',
  'xây dựng công nghiệp',
  'xây dựng TP.HCM',
  'xây dựng Bình Chánh'
]

export const absoluteUrl = (path = '/') =>
  new URL(path, siteConfig.siteUrl).toString()

export const createTitle = (title?: string) =>
  title ? `${title} | ${siteConfig.name}` : siteConfig.name

const dedupeKeywords = (keywords?: string[]) =>
  Array.from(new Set([...(keywords || []), ...defaultKeywords]))

export const buildMetadata = ({
  title,
  description,
  path = '/',
  keywords,
  image = siteConfig.defaultOgImage,
  type = 'website'
}: {
  title?: string
  description: string
  path?: string
  keywords?: string[]
  image?: string
  type?: 'website' | 'article'
}): Metadata => {
  const canonical = absoluteUrl(path)
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image)

  return {
    ...(title ? { title } : {}),
    description,
    keywords: dedupeKeywords(keywords),
    alternates: {
      canonical
    },
    openGraph: {
      title: createTitle(title),
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: createTitle(title)
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: createTitle(title),
      description,
      images: [imageUrl]
    }
  }
}

export const buildNoIndexMetadata = ({
  title,
  description,
  path = '/'
}: {
  title: string
  description: string
  path?: string
}): Metadata => ({
  ...buildMetadata({ title, description, path }),
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true
    }
  }
})

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  url: siteConfig.siteUrl,
  logo: absoluteUrl('/logo-laiphat.png'),
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  address: {
    '@type': 'PostalAddress',
    ...siteConfig.address
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      contactType: 'customer service',
      areaServed: 'VN',
      availableLanguage: ['vi', 'en']
    }
  ],
  sameAs: siteConfig.socialProfiles
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  inLanguage: 'vi'
}

export const serviceJsonLd = ({
  name,
  description,
  path
}: {
  name: string
  description: string
  path: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  areaServed: 'Việt Nam',
  provider: {
    '@type': 'Organization',
    name: siteConfig.legalName,
    url: siteConfig.siteUrl
  },
  serviceType: name,
  url: absoluteUrl(path)
})

export const projectJsonLd = (project: Project) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.title,
  description: project.description,
  image: [project.mainImage, ...(project.media || [])].filter(Boolean),
  url: absoluteUrl(`/projects/${project.slug}`),
  datePublished: project.createdAt || project.startDate,
  dateModified: project.updatedAt || project.createdAt || project.startDate,
  creator: {
    '@type': 'Organization',
    name: siteConfig.legalName,
    url: siteConfig.siteUrl
  },
  about: [
    project.category?.name,
    ...(project.workingScope || []),
    ...(project.details || [])
  ].filter(Boolean)
})

export const trimDescription = (value: string, maxLength = 160) => {
  const normalized = value.replace(/\s+/g, ' ').trim()

  if (normalized.length <= maxLength) {
    return normalized
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`
}

export const humanizeSlug = (slug: string) =>
  slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
