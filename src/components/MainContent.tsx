'use client'

import { Box } from '@mui/material'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface MainContentProps {
  children: ReactNode
}

export default function MainContent({ children }: MainContentProps) {
  const pathname = usePathname()
  const homePagePaths = ['/', '/services/design-consulting', '/about']
  const isHomePage = homePagePaths.includes(pathname)

  return (
    <Box 
      component="main" 
      sx={{ 
        flexGrow: 1,
        position: 'relative',
        zIndex: 1,
        paddingTop: !isHomePage ? '80px' : 0
      }}
    >
      {children}
    </Box>
  )
}
