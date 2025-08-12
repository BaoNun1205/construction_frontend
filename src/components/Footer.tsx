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

export default function Footer() {
  const theme = useTheme()
  
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
              Lai Phát
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Đối tác tin cậy trong mọi dự án xây dựng của bạn. 
              Chất lượng - Uy tín - Chuyên nghiệp.
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
              Liên kết nhanh
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} href="/about" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Giới thiệu
              </MuiLink>
              <MuiLink component={Link} href="/services" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Dịch vụ
              </MuiLink>
              <MuiLink component={Link} href="/store" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Cửa hàng
              </MuiLink>
              <MuiLink component={Link} href="/contact" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Liên lạc
              </MuiLink>
            </Stack>
          </div>

          {/* Services */}
          <div>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Dịch vụ
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} href="/services/construction-technology" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Công nghệ xây dựng
              </MuiLink>
              <MuiLink component={Link} href="/services/consultation" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Tư vấn & Giám sát
              </MuiLink>
              <MuiLink component={Link} href="/services/quality-control" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Kiểm soát chất lượng
              </MuiLink>
              <MuiLink href="#" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Thiết kế kiến trúc
              </MuiLink>
            </Stack>
          </div>

          {/* Contact Info */}
          <div>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Liên hệ
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Xã Vĩnh Lộc, TP.HCM
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  0939 927 975
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  laiphatgroup@gmail.com
                </Typography>
              </Box>
            </Stack>
          </div>
        </div>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', my: 4 }} />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © 2025 LaiPhat Construction. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3} sx={{ mt: { xs: 2, md: 0 } }}>
            <MuiLink href="#" color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
              Chính sách bảo mật
            </MuiLink>
            <MuiLink href="#" color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
              Điều khoản sử dụng
            </MuiLink>
          </Stack>
        </div>
      </Container>
    </Box>
  );
}
