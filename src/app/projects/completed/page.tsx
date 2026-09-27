'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  LinearProgress,
  Fade,
  Chip,
  Stack,
} from '@mui/material';
import {
  Construction,
  Rocket,
  Code,
  ArrowBack,
  Schedule,
  Build,
  AutoAwesome,
} from '@mui/icons-material';
import Link from 'next/link';
import { ProjectComingSoonPageSkeleton } from '@/components/projects/ProjectPageSkeletons';
import { BRAND_COLORS } from '@/constants/colors';

export default function CompletedPage() {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content with fade effect
    const showTimer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    // Animate progress bar
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) {
          clearInterval(progressTimer);
          return 85;
        }
        return prev + 1;
      });
    }, 50);

    return () => {
      clearTimeout(showTimer);
      clearInterval(progressTimer);
    };
  }, []);

  if (!showContent) {
    return <ProjectComingSoonPageSkeleton />;
  }

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
      }}
    >
      {/* Background Animation */}
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
          animation: 'float 6s ease-in-out infinite',
        }}
      />

      <Container maxWidth="md">
        <Fade in={showContent} timeout={1000}>
          <Paper
            elevation={24}
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative elements */}
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: BRAND_COLORS.secondary.main,
                opacity: 0.1,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: BRAND_COLORS.secondary.light,
                opacity: 0.5,
              }}
            />

            {/* Main Icon */}
            <Box sx={{ mb: 3 }}>
              <Construction
                sx={{
                  fontSize: 72,
                  color: BRAND_COLORS.secondary.main,
                  animation: 'bounce 2s infinite',
                }}
              />
            </Box>

            {/* Title */}
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                fontWeight: 'bold',
                color: BRAND_COLORS.primary.main,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Dự Án Đã Hoàn Thành
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 4, lineHeight: 1.6 }}
            >
              Trang tổng hợp các dự án hoàn thành đang được đồng bộ và cập nhật tư liệu nghiệm thu
            </Typography>

            {/* Progress Bar */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Tiến độ cập nhật
                </Typography>
                <Typography variant="body2" fontWeight={700} sx={{ color: BRAND_COLORS.primary.main }}>
                  {progress}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: BRAND_COLORS.secondary.light,
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    background: `linear-gradient(90deg, ${BRAND_COLORS.primary.main}, ${BRAND_COLORS.secondary.main})`,
                  },
                }}
              />
            </Box>

            {/* Features Coming Soon */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: BRAND_COLORS.primary.main, fontWeight: 600 }}>
                Nội dung sắp ra mắt
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1}
                justifyContent="center"
                flexWrap="wrap"
                useFlexGap
              >
                <Chip
                  icon={<Rocket />}
                  label="Hồ sơ bàn giao"
                  sx={{ borderColor: BRAND_COLORS.secondary.border, color: BRAND_COLORS.primary.main }}
                  variant="outlined"
                />
                <Chip
                  icon={<AutoAwesome />}
                  label="Bộ ảnh thực tế"
                  sx={{ borderColor: BRAND_COLORS.secondary.border, color: BRAND_COLORS.primary.main }}
                  variant="outlined"
                />
                <Chip
                  icon={<Schedule />}
                  label="Nhật ký thi công"
                  sx={{ borderColor: BRAND_COLORS.secondary.border, color: BRAND_COLORS.primary.main }}
                  variant="outlined"
                />
                <Chip
                  icon={<Build />}
                  label="Chứng nhận chất lượng"
                  sx={{ borderColor: BRAND_COLORS.secondary.border, color: BRAND_COLORS.primary.main }}
                  variant="outlined"
                />
              </Stack>
            </Box>

            {/* Call to Action */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                component={Link}
                href="/projects"
                startIcon={<ArrowBack />}
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 3,
                  textTransform: 'none',
                  px: 3,
                  borderColor: BRAND_COLORS.primary.main,
                  color: BRAND_COLORS.primary.main,
                  '&:hover': {
                    borderColor: BRAND_COLORS.primary.light,
                    backgroundColor: BRAND_COLORS.primary.surface,
                  }
                }}
              >
                Quay lại Dự án
              </Button>
              <Button
                component={Link}
                href="/contact"
                startIcon={<Code />}
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 3,
                  textTransform: 'none',
                  px: 3,
                  backgroundColor: BRAND_COLORS.primary.main,
                  color: BRAND_COLORS.primary.contrastText,
                  '&:hover': {
                    backgroundColor: BRAND_COLORS.primary.light,
                  },
                }}
              >
                Liên hệ với chúng tôi
              </Button>
            </Stack>

            {/* Additional Info */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 4, fontStyle: 'italic' }}
            >
              Cảm ơn bạn đã quan tâm. Hệ thống sẽ sớm cập nhật đầy đủ dữ liệu!
            </Typography>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}
