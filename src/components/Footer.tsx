'use client'

import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  IconButton,
  Divider,
  Stack,
  useTheme
} from '@mui/material'
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Phone,
  Email,
  LocationOn,
  ArrowForward
} from '@mui/icons-material'
import Link from 'next/link'
import { useTranslations } from '@/hooks/useTranslations'
import { CONTACT } from '@/constants/contact'
import PhoneButton from './ui/PhoneButton'
import BrandLogo from './ui/BrandLogo'

export default function Footer() {
  const theme = useTheme()
  const { t: tRaw } = useTranslations()
  const t = (key: string): string => tRaw(key) as string

  return (
    <Box
      sx={{
        background: theme.palette.primary.main,
        color: 'white',
        mt: 'auto'
      }}
    >
      <Container className="py-16" sx={{ px: 4 }}>
        <div className="text-center">
          <div
            className="relative overflow-hidden rounded-2xl p-12 text-white md:p-16"
            style={{
              background: theme.palette.primary.main,
              border: '2px solid white',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
            }}
          >
            <div className="absolute left-0 top-0 h-32 w-32 -translate-x-16 -translate-y-16 rounded-full bg-white/10" />
            <div className="absolute bottom-0 right-0 h-40 w-40 translate-x-20 translate-y-20 rounded-full bg-white/10" />
            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-12 -translate-y-12 animate-pulse rounded-full bg-white/5" />

            <div className="relative z-10">
              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                Bắt Đầu Dự Án Của Bạn Ngay Hôm Nay
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-white/90">
                Liên hệ với chúng tôi để được tư vấn miễn phí và nhận báo giá chi tiết cho dự án của bạn.
              </p>

              <div className="flex flex-col justify-center gap-6 sm:flex-row">
                <PhoneButton
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    px: 4,
                    py: 3,
                    border: '2px solid white',
                    fontSize: '1rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    '&:hover': {
                      transform: 'translateY(-3px) scale(1.05)',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                />

                <MuiLink
                  component={Link}
                  href="/contact#contact-form"
                  underline="none"
                  aria-label="Nhận báo giá"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    px: 4,
                    py: 3,
                    borderRadius: '0.5rem',
                    border: '2px solid white',
                    color: 'white',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    backgroundColor: 'transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px) scale(1.05)',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Nhận Báo Giá
                  <ArrowForward sx={{ fontSize: 20 }} />
                </MuiLink>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container className="pb-16" sx={{ px: 4 }}>
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Box sx={{ mb: 2 }}>
              <BrandLogo
                variant="full"
                scrolled={false}
              />
            </Box>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              {t('footer.description')}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                component="a"
                href={CONTACT.FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Lai Phát"
                sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              >
                <Instagram />
              </IconButton>
            </Stack>
          </div>

          <div>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {t('footer.quickLinks')}
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} href="/about" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                {t('footer.about')}
              </MuiLink>
              <MuiLink component={Link} href="/services" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                {t('footer.services')}
              </MuiLink>
              <MuiLink component={Link} href="/projects" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Dự Án
              </MuiLink>
              <MuiLink component={Link} href="/store" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                {t('footer.store')}
              </MuiLink>
              <MuiLink component={Link} href="/contact#contact-form" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                {t('footer.contact')}
              </MuiLink>
            </Stack>
          </div>

          <div>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Dịch Vụ
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} href="/services/construction" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Thi Công Xây Dựng
              </MuiLink>
              <MuiLink component={Link} href="/services/design-consulting" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Tư Vấn Thiết Kế
              </MuiLink>
              <MuiLink component={Link} href="/services/supervision" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Giám Sát Công Trình
              </MuiLink>
              <MuiLink component={Link} href="/services/project-management" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Quản Lý Dự Án
              </MuiLink>
              <MuiLink component={Link} href="/services/bidding-consulting" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Tư Vấn Đấu Thầu
              </MuiLink>
            </Stack>
          </div>

          <div>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {t('footer.contactTitle')}
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {t('footer.address')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {CONTACT.PHONE}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {CONTACT.EMAIL}
                </Typography>
              </Box>
            </Stack>
          </div>
        </div>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', my: 4 }} />

        <div className="flex flex-col items-center justify-between md:flex-row">
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {t('footer.copyright')}
          </Typography>
          <Stack direction="row" spacing={3} sx={{ mt: { xs: 2, md: 0 } }}>
            <MuiLink href="#" color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
              {t('footer.privacy')}
            </MuiLink>
            <MuiLink href="#" color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
              {t('footer.terms')}
            </MuiLink>
          </Stack>
        </div>
      </Container>
    </Box>
  )
}
