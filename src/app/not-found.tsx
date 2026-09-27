/* eslint-disable react/no-unknown-property */
'use client'

import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  Fade
} from '@mui/material'
import {
  Home,
  ArrowBack,
  Search,
  Construction,
  Warning
} from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BRAND_COLORS } from '@/constants/colors'

export default function NotFound() {
  const router = useRouter()
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${BRAND_COLORS.primary.dark} 0%, ${BRAND_COLORS.primary.main} 60%, ${BRAND_COLORS.primary.light} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: '80px'
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, ${BRAND_COLORS.secondary.main}20 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${BRAND_COLORS.secondary.dark}15 0%, transparent 50%)
          `,
          animation: 'float 6s ease-in-out infinite'
        }}
      />

      {/* Floating Construction Icons */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          color: `${BRAND_COLORS.secondary.main}40`,
          animation: 'float 4s ease-in-out infinite',
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Construction sx={{ fontSize: 60 }} />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          right: '15%',
          color: `${BRAND_COLORS.secondary.main}30`,
          animation: 'float 5s ease-in-out infinite 1s',
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Warning sx={{ fontSize: 50 }} />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '15%',
          color: `${BRAND_COLORS.secondary.main}30`,
          animation: 'float 4.5s ease-in-out infinite 2s',
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Search sx={{ fontSize: 45 }} />
      </Box>

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in={showContent} timeout={1000}>
          <Paper
            elevation={24}
            sx={{
              p: { xs: 4, md: 8 },
              textAlign: 'center',
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative Corner Accents */}
            <Box
              sx={{
                position: 'absolute',
                top: -40,
                right: -40,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: BRAND_COLORS.secondary.main,
                opacity: 0.1
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -40,
                left: -40,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: BRAND_COLORS.secondary.light,
                opacity: 0.5
              }}
            />

            {/* 404 Number */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '5.5rem', md: '8rem' },
                  fontWeight: 900,
                  color: BRAND_COLORS.primary.main,
                  lineHeight: 1,
                  letterSpacing: '-2px',
                  animation: 'pulse 2s infinite'
                }}
              >
                404
              </Typography>
            </Box>

            {/* Main Message */}
            <Typography
              variant="h3"
              sx={{
                mb: 2,
                fontWeight: 'bold',
                color: BRAND_COLORS.neutral.textPrimary,
                fontSize: { xs: '1.6rem', md: '2.2rem' }
              }}
            >
              Không tìm thấy trang
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 4,
                lineHeight: 1.6,
                maxWidth: '600px',
                mx: 'auto',
                fontSize: { xs: '0.95rem', md: '1.05rem' }
              }}
            >
              Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
              <br />
              Hãy kiểm tra lại đường dẫn hoặc quay về trang chủ.
            </Typography>

            {/* Suggestions */}
            <Box sx={{ mb: 5 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, color: BRAND_COLORS.primary.main, fontWeight: 600 }}>
                Gợi ý cho bạn:
              </Typography>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                maxWidth: '400px',
                mx: 'auto',
                textAlign: 'left'
              }}>
                <Typography variant="body2" color="text.secondary">
                  • Kiểm tra lại chính tả trong đường dẫn URL
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Quay về trang chủ và tìm kiếm nội dung
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Xem các dịch vụ và dự án của chúng tôi
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Liên hệ với chúng tôi nếu cần hỗ trợ
                </Typography>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              sx={{ mb: 3 }}
            >
              <Button
                component={Link}
                href="/"
                startIcon={<Home />}
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 3,
                  textTransform: 'none',
                  px: 4,
                  py: 1.5,
                  backgroundColor: BRAND_COLORS.primary.main,
                  color: BRAND_COLORS.primary.contrastText,
                  '&:hover': {
                    backgroundColor: BRAND_COLORS.primary.light,
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Về trang chủ
              </Button>
              <Button
                onClick={() => router.back()}
                startIcon={<ArrowBack />}
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 3,
                  textTransform: 'none',
                  px: 4,
                  py: 1.5,
                  borderColor: BRAND_COLORS.primary.main,
                  color: BRAND_COLORS.primary.main,
                  '&:hover': {
                    backgroundColor: BRAND_COLORS.primary.surface,
                    borderColor: BRAND_COLORS.primary.light,
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Quay lại
              </Button>
            </Stack>

            {/* Quick Links */}
            <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${BRAND_COLORS.neutral.border}` }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Hoặc truy cập nhanh:
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
                flexWrap="wrap"
                useFlexGap
              >
                <Button
                  component={Link}
                  href="/about"
                  variant="text"
                  size="small"
                  sx={{ textTransform: 'none', color: BRAND_COLORS.primary.main, '&:hover': { color: BRAND_COLORS.secondary.dark } }}
                >
                  Giới thiệu
                </Button>
                <Button
                  component={Link}
                  href="/services"
                  variant="text"
                  size="small"
                  sx={{ textTransform: 'none', color: BRAND_COLORS.primary.main, '&:hover': { color: BRAND_COLORS.secondary.dark } }}
                >
                  Dịch vụ
                </Button>
                <Button
                  component={Link}
                  href="/projects"
                  variant="text"
                  size="small"
                  sx={{ textTransform: 'none', color: BRAND_COLORS.primary.main, '&:hover': { color: BRAND_COLORS.secondary.dark } }}
                >
                  Dự án
                </Button>
                <Button
                  component={Link}
                  href="/contact"
                  variant="text"
                  size="small"
                  sx={{ textTransform: 'none', color: BRAND_COLORS.primary.main, '&:hover': { color: BRAND_COLORS.secondary.dark } }}
                >
                  Liên hệ
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  )
}
