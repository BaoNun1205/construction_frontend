'use client';

import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  IconButton,
  Divider,
  Stack,
  useTheme
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Phone,
  Email,
  LocationOn
} from '@mui/icons-material';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';
import { CONTACT } from '@/constants/contact';

export default function Footer() {
  const theme = useTheme();
  const { t: tRaw } = useTranslations();
  // Type-safe wrapper for translation function
  const t = (key: string): string => tRaw(key) as string;
  
  return (
    <Box
      component="footer"
      sx={{
        background: theme.palette.primary.main,
        color: 'white',
        mt: 'auto',
        py: 6
      }}
    >
      <Container maxWidth="lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              {t('footer.company')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              {t('footer.description')}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
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

          {/* Quick Links */}
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
              <MuiLink component={Link} href="/store" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                {t('footer.store')}
              </MuiLink>
              <MuiLink component={Link} href="/contact" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                {t('footer.contact')}
              </MuiLink>
            </Stack>
          </div>

          {/* Services */}
          <div>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {t('footer.servicesTitle')}
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} href="/services/construction-technology" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                {t('footer.constructionTech')}
              </MuiLink>
              <MuiLink component={Link} href="/services/consultation" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                {t('footer.consultation')}
              </MuiLink>
              <MuiLink component={Link} href="/services/quality-control" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                {t('footer.qualityControl')}
              </MuiLink>
              <MuiLink href="#" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                {t('footer.architecture')}
              </MuiLink>
            </Stack>
          </div>

          {/* Contact Info */}
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
        
        <div className="flex flex-col md:flex-row justify-between items-center">
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
  );
}
