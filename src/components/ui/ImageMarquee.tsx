'use client'

import React from 'react'
import Image from 'next/image'
import { Box, Typography, Container } from '@mui/material'
import { BRAND_COLORS } from '@/constants/colors'

type Props = {
  title?: string;
  subtitle?: string;
  speed?: number;
};

interface ShowcaseItem {
  src: string;
  title: string;
}

const ITEMS: ShowcaseItem[] = [
  {
    src: '/image/action1.jpg',
    title: 'Thi công kết cấu & cốt thép móng',
  },
  {
    src: '/image/action2.jpg',
    title: 'Xây thô & hoàn thiện sàn bê tông',
  },
  {
    src: '/image/action3.jpg',
    title: 'Hạ tầng kỹ thuật & hệ thống thoát nước ngầm',
  },
  {
    src: '/image/action4.jpg',
    title: 'Công trình nhà xưởng & quy hoạch tổng thể',
  },
];

export default function ImageMarquee({
  title = 'Phát Triển Bền Vững',
  subtitle = 'Hình ảnh thi công thực tế và kiểm soát chất lượng công trình',
  speed = 36,
}: Props) {
  // Double sets for seamless infinite loop
  const set1 = [...ITEMS, ...ITEMS];
  const set2 = [...ITEMS, ...ITEMS];

  return (
    <Box
      component="section"
      id="sustainable-development"
      sx={{
        overflow: 'hidden',
        width: '100%',
        py: { xs: 5, md: 7 },
        backgroundColor: BRAND_COLORS.neutral.background,
        borderTop: `1px solid ${BRAND_COLORS.neutral.borderSubtle}`,
        borderBottom: `1px solid ${BRAND_COLORS.neutral.borderSubtle}`,
      }}
    >
      {/* Clean Header - No emoji badges */}
      <Container maxWidth="lg" sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.75rem', md: '2.25rem' },
            fontWeight: 700,
            color: BRAND_COLORS.primary.main,
            letterSpacing: '-0.3px',
            lineHeight: 1.25,
            mb: 1,
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="body1"
            sx={{
              color: BRAND_COLORS.neutral.textSecondary,
              fontSize: { xs: '0.9rem', md: '1rem' },
              lineHeight: 1.5,
              maxWidth: { xs: '100%', sm: 650, md: 850 },
              mx: 'auto',
              textWrap: 'balance',
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Container>

      {/* Marquee Wrapper with Smooth Left & Right Edge Fades */}
      <Box
        className="marquee-wrapper"
        sx={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          py: 0.5,
          '&:hover .marquee-track': {
            animationPlayState: 'paused',
          },
        }}
      >
        {/* Left Fade Mask */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: { xs: 40, sm: 80, md: 120 },
            background: `linear-gradient(to right, ${BRAND_COLORS.neutral.background} 0%, rgba(248, 250, 252, 0) 100%)`,
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* Right Fade Mask */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: { xs: 40, sm: 80, md: 120 },
            background: `linear-gradient(to left, ${BRAND_COLORS.neutral.background} 0%, rgba(248, 250, 252, 0) 100%)`,
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* Moving Track */}
        <Box
          className="marquee-track"
          sx={{
            display: 'flex',
            width: 'max-content',
            gap: { xs: '12px', md: '16px' },
            animation: `marqueeLoop ${speed}s linear infinite`,
            willChange: 'transform',
          }}
        >
          {[...set1, ...set2].map((item, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: '260px', sm: '300px', md: '340px' },
                height: { xs: '160px', sm: '180px', md: '200px' },
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                flex: '0 0 auto',
                border: `1px solid rgba(0, 17, 55, 0.08)`,
                boxShadow: '0 2px 10px rgba(0, 17, 55, 0.04)',
                backgroundColor: BRAND_COLORS.primary.dark,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 20px rgba(0, 17, 55, 0.12)',
                  borderColor: BRAND_COLORS.secondary.main,
                  '& .card-img': {
                    transform: 'scale(1.05)',
                  },
                },
              }}
            >
              {/* Image */}
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 300px, 340px"
                className="card-img"
                style={{
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                }}
                priority={index < 4}
              />

              {/* Bottom gradient caption */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: { xs: 1.25, md: 1.5 },
                  background: 'linear-gradient(to top, rgba(0, 17, 55, 0.85) 0%, rgba(0, 17, 55, 0.3) 60%, transparent 100%)',
                  zIndex: 2,
                }}
              >
                <Typography
                  sx={{
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: { xs: '0.78rem', md: '0.84rem' },
                    lineHeight: 1.3,
                    textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Seamless Animation Keyframes */}
      <style jsx>{`
        @keyframes marqueeLoop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
          }
        }
      `}</style>
    </Box>
  )
}
