'use client';

import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Assignment,
  AccountBalance,
  Groups,
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

export default function ProjectManagementPage() {
  useScrollAnimations();
  const theme = useTheme();

  const managementServices = [
    {
      icon: <Assignment sx={{ fontSize: 60 }} />,
      title: "Lập kế hoạch dự án",
      description: "Xây dựng kế hoạch tổng thể chi tiết từ khởi công đến bàn giao",
      features: [
        "Phân tích và định nghĩa phạm vi dự án",
        "Lập lịch trình thi công chi tiết (Gantt Chart)",
        "Xác định mốc quan trọng và deliverables", 
        "Đánh giá rủi ro và lập kế hoạch ứng phó"
      ],
      tools: [
        "Microsoft Project",
        "Primavera P6", 
        "Smartsheet",
        "Gantt Chart Tools"
      ],
      experience: "10+ năm kinh nghiệm",
      projects: "200+ dự án thành công"
    },
    {
      icon: <AccountBalance sx={{ fontSize: 60 }} />,
      title: "Quản lý ngân sách",
      description: "Kiểm soát chi phí và tối ưu hóa ngân sách dự án hiệu quả",
      features: [
        "Lập dự toán chi tiết các hạng mục",
        "Theo dõi chi phí thực tế vs kế hoạch",
        "Kiểm soát chi phí phát sinh",
        "Báo cáo tài chính định kỳ"
      ],
      tools: [
        "Cost Control Software",
        "Excel Advanced",
        "SAP Project System",
        "Oracle Primavera"
      ],
      experience: "15+ năm kinh nghiệm",
      projects: "Tiết kiệm 10-20% ngân sách"
    },
    {
      icon: <Groups sx={{ fontSize: 60 }} />,
      title: "Quản lý nhân lực & thiết bị", 
      description: "Tối ưu hóa việc sử dụng nguồn nhân lực và thiết bị máy móc",
      features: [
        "Lập kế hoạch nhân lực theo giai đoạn",
        "Quản lý lịch làm việc và ca trực",
        "Điều phối thiết bị máy móc hiệu quả",
        "Đánh giá hiệu suất và năng suất"
      ],
      tools: [
        "Resource Management Tools",
        "HR Management System",
        "Equipment Tracking",
        "Performance Analytics"
      ],
      experience: "12+ năm kinh nghiệm", 
      projects: "Tăng 30% hiệu suất"
    },
  ];

  const managementPhases = [
    {
      phase: "Khởi tạo",
      duration: "1-2 tuần",
      activities: ["Định nghĩa mục tiêu", "Phân tích stakeholders", "Lập charter dự án"],
      icon: "🎯"
    },
    {
      phase: "Lập kế hoạch", 
      duration: "2-3 tuần",
      activities: ["Chi tiết scope", "Lập timeline", "Phân bổ nguồn lực"],
      icon: "📋"
    },
    {
      phase: "Thực hiện",
      duration: "Theo dự án",
      activities: ["Điều phối thi công", "Giám sát tiến độ", "Báo cáo định kỳ"],
      icon: "⚡"
    },
    {
      phase: "Giám sát",
      duration: "Liên tục", 
      activities: ["Tracking KPI", "Risk management", "Quality assurance"],
      icon: "📊"
    },
    {
      phase: "Kết thúc",
      duration: "1-2 tuần",
      activities: ["Nghiệm thu", "Bàn giao", "Lessons learned"],
      icon: "✅"
    }
  ];

  return (
    <Box className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <Container maxWidth="lg" className="py-16 space-y-20">
        {/* Header Section */}
        <section className="fade-in-on-scroll">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <Typography
              variant="h2"
              className="text-4xl font-bold text-center mb-6 text-gray-800"
            >
              Tư Vấn Quản Lý
              <span style={{ color: theme.palette.primary.main }}> Dự Án</span>
            </Typography>
            <Typography
              variant="h6"
              className="text-center text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed"
            >
              Dịch vụ quản lý dự án chuyên nghiệp giúp đảm bảo dự án hoàn thành đúng tiến độ, ngân sách và chất lượng cam kết
            </Typography>
          </div>
        </section>

        {/* Services Grid */}
        <section className="slide-in-left-on-scroll">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {managementServices.map((service, index) => (
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
                        {service.projects}
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
                      Công cụ sử dụng:
                    </Typography>
                    <div className="flex flex-wrap gap-1">
                      {service.tools.map((tool, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 text-xs rounded-lg bg-gray-100 text-gray-600 border"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Project Phases */}
        <section className="slide-in-right-on-scroll">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <Typography variant="h3" className="font-bold text-gray-800 mb-4">
              5 Giai Đoạn Quản Lý Dự Án
            </Typography>
            <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto">
              Áp dụng phương pháp quản lý dự án quốc tế PMBOK để đảm bảo hiệu quả cao nhất
            </Typography>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {managementPhases.map((phase, index) => (
                <div key={index} className="relative">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 text-center">
                    {/* Icon */}
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl relative z-10"
                      style={{
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, #8b5cf6)`
                      }}
                    >
                      <span className="text-white text-lg">{phase.icon}</span>
                    </div>
                    
                    <Typography variant="h6" className="font-bold text-gray-800 mb-2">
                      {phase.phase}
                    </Typography>
                    
                    <div 
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                      style={{
                        background: `${theme.palette.primary.main}15`,
                        color: theme.palette.primary.main
                      }}
                    >
                      {phase.duration}
                    </div>
                    
                    <div className="space-y-2">
                      {phase.activities.map((activity, idx) => (
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

        {/* Call to Action */}
        <section className="text-center fade-in-on-scroll">
          <div 
            className="relative rounded-3xl text-white p-8 md:p-12 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #8b5cf6 50%, #3b82f6 100%)`,
              boxShadow: `0 20px 60px ${theme.palette.primary.main}30`,
            }}
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col items-center justify-center text-center mb-12">
								<Typography variant="h3" className="mb-6 font-bold text-white">
									Dự Án Thành Công Cùng Chuyên Gia
								</Typography>
								<Typography variant="body1" className="text-white/90 max-w-2xl mx-auto leading-relaxed">
									Với đội ngũ Project Manager được chứng nhận quốc tế, chúng tôi cam kết mang đến sự thành công cho mọi dự án
								</Typography>
							</div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Typography variant="h4" className="font-bold mb-2">98%</Typography>
                  <Typography variant="body2" className="opacity-90">Dự án hoàn thành đúng hạn</Typography>
                </div>
                <div className="text-center">
                  <Typography variant="h4" className="font-bold mb-2">15%</Typography>
                  <Typography variant="body2" className="opacity-90">Tiết kiệm chi phí trung bình</Typography>
                </div>
                <div className="text-center">
                  <Typography variant="h4" className="font-bold mb-2">500+</Typography>
                  <Typography variant="body2" className="opacity-90">Dự án đã quản lý</Typography>
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
                  <span className="relative z-10 text-lg">Tư Vấn Quản Lý Dự Án</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </Box>
  )
}
