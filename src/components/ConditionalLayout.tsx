'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MainContent from '@/components/MainContent'
import { Box } from '@mui/material'

export default function ConditionalLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')
  const isAuthRoute = pathname?.startsWith('/auth')

  if (isAdminRoute || isAuthRoute) {
    return <>{children}</>
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <Header />
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </Box>
  )
}