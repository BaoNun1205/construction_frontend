'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Box, SxProps, Typography } from '@mui/material'
import React from 'react'

type Props = {
  variant?: 'full' | 'compact'
  scrolled?: boolean
  company?: string
  title?: string
  size?: number
  href?: string
  sx?: SxProps
}

export default function BrandLogo({
  variant = 'full',
  scrolled = false,
  company = 'LAI PHÁT',
  title = 'Uy tín tạo niềm tin',
  size = 50,
  href = '/',
  sx
}: Props) {
  return (
    <Box
      component={Link}
      href={href}
      sx={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        transition: 'transform 0.3s ease',
        '&:hover': { transform: 'scale(1.05)' },
        ...sx
      }}
    >
      <Box
        sx={{
          position: 'relative',
          p: variant === 'full' ? 1 : 0.5,
          borderRadius: variant === 'full' ? 2 : 1.5,
          background: scrolled ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.28)',
          backdropFilter: 'blur(10px)',
          border: scrolled ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.3)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Image
          src="/logo-laiphat.png"
          alt={company ?? 'Logo'}
          width={size}
          height={size}
          style={{ objectFit: 'contain', filter: 'brightness(1.1)' }}
        />
      </Box>

      {variant === 'full' && (
        <Box sx={{ ml: 2 }}>
          {company && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#e42222ff',
                fontSize: '1.4rem',
                lineHeight: 1,
                letterSpacing: '0.5px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {company}
            </Typography>
          )}
          {title && (
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.75rem',
                fontWeight: 500,
                display: 'block',
                lineHeight: 1,
                mt: 0.5,
                fontStyle: 'italic',
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              {title}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
}