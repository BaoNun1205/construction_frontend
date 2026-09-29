'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home as HomeIcon } from '@mui/icons-material'
import { useLocale } from '@/contexts/LocaleContext'
import { useBreadcrumb, BreadcrumbItem } from '@/contexts/BreadcrumbContext'

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
  hideIfRoot?: boolean
  variant?: 'light' | 'glass' | 'auto'
}

// Bảng ánh xạ nhãn điều hướng đa ngôn ngữ
const ROUTE_LABELS: Record<'vi' | 'en', Record<string, string>> = {
  vi: {
    home: 'Trang chủ',
    about: 'Giới thiệu',
    contact: 'Liên hệ',
    store: 'Cửa hàng',
    services: 'Dịch vụ',
    construction: 'Thi công xây dựng',
    'design-consulting': 'Tư vấn thiết kế',
    supervision: 'Tư vấn giám sát',
    'project-management': 'Quản lý dự án',
    'bidding-consulting': 'Tư vấn đấu thầu',
    projects: 'Dự án thi công',
    completed: 'Dự án hoàn thành',
    'in-progress': 'Đang triển khai',
    'design-templates': 'Mẫu thiết kế',
    auth: 'Đăng nhập',
    login: 'Đăng nhập'
  },
  en: {
    home: 'Home',
    about: 'About Us',
    contact: 'Contact',
    store: 'Store',
    services: 'Services',
    construction: 'Construction',
    'design-consulting': 'Design Consulting',
    supervision: 'Supervision',
    'project-management': 'Project Management',
    'bidding-consulting': 'Bidding Consulting',
    projects: 'Construction Projects',
    completed: 'Completed Projects',
    'in-progress': 'In Progress',
    'design-templates': 'Design Templates',
    auth: 'Login',
    login: 'Login'
  }
}

function humanize(text: string): string {
  try {
    const decoded = decodeURIComponent(text)
    return decoded
      .split(/[-_]/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  } catch {
    return text
  }
}

export default function Breadcrumbs({
  items: propItems,
  className = '',
  hideIfRoot = true,
  variant = 'auto'
}: BreadcrumbsProps) {
  const pathname = usePathname()
  const { locale } = useLocale()
  const { customTitle, customItems } = useBreadcrumb()

  const labels = ROUTE_LABELS[locale as 'vi' | 'en'] || ROUTE_LABELS.vi

  // Tự động nhận diện giao diện: trang có hero banner nền tối dùng variant glass, trang nền sáng dùng light
  const isDarkHeroPage = ['/about', '/services/design-consulting', '/services/project-management'].includes(pathname || '')
  const currentVariant = variant === 'auto' ? (isDarkHeroPage ? 'glass' : 'light') : variant

  const effectiveItems = useMemo<BreadcrumbItem[]>(() => {
    if (propItems && propItems.length > 0) {
      return propItems
    }

    if (customItems && customItems.length > 0) {
      return customItems
    }

    if (!pathname || pathname === '/') {
      return hideIfRoot ? [] : [{ label: labels.home }]
    }

    const segments = pathname.split('/').filter(Boolean)
    if (segments.length === 0) {
      return hideIfRoot ? [] : [{ label: labels.home }]
    }

    const items: BreadcrumbItem[] = [
      {
        label: labels.home,
        href: '/'
      }
    ]

    // Bỏ qua cấp cha trung gian khi dẫn đến các mục con trong phần Dịch vụ, Dự án (theo yêu cầu UX)
    // Ví dụ: Trang chủ / Tư vấn thiết kế (thay vì Trang chủ / Dịch vụ / Tư vấn thiết kế)
    //        Trang chủ / Mẫu thiết kế (thay vì Trang chủ / Dự án / Mẫu thiết kế)
    //        Trang chủ / Mẫu thiết kế / [Tên mẫu]
    //        Trang chủ / [Tên dự án]
    const SKIP_INTERMEDIATE_ROOTS = ['services', 'projects']
    const shouldSkipFirstSegment = segments.length > 1 && SKIP_INTERMEDIATE_ROOTS.includes(segments[0])

    let currentHref = ''
    segments.forEach((segment, index) => {
      currentHref += `/${segment}`

      // Nếu đang xem mục con của Dịch vụ hoặc Dự án thì bỏ qua cấp cha trung gian
      if (index === 0 && shouldSkipFirstSegment) {
        return
      }

      const isLast = index === segments.length - 1

      let label: string
      if (isLast && customTitle) {
        label = customTitle
      } else if (labels[segment]) {
        label = labels[segment]
      } else {
        label = humanize(segment)
      }

      items.push({
        label,
        href: isLast ? undefined : currentHref
      })
    })

    return items
  }, [propItems, customItems, pathname, hideIfRoot, labels, customTitle])

  if (!effectiveItems || effectiveItems.length === 0) {
    return null
  }

  // Schema.org BreadcrumbList cho Google SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: effectiveItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href
        ? {
            item: `https://laiphat.vn${item.href}`
          }
        : {})
    }))
  }

  // Cấu hình style theo tông màu chuẩn của website Lai Phát
  const isGlass = currentVariant === 'glass'

  const homeIconColor = isGlass ? 'text-cyan-300' : 'text-cyan-600'
  const linkTextColor = isGlass
    ? 'text-cyan-200 hover:text-white'
    : 'text-slate-500 hover:text-cyan-600'
  const separatorColor = isGlass ? 'text-white/40' : 'text-slate-400'
  const activeTextColor = isGlass ? 'text-white font-semibold' : 'text-slate-800 font-semibold'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={`w-full flex items-center ${className}`}>
        <nav aria-label="Breadcrumb" className="w-full">
          <ol className="flex items-center flex-nowrap overflow-x-auto whitespace-nowrap scrollbar-none text-xs sm:text-sm">
            {effectiveItems.map((item, index) => {
              const isFirst = index === 0
              const isLast = index === effectiveItems.length - 1

              return (
                <li
                  key={`${item.label}-${index}`}
                  className="inline-flex items-center shrink-0"
                  {...(isLast ? { 'aria-current': 'page' } : {})}
                >
                  {/* Ký tự gạch chéo phân cách */}
                  {!isFirst && (
                    <span
                      className={`mx-2 text-xs sm:text-sm font-light select-none ${separatorColor}`}
                      aria-hidden="true"
                    >
                      /
                    </span>
                  )}

                  {/* Mục đầu tiên: Icon Home + Link Trang chủ */}
                  {isFirst ? (
                    item.href ? (
                      <Link
                        href={item.href}
                        className={`inline-flex items-center gap-1.5 font-medium transition-colors duration-200 ${linkTextColor}`}
                        title={item.label}
                      >
                        <HomeIcon sx={{ fontSize: 17 }} className={homeIconColor} />
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <span className={`inline-flex items-center gap-1.5 font-medium ${linkTextColor}`}>
                        <HomeIcon sx={{ fontSize: 17 }} className={homeIconColor} />
                        <span>{item.label}</span>
                      </span>
                    )
                  ) : item.href ? (
                    /* Các mục cha có đường link */
                    <Link
                      href={item.href}
                      className={`font-medium transition-colors duration-200 hover:underline ${linkTextColor}`}
                      title={item.label}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    /* Mục trang hiện tại (active) */
                    <span
                      className={`font-semibold truncate max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-xl ${activeTextColor}`}
                      title={item.label}
                    >
                      {item.label}
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
      </div>
    </>
  )
}
