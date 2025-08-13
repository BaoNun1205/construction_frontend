'use client';

import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
} from '@mui/material';
import {
  Construction,
  Engineering,
  ManageAccounts,
  Assessment,
  Schedule,
  AccountBalance,
  Landscape,
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

export default function ServicesPage() {
  useScrollAnimations();

  const constructionServices = [
    {
      icon: <Construction sx={{ fontSize: 50 }} />,
      title: "Xây Dựng Dân Dụng",
      description: "Thiết kế và thi công các công trình nhà ở, biệt thự, chung cư cao cấp",
      color: "#1976d2",
    },
    {
      icon: <Engineering sx={{ fontSize: 50 }} />,
      title: "Xây Dựng Công Nghiệp", 
      description: "Nhà máy, kho bãi, công trình công nghiệp quy mô lớn",
      color: "#2e7d32",
    },
    {
      icon: <AccountBalance sx={{ fontSize: 50 }} />,
      title: "Hạ Tầng Đô Thị",
      description: "Cầu đường, hệ thống thoát nước, công trình công cộng",
      color: "#7b1fa2",
    },
    {
      icon: <Landscape sx={{ fontSize: 50 }} />,
      title: "Thiết Kế Cảnh Quan",
      description: "Quy hoạch và thiết kế không gian xanh, sân vườn",
      color: "#ed6c02",
    },
  ]

  const managementServices = [
    {
      icon: <ManageAccounts sx={{ fontSize: 50 }} />,
      title: "Quản Lý Dự Án",
      description: "Điều phối toàn bộ quá trình từ khởi công đến bàn giao",
      features: ["Lập kế hoạch chi tiết", "Giám sát tiến độ", "Quản lý nhân sự"],
      color: "#3f51b5",
    },
    {
      icon: <Assessment sx={{ fontSize: 50 }} />,
      title: "Kiểm Soát Chất Lượng",
      description: "Đảm bảo tiêu chuẩn chất lượng cao nhất cho mọi công trình",
      features: ["Kiểm tra vật liệu", "Giám sát thi công", "Nghiệm thu từng giai đoạn"],
      color: "#d32f2f",
    },
    {
      icon: <Schedule sx={{ fontSize: 50 }} />,
      title: "Quản Lý Tiến Độ",
      description: "Tối ưu hóa thời gian thi công và đảm bảo bàn giao đúng hạn",
      features: ["Lập timeline chi tiết", "Theo dõi milestone", "Báo cáo định kỳ"],
      color: "#00796b",
    },
  ]

  const consultingServices = [
    "Tư vấn thiết kế kiến trúc",
    "Thẩm định dự án đầu tư",
    "Giám sát thi công",
    "Tư vấn pháp lý xây dựng",
    "Đánh giá tác động môi trường",
    "Tư vấn ngân sách chi phí",
  ]

  return (
    <Box className="min-h-screen bg-gradient-to-br from-cyan-50 to-amber-50">
      <Container maxWidth="lg" className="py-16 space-y-20">
        {/* Header Section */}
        <section className="fade-in-on-scroll">
          <Typography
            variant="h2"
            className="text-3xl font-bold text-center mb-6 text-gray-800"
            sx={{ marginBottom: '1.5rem' }}
          >
            Dịch Vụ Xây Dựng
            <span className="text-cyan-600"> Chuyên Nghiệp</span>
          </Typography>
          <div className="flex items-center justify-center min-h-[100px]">
            <Typography
              variant="h6"
              className="text-center text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed"
              sx={{ marginBottom: '2rem' }}
            >
              Chúng tôi cung cấp giải pháp toàn diện từ thiết kế đến thi công, đảm bảo chất lượng cao và tiến độ đúng cam kết
            </Typography>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Chip 
              label="15+ Năm Kinh Nghiệm" 
              className="bg-cyan-100 text-cyan-800" 
              size="medium" 
            />
            <Chip 
              label="500+ Dự Án Hoàn Thành" 
              className="bg-green-100 text-green-800" 
              size="medium" 
            />
            <Chip 
              label="Đội Ngũ Chuyên Gia" 
              className="bg-amber-100 text-amber-800" 
              size="medium" 
            />
          </div>
        </section>
        {/* Construction Technology Section */}
        <section className="slide-in-left-on-scroll">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <Typography variant="h3" className="mb-6 font-bold text-gray-800">
              Công Nghệ Xây Dựng Hiện Đại
            </Typography>
            <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Ứng dụng công nghệ tiên tiến và phương pháp thi công hiện đại để mang lại chất lượng tối ưu
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {constructionServices.map((service, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-white/20 hover:bg-white/90 transition-all duration-500 cursor-pointer fade-in-on-scroll"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(88,208,245,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 text-center h-full flex flex-col">
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-100 group-hover:from-cyan-200 group-hover:to-blue-200 transition-all duration-300 group-hover:scale-110">
                      {service.icon}
                    </div>
                  </div>
                  <Typography variant="h6" className="font-bold text-gray-800 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 leading-relaxed flex-grow group-hover:text-gray-700 transition-colors duration-300">
                    {service.description}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Project Management Section */}
        <section className="slide-in-right-on-scroll">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <Typography variant="h3" className="mb-6 font-bold text-gray-800">
              Quản Lý Dự Án Chuyên Nghiệp
            </Typography>
            <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Đội ngũ quản lý dự án giàu kinh nghiệm đảm bảo mọi công trình được thực hiện đúng tiến độ và chất lượng
            </Typography>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {managementServices.map((service, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-lg border border-gray-200/50 hover:border-cyan-300/50 transition-all duration-700 cursor-pointer zoom-in-on-scroll overflow-hidden"
                style={{
                  boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 25px 80px rgba(88,208,245,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
                }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                {/* Decorative element */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-cyan-200/30 to-blue-300/30 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="p-4 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl mr-4 group-hover:from-cyan-200 group-hover:to-blue-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      {service.icon}
                    </div>
                    <Typography variant="h5" className="font-bold text-gray-800 group-hover:text-cyan-600 transition-colors duration-300">
                      {service.title}
                    </Typography>
                  </div>
                  <Typography variant="body1" className="text-gray-600 mb-6 leading-relaxed flex-grow group-hover:text-gray-700 transition-colors duration-300">
                    {service.description}
                  </Typography>
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consultation Services Section */}
        <section className="zoom-in-on-scroll">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-xl border border-white/50 p-8 md:p-12">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full translate-x-20 translate-y-20"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col items-center justify-center text-center mb-12">
              <Typography variant="h3" className="mb-6 font-bold text-gray-800">
                Dịch Vụ Tư Vấn Chuyên Sâu
              </Typography>
              <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Đội ngũ chuyên gia tư vấn với nhiều năm kinh nghiệm sẽ hỗ trợ bạn từ khâu lập kế hoạch đến hoàn thiện dự án
              </Typography>
            </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {consultingServices.map((service, index) => (
                  <div
                    key={index}
                    className="group relative p-6 rounded-2xl bg-white/50 backdrop-blur-md border border-gray-200/50 hover:bg-white/80 hover:border-cyan-300/50 transition-all duration-400 cursor-pointer overflow-hidden"
                    style={{
                      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(88,208,245,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
                    }}
                  >
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                    
                    <div className="relative z-10 flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mr-4 group-hover:scale-150 group-hover:shadow-lg group-hover:shadow-cyan-300/50 transition-all duration-400"></div>
                      <Typography variant="body1" className="text-gray-800 font-semibold group-hover:text-cyan-600 transition-colors duration-300">
                        {service}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <button
                  className="relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 text-lg">Liên Hệ Tư Vấn Miễn Phí</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </Box>
  )
}
