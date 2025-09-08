'use client'
import React from 'react'
import { Button, useMediaQuery, useTheme, type SxProps, type Theme } from '@mui/material'
import { Phone } from '@mui/icons-material'
import { CONTACT } from '@/constants/contact'

export default function PhoneButton({ sx }: { sx?: SxProps<Theme> }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.PHONE)
      alert('Số điện thoại đã được sao chép vào clipboard. Vui lòng sử dụng điện thoại để gọi.')
    } catch {
      alert(`Số điện thoại: ${CONTACT.PHONE}`)
    }
  }

  if (isMobile) {
    return (
      <Button
        component="a"
        href={`tel:${CONTACT.PHONE.replace(/\s/g, '')}`}
        variant="outlined"
        size="large"
        startIcon={<Phone />}
        sx={{
          borderColor: 'white',
          color: 'white',
          fontWeight: 600,
          px: 4,
          py: 1.5,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'white'
          },
          ...sx
        }}
        aria-label="Gọi tư vấn"
      >
        {CONTACT.PHONE}
      </Button>
    )
  }

  return (
    <Button
      variant="outlined"
      size="large"
      startIcon={<Phone />}
      onClick={handleCopy}
      sx={{
        borderColor: 'white',
        color: 'white',
        fontWeight: 600,
        px: 4,
        py: 1.5,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'white'
        },
        ...sx
      }}
      aria-label="Sao chép số điện thoại"
    >
      {CONTACT.PHONE}
    </Button>
  )
}