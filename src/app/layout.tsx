import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import MUIThemeProvider from '@/components/MUIThemeProvider'
import ConditionalLayout from '@/components/ConditionalLayout'
import { LocaleProvider } from '@/contexts/LocaleContext'
import QueryProvider from '@/providers/QueryProvider'
import { AuthProvider } from '@/providers/AuthProvider'
import JsonLd from '@/components/seo/JsonLd'
import {
  buildMetadata,
  organizationJsonLd,
  siteConfig,
  websiteJsonLd
} from '@/lib/seo'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.name,
  title: {
    default: 'Công Ty Xây Dựng Lai Phát',
    template: `%s | ${siteConfig.name}`
  },
  ...buildMetadata({
    description: siteConfig.description,
    path: '/',
    keywords: [
      'công ty xây dựng',
      'thi công xây dựng trọn gói',
      'tư vấn thiết kế xây dựng',
      'tư vấn giám sát',
      'quản lý dự án',
      'đấu thầu xây dựng'
    ]
  }),
  category: 'construction',
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  icons: {
    icon: '/logo-laiphat.png',
    shortcut: '/logo-laiphat.png',
    apple: '/logo-laiphat.png'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/logo-laiphat.png" />
        <link rel="apple-touch-icon" href="/logo-laiphat.png" />
        <link rel="shortcut icon" href="/logo-laiphat.png" />
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <QueryProvider>
            <LocaleProvider>
              <MUIThemeProvider>
                <ConditionalLayout>
                  {children}
                </ConditionalLayout>
              </MUIThemeProvider>
            </LocaleProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
