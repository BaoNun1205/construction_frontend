'use client'

import { Box, Container } from '@mui/material'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

interface MainContentProps {
  children: ReactNode
}

export default function MainContent({ children }: MainContentProps) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const heroBannerPages = ['/services/design-consulting', '/about', '/services/project-management']
  const hasHeroBanner = heroBannerPages.includes(pathname)
  const isSpecialPage = isHomePage || hasHeroBanner

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        position: 'relative',
        zIndex: 1,
        paddingTop: !isSpecialPage ? { xs: '72px', md: '84px' } : 0
      }}
    >
      {/* Tự động hiển thị thanh điều hướng Breadcrumb với khoảng cách trên (cách Header) và dưới (cách nội dung) bằng nhau tuyệt đối */}
      {!isSpecialPage && (
        <Box sx={{ width: '100%', pt: { xs: 2, md: 2.5 }, pb: { xs: 2, md: 2.5 } }}>
          <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
            <Breadcrumbs />
          </Container>
        </Box>
      )}
      {children}
    </Box>
  )
}
