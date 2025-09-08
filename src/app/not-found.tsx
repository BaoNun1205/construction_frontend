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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: '80px' // Account for fixed header
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
            radial-gradient(circle at 20% 50%, rgba(255, 107, 107, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(78, 205, 196, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255, 193, 7, 0.2) 0%, transparent 50%)
          `,
          animation: 'float 8s ease-in-out infinite'
        }}
      />

      {/* Floating Icons */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          animation: 'bounce 3s infinite'
        }}
      >
        <Construction sx={{ fontSize: 40, color: 'rgba(255,255,255,0.1)' }} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          animation: 'bounce 3s infinite 1s'
        }}
      >
        <Warning sx={{ fontSize: 35, color: 'rgba(255,255,255,0.1)' }} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '20%',
          animation: 'bounce 3s infinite 2s'
        }}
      >
        <Search sx={{ fontSize: 45, color: 'rgba(255,255,255,0.1)' }} />
      </Box>

      <Container maxWidth="md">
        <Fade in={showContent} timeout={1000}>
          <Paper
            elevation={24}
            sx={{
              p: { xs: 4, md: 8 },
              textAlign: 'center',
              borderRadius: 6,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative Elements */}
            <Box
              sx={{
                position: 'absolute',
                top: -80,
                right: -80,
                width: 160,
                height: 160,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                opacity: 0.1
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -60,
                left: -60,
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #A8E6CF, #FFD93D)',
                opacity: 0.1
              }}
            />

            {/* 404 Number */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '6rem', md: '10rem' },
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                  textShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
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
                color: '#333',
                fontSize: { xs: '1.8rem', md: '2.5rem' }
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
                mx: 'auto'
              }}
            >
              Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
              <br />
              Hãy kiểm tra lại đường dẫn hoặc quay về trang chủ.
            </Typography>

            {/* Suggestions */}
            <Box sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#667eea' }}>
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
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #5a6fd8, #6a4190)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 25px rgba(102, 126, 234, 0.5)'
                  },
                  transition: 'all 0.3s ease'
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
                  borderColor: '#667eea',
                  color: '#667eea',
                  '&:hover': {
                    backgroundColor: 'rgba(102, 126, 234, 0.05)',
                    borderColor: '#5a6fd8',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Quay lại
              </Button>
            </Stack>

            {/* Quick Links */}
            <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid rgba(102, 126, 234, 0.1)' }}>
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
                  sx={{ textTransform: 'none', color: '#667eea' }}
                >
                  Giới thiệu
                </Button>
                <Button
                  component={Link}
                  href="/services"
                  variant="text"
                  size="small"
                  sx={{ textTransform: 'none', color: '#667eea' }}
                >
                  Dịch vụ
                </Button>
                <Button
                  component={Link}
                  href="/project"
                  variant="text"
                  size="small"
                  sx={{ textTransform: 'none', color: '#667eea' }}
                >
                  Dự án
                </Button>
                <Button
                  component={Link}
                  href="/contact"
                  variant="text"
                  size="small"
                  sx={{ textTransform: 'none', color: '#667eea' }}
                >
                  Liên hệ
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Fade>
      </Container>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  )
}
