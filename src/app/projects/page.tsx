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

export default function CompletePage() {
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
        if (prev >= 75) {
          clearInterval(progressTimer);
          return 75;
        }
        return prev + 1;
      });
    }, 50);

    return () => {
      clearTimeout(showTimer);
      clearInterval(progressTimer);
    };
  }, []);

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
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
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
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
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
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
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
                background: 'linear-gradient(45deg, #A8E6CF, #FFD93D)',
                opacity: 0.1,
              }}
            />

            {/* Main Icon */}
            <Box sx={{ mb: 3 }}>
              <Construction
                sx={{
                  fontSize: 80,
                  color: '#667eea',
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
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Đang Phát Triển
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 4, lineHeight: 1.6 }}
            >
              Chúng tôi đang nỗ lực xây dựng trang này để mang đến trải nghiệm tuyệt vời nhất cho bạn
            </Typography>

            {/* Progress Bar */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Tiến độ phát triển
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {progress}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  },
                }}
              />
            </Box>

            {/* Features Coming Soon */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#667eea' }}>
                Tính năng sắp ra mắt
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
                  label="Showcase dự án"
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  icon={<AutoAwesome />}
                  label="Gallery ảnh"
                  color="secondary"
                  variant="outlined"
                />
                <Chip
                  icon={<Schedule />}
                  label="Timeline chi tiết"
                  color="success"
                  variant="outlined"
                />
                <Chip
                  icon={<Build />}
                  label="Thông tin kỹ thuật"
                  color="warning"
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
                href="/project"
                startIcon={<ArrowBack />}
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 3,
                  textTransform: 'none',
                  px: 3,
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
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #5a6fd8, #6a4190)',
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
              Cảm ơn bạn đã kiên nhẫn chờ đợi. Chúng tôi sẽ sớm hoàn thiện!
            </Typography>
          </Paper>
        </Fade>
      </Container>

      {/* CSS Animations */}
      <style jsx>{`
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
      `}</style>
    </Box>
  );
}
