'use client';

import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import {
  HomeWork,
  Business,
  Factory,
  Engineering,
} from '@mui/icons-material';

// Intersection Observer Hook
const useScrollAnimations = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      '.fade-in-on-scroll, .slide-in-left-on-scroll, .slide-in-right-on-scroll, .zoom-in-on-scroll'
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

export default function ConstructionPage() {
  useScrollAnimations();
  const theme = useTheme();

  const constructionServices = [
    {
      icon: <HomeWork sx={{ fontSize: 60 }} />,
      title: "Nhà dân dụng",
      description: "Thi công các loại nhà ở từ nhà cấp 4 đến biệt thự cao cấp, chung cư, nhà phố thương mại",
      features: [
        "Nhà ở riêng lẻ các loại",
        "Chung cư, căn hộ cao cấp", 
        "Biệt thự, villa nghỉ dưỡng",
        "Nhà phố thương mại (shophouse)"
      ],
      projects: "200+ dự án hoàn thành",
    },
    {
      icon: <Business sx={{ fontSize: 60 }} />,
      title: "Công trình thương mại",
      description: "Xây dựng các công trình phục vụ kinh doanh, thương mại và dịch vụ",
      features: [
        "Trung tâm thương mại, siêu thị",
        "Văn phòng, tòa nhà làm việc",
        "Khách sạn, resort, nhà hàng",
        "Showroom, cửa hàng kinh doanh"
      ],
      projects: "150+ dự án hoàn thành",
    },
    {
      icon: <Factory sx={{ fontSize: 60 }} />,
      title: "Công trình công nghiệp",
      description: "Thi công các nhà máy, xưởng sản xuất và kho bãi quy mô lớn",
      features: [
        "Nhà máy sản xuất các loại",
        "Xưởng cơ khí, lắp ráp",
        "Kho bãi, logistics",
        "Công trình phụ trợ"
      ],
      projects: "100+ dự án hoàn thành",
    },
    {
      icon: <Engineering sx={{ fontSize: 60 }} />,
      title: "Hạ tầng kỹ thuật",
      description: "Xây dựng các công trình hạ tầng đô thị và kỹ thuật chuyên ngành",
      features: [
        "Đường giao thông, cầu cống",
        "Hệ thống cấp thoát nước",
        "Điện chiếu sáng đô thị",
        "Công viên, cảnh quan"
      ],
      projects: "80+ dự án hoàn thành",
    },
  ];

  return (
    <Box className="min-h-screen bg-gradient-to-br from-cyan-50 to-amber-50">
      <Container maxWidth="lg" className="py-16 space-y-20">
        {/* Header Section */}
        <section className="fade-in-on-scroll">
					<div className="flex flex-col items-center justify-center text-center mb-16">
						<Typography
							variant="h2"
							className="text-4xl font-bold text-center mb-6 text-gray-800"
						>
							Thi Công Xây Dựng
							<span style={{ color: theme.palette.primary.main }}> Công Trình</span>
						</Typography>
						<Typography
							variant="h6"
							className="text-center text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed"
						>
							Chúng tôi chuyên thi công các loại công trình từ dân dụng đến công nghiệp với chất lượng cao và tiến độ đúng cam kết
						</Typography>
					</div>
        </section>

        {/* Services Grid */}
        <section className="slide-in-left-on-scroll">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {constructionServices.map((service, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-lg border border-gray-200/50 transition-all duration-700 cursor-pointer zoom-in-on-scroll overflow-hidden"
                style={{
                  boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 25px 80px ${theme.palette.primary.main}25`;
                  e.currentTarget.style.borderColor = `${theme.palette.primary.main}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(229,231,235,0.5)';
                }}
              >
                {/* Gradient overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  style={{
                    background: `linear-gradient(to bottom right, ${theme.palette.primary.main}10, ${theme.palette.primary.main}20)`
                  }}
                ></div>
                
                {/* Decorative element */}
                <div 
                  className="absolute top-4 right-4 w-16 h-16 rounded-full group-hover:scale-125 transition-transform duration-500"
                  style={{
                    background: `linear-gradient(to bottom right, ${theme.palette.primary.main}20, ${theme.palette.primary.main}30)`
                  }}
                ></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div 
                      className="p-4 rounded-2xl mr-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        background: `linear-gradient(to bottom right, ${theme.palette.primary.main}15, ${theme.palette.primary.main}25)`
                      }}
                    >
                      {service.icon}
                    </div>
                    <div>
                      <Typography 
                        variant="h5" 
                        className="font-bold text-gray-800 transition-colors duration-300 mb-2"
                        sx={{
                          '.group:hover &': {
                            color: theme.palette.primary.main
                          }
                        }}
                      >
                        {service.title}
                      </Typography>
                      <div 
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          background: `${theme.palette.primary.main}15`,
                          color: theme.palette.primary.main
                        }}
                      >
                        {service.projects}
                      </div>
                    </div>
                  </div>
                  
                  <Typography variant="body1" className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </Typography>
                  
                  <div className="space-y-3 flex-grow">
                    <Typography variant="h6" className="font-semibold text-gray-800 mb-3">
                      Loại hình thi công:
                    </Typography>
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                        <div 
                          className="w-2 h-2 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"
                          style={{
                            background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.main})`
                          }}
                        ></div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center fade-in-on-scroll">
          <div 
            className="relative rounded-3xl text-white p-8 md:p-12 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 50%, #8b5cf6 100%)`,
              boxShadow: `0 20px 60px ${theme.palette.primary.main}30`,
            }}
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/5 rounded-full -translate-x-12 -translate-y-12 animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col items-center justify-center text-center mb-12">
									<Typography variant="h3" className="mb-6 font-bold text-white">
									Sẵn Sàng Khởi Công Dự Án Của Bạn?
									</Typography>
									<Typography variant="body1" className="text-white/90 max-w-2xl mx-auto leading-relaxed">
									Liên hệ với chúng tôi ngay hôm nay để được tư vấn chi tiết về thi công xây dựng và báo giá miễn phí
									</Typography>
							</div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  className="relative px-8 py-4 bg-white text-cyan-600 font-bold rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-105"
                  style={{
                    boxShadow: '0 8px 30px rgba(255,255,255,0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 15px 50px rgba(255,255,255,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(255,255,255,0.3)';
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 text-lg">0939 927 975</span>
                </button>
                
                <button
                  className="relative px-8 py-4 border-2 border-white text-white font-bold rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-105"
                  style={{
                    backdropFilter: 'blur(10px)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 text-lg">Yêu Cầu Báo Giá</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </Box>
  )
}
