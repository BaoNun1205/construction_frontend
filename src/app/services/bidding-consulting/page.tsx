'use client';

import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Description,
  Assessment,
  PersonSearch,
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

export default function BiddingConsultingPage() {
  useScrollAnimations();
  const theme = useTheme();

  const biddingServices = [
    {
      icon: <Description sx={{ fontSize: 60 }} />,
      title: "Lập hồ sơ mời thầu",
      description: "Chuẩn bị hồ sơ mời thầu chi tiết, chuyên nghiệp theo quy định pháp luật",
      features: [
        "Soạn thảo điều kiện kỹ thuật chi tiết",
        "Lập dự toán giá gói thầu",
        "Xây dựng tiêu chí đánh giá hồ sơ",
        "Chuẩn bị tài liệu pháp lý đầy đủ"
      ],
      documents: [
        "Thông báo mời thầu",
        "Hồ sơ yêu cầu (RFP)",
        "Bản vẽ thiết kế kỹ thuật",
        "Điều kiện hợp đồng"
      ],
      experience: "12+ năm kinh nghiệm",
      success: "95% thành công"
    },
    {
      icon: <Assessment sx={{ fontSize: 60 }} />,
      title: "Đánh giá hồ sơ dự thầu",
      description: "Thẩm định và đánh giá hồ sơ dự thầu một cách công bằng, minh bạch",
      features: [
        "Kiểm tra tính hợp lệ hồ sơ",
        "Đánh giá năng lực kỹ thuật",
        "Phân tích báo giá chi tiết",
        "Xếp hạng và so sánh nhà thầu"
      ],
      criteria: [
        "Năng lực tài chính",
        "Kinh nghiệm dự án",
        "Đội ngũ chuyên môn",
        "Phương án kỹ thuật"
      ],
      experience: "15+ năm kinh nghiệm",
      success: "100+ cuộc thầu"
    },
    {
      icon: <PersonSearch sx={{ fontSize: 60 }} />,
      title: "Tư vấn lựa chọn nhà thầu",
      description: "Hỗ trợ chủ đầu tư lựa chọn nhà thầu phù hợp nhất cho dự án",
      features: [
        "Phân tích hồ sơ năng lực",
        "Đánh giá uy tín thị trường",
        "So sánh phương án kỹ thuật",
        "Thương lượng điều kiện hợp đồng"
      ],
      benefits: [
        "Tiết kiệm thời gian",
        "Giảm rủi ro dự án",
        "Tối ưu chi phí",
        "Đảm bảo chất lượng"
      ],
      experience: "20+ năm kinh nghiệm",
      success: "Tiết kiệm 15-25% chi phí"
    },
  ];

  const biddingProcess = [
    {
      step: "Chuẩn bị",
      duration: "2-3 tuần",
      activities: ["Phân tích nhu cầu", "Lập kế hoạch thầu", "Chuẩn bị tài liệu"],
      icon: "📋"
    },
    {
      step: "Mời thầu",
      duration: "3-4 tuần", 
      activities: ["Phát hành thông báo", "Tổ chức sơ tuyển", "Bán hồ sơ thầu"],
      icon: "📢"
    },
    {
      step: "Nhận thầu",
      duration: "4-6 tuần",
      activities: ["Thu thập hồ sơ", "Kiểm tra tính hợp lệ", "Tổ chức mở thầu"],
      icon: "📥"
    },
    {
      step: "Đánh giá",
      duration: "2-3 tuần",
      activities: ["Thẩm định kỹ thuật", "Đánh giá tài chính", "Xếp hạng nhà thầu"],
      icon: "⚖️"
    },
    {
      step: "Quyết định",
      duration: "1 tuần",
      activities: ["Phê duyệt kết quả", "Thương thảo hợp đồng", "Ký kết"],
      icon: "✅"
    }
  ];

  const advantages = [
    {
      title: "Tuân thủ pháp luật",
      description: "Đảm bảo 100% quy trình đúng luật định",
      icon: "⚖️",
      color: "#3b82f6"
    },
    {
      title: "Minh bạch công bằng",
      description: "Quy trình đánh giá công khai, khách quan",
      icon: "🏛️", 
      color: "#10b981"
    },
    {
      title: "Tiết kiệm chi phí",
      description: "Lựa chọn nhà thầu tối ưu về giá và chất lượng",
      icon: "💰",
      color: "#f59e0b"
    },
    {
      title: "Giảm rủi ro",
      description: "Thẩm định kỹ lưỡng năng lực nhà thầu",
      icon: "🛡️",
      color: "#ef4444"
    }
  ];

  return (
    <Box className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      <Container maxWidth="lg" className="py-16 space-y-20">
        {/* Header Section */}
        <section className="fade-in-on-scroll">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <Typography
              variant="h2"
              className="text-4xl font-bold text-center mb-6 text-gray-800"
            >
              Tư Vấn
              <span style={{ color: theme.palette.primary.main }}> Đấu Thầu</span>
            </Typography>
            <Typography
              variant="h6"
              className="text-center text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed"
            >
              Dịch vụ tư vấn đấu thầu toàn diện từ lập hồ sơ mời thầu đến lựa chọn nhà thầu phù hợp, đảm bảo minh bạch và hiệu quả
            </Typography>
          </div>
        </section>

        {/* Services Grid */}
        <section className="slide-in-left-on-scroll">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {biddingServices.map((service, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-lg border border-gray-200/50 transition-all duration-700 cursor-pointer zoom-in-on-scroll overflow-hidden h-full"
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
                    background: `linear-gradient(to bottom right, ${theme.palette.primary.main}08, ${theme.palette.primary.main}15)`
                  }}
                ></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="text-center mb-6">
                    <div 
                      className="inline-flex p-4 rounded-2xl mb-4 transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(to bottom right, ${theme.palette.primary.main}20, ${theme.palette.primary.main}30)`
                      }}
                    >
                      {service.icon}
                    </div>
                    <Typography 
                      variant="h5" 
                      className="font-bold text-gray-800 transition-colors duration-300 mb-3"
                      sx={{
                        '.group:hover &': {
                          color: theme.palette.primary.main
                        }
                      }}
                    >
                      {service.title}
                    </Typography>
                    <div className="flex justify-center gap-2 mb-2">
                      <div 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: `${theme.palette.primary.main}12`,
                          color: theme.palette.primary.main
                        }}
                      >
                        {service.experience}
                      </div>
                      <div 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: '#10b98115',
                          color: '#10b981'
                        }}
                      >
                        {service.success}
                      </div>
                    </div>
                  </div>
                  
                  <Typography variant="body1" className="text-gray-600 mb-6 leading-relaxed text-center">
                    {service.description}
                  </Typography>
                  
                  <div className="space-y-4 mb-6 flex-grow">
                    <Typography variant="h6" className="font-semibold text-gray-800">
                      Hoạt động chính:
                    </Typography>
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start text-sm text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                        <div 
                          className="w-2 h-2 rounded-full mr-3 mt-1.5 group-hover:scale-125 transition-transform duration-300 flex-shrink-0"
                          style={{
                            background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.main})`
                          }}
                        ></div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200/50 pt-4">
                    <Typography variant="subtitle2" className="font-semibold text-gray-800 mb-2">
                      {service.documents ? 'Tài liệu cung cấp:' : service.criteria ? 'Tiêu chí đánh giá:' : 'Lợi ích mang lại:'}
                    </Typography>
                    <div className="space-y-1">
                      {(service.documents || service.criteria || service.benefits)?.map((item, idx) => (
                        <div key={idx} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                          • {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bidding Process */}
        <section className="slide-in-right-on-scroll">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <Typography variant="h3" className="font-bold text-gray-800 mb-4">
              Quy Trình Đấu Thầu
            </Typography>
            <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto">
              Áp dụng quy trình đấu thầu tiêu chuẩn quốc gia, đảm bảo tính minh bạch và hiệu quả
            </Typography>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-600 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {biddingProcess.map((process, index) => (
                <div key={index} className="relative">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 text-center">
                    {/* Icon */}
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl relative z-10"
                      style={{
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, #06b6d4)`
                      }}
                    >
                      <span className="text-white text-lg">{process.icon}</span>
                    </div>
                    
                    <Typography variant="h6" className="font-bold text-gray-800 mb-2">
                      {process.step}
                    </Typography>
                    
                    <div 
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                      style={{
                        background: `${theme.palette.primary.main}15`,
                        color: theme.palette.primary.main
                      }}
                    >
                      {process.duration}
                    </div>
                    
                    <div className="space-y-2">
                      {process.activities.map((activity, idx) => (
                        <div key={idx} className="text-sm text-gray-600">
                          • {activity}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="fade-in-on-scroll">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <Typography variant="h3" className="font-bold text-gray-800 mb-4">
              Ưu Điểm Vượt Trội
            </Typography>
            <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto">
              Cam kết mang đến dịch vụ đấu thầu chuyên nghiệp, minh bạch và hiệu quả cao
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div 
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${advantage.color}15` }}
                >
                  <span>{advantage.icon}</span>
                </div>
                <Typography variant="h6" className="font-bold text-gray-800 mb-2">
                  {advantage.title}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {advantage.description}
                </Typography>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center fade-in-on-scroll">
          <div 
            className="relative rounded-3xl text-white p-8 md:p-12 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #06b6d4 50%, #0891b2 100%)`,
              boxShadow: `0 20px 60px ${theme.palette.primary.main}30`,
            }}
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col items-center justify-center text-center mb-12">
								<Typography variant="h3" className="mb-6 font-bold text-white">
									Đấu Thầu Thành Công Cùng Chuyên Gia
								</Typography>
								<Typography variant="body1" className="text-white/90 max-w-2xl mx-auto leading-relaxed">
									Với kinh nghiệm hơn 15 năm trong lĩnh vực đấu thầu, chúng tôi cam kết mang đến giải pháp tối ưu cho mọi gói thầu
								</Typography>
							</div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Typography variant="h4" className="font-bold mb-2">500+</Typography>
                  <Typography variant="body2" className="opacity-90">Gói thầu thành công</Typography>
                </div>
                <div className="text-center">
                  <Typography variant="h4" className="font-bold mb-2">95%</Typography>
                  <Typography variant="body2" className="opacity-90">Tỷ lệ trúng thầu</Typography>
                </div>
                <div className="text-center">
                  <Typography variant="h4" className="font-bold mb-2">20%</Typography>
                  <Typography variant="body2" className="opacity-90">Tiết kiệm chi phí trung bình</Typography>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  className="relative px-8 py-4 bg-white font-bold rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-105"
                  style={{
                    color: theme.palette.primary.main,
                    boxShadow: '0 8px 30px rgba(255,255,255,0.3)',
                  }}
                >
                  <span className="relative z-10 text-lg">0939 927 975</span>
                </button>
                
                <button
                  className="relative px-8 py-4 border-2 border-white text-white font-bold rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-105"
                  style={{
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <span className="relative z-10 text-lg">Tư Vấn Đấu Thầu</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </Box>
  )
}
