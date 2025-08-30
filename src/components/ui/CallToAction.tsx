'use client';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CONTACT } from '@/constants/contact';
import useScrollAnimations from '@/hooks/useScrollAnimations';
import { Container, useMediaQuery } from '@mui/material';
import PhoneButton from './PhoneButton';

export default function CallToAction() {
  const theme = useTheme();
  useScrollAnimations();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handlePhoneClick = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.PHONE);
      alert('Số điện thoại đã được sao chép vào clipboard. Vui lòng sử dụng điện thoại để gọi.');
    } catch {
      alert(`Số điện thoại: ${CONTACT.PHONE}`);
    }
  };

  return (
    <Container className="pb-16">
      <div className="mx-auto text-center fade-in-on">
        <div
          className="relative rounded-2xl p-12 md:p-16 text-white overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.dark} 100%)`,
            boxShadow: `0 20px 60px ${theme.palette.primary.main}30`,
          }}
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 translate-y-20" />
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/5 rounded-full -translate-x-12 -translate-y-12 animate-pulse" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Bắt Đầu Dự Án Của Bạn Ngay Hôm Nay
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-10">
              Liên hệ với chúng tôi để được tư vấn miễn phí và nhận báo giá chi tiết cho dự án của bạn.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
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
                  },
                }}
              />

              <button
                type="button"
                className="text-lg px-8 py-6 rounded-lg border-2 border-white text-white transition-all duration-300 bg-transparent font-semibold flex items-center justify-center"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.05)';
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0) scale(1)';
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                }}
                aria-label="Nhận báo giá"
              >
                Nhận Báo Giá
                <ArrowForwardIcon className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}