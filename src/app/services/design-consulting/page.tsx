"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@mui/material/styles"
import {
  Phone as PhoneIcon,
  Group as GroupIcon,
  GpsFixed as GpsFixedIcon,
  Handshake as HandshakeIcon,
  Palette as PaletteIcon,
  FolderOpen as FolderOpenIcon,
  LocationOn as LocationOnIcon,
  Description as DescriptionIcon,
  Build as BuildIcon,
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material"

// Intersection Observer Hook for animations
const useScrollAnimations = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll(".fade-in-up, .slide-in-left, .slide-in-right, .scale-in")

    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

export default function DesignConsultingPage() {
  useScrollAnimations()
  const theme = useTheme()

  const [activeStep, setActiveStep] = useState(0)

  const mainSections = [
    {
      id: "purpose",
      title: "Mục đích của tư vấn thiết kế kiến trúc",
      icon: <GpsFixedIcon className="w-8 h-8" />,
      content: [
        "Tư vấn thiết kế kiến trúc nhằm tạo ra những công trình xây dựng đáp ứng đầy đủ nhu cầu sử dụng của khách hàng",
        "Đảm bảo tính thẩm mỹ, chức năng và tuân thủ các quy định pháp luật về xây dựng",
        "Tối ưu hóa không gian sống và làm việc, tạo ra môi trường sống thoải mái và hiện đại",
        "Cung cấp giải pháp thiết kế bền vững, tiết kiệm năng lượng và thân thiện với môi trường",
      ],
    },
    {
      id: "requirements",
      title: "Yêu cầu tư vấn",
      icon: <DescriptionIcon className="w-8 h-8" />,
      content: [
        "Khách hàng cung cấp đầy đủ thông tin về nhu cầu sử dụng, quy mô và ngân sách dự kiến",
        "Cung cấp hồ sơ pháp lý đất đai, giấy phép xây dựng (nếu có)",
        "Thông tin về điều kiện địa chất, hạ tầng kỹ thuật khu vực",
        "Yêu cầu về phong cách kiến trúc, màu sắc và vật liệu ưa thích",
        "Cam kết hợp tác trong suốt quá trình thiết kế và thi công",
      ],
    },
  ]

  const designProcess = [
    {
      step: 1,
      title: "Tư vấn qua điện thoại",
      description: "Trao đổi sơ bộ về nhu cầu, quy mô dự án và tư vấn ban đầu",
      icon: <PhoneIcon className="w-6 h-6" />,
    },
    {
      step: 2,
      title: "Tư vấn trực tiếp",
      description: "Gặp gỡ khách hàng để trao đổi chi tiết về dự án",
      icon: <GroupIcon className="w-6 h-6" />,
    },
    {
      step: 3,
      title: "Đo đạc khảo sát mặt bằng",
      description: "Khảo sát thực địa để có dữ liệu chính xác cho thiết kế",
      icon: <LocationOnIcon className="w-6 h-6" />,
    },
    {
      step: 4,
      title: "Ký kết hợp đồng",
      description: "Hoàn thiện thủ tục pháp lý và ký kết hợp đồng thiết kế",
      icon: <HandshakeIcon className="w-6 h-6" />,
    },
    {
      step: 5,
      title: "Thiết kế phối cảnh và công năng",
      description: "Thiết kế ý tưởng và bố trí chức năng không gian",
      icon: <PaletteIcon className="w-6 h-6" />,
    },
    {
      step: 6,
      title: "Triển khai hồ sơ kỹ thuật",
      description: "Hoàn thiện hồ sơ thiết kế kỹ thuật chi tiết",
      icon: <BuildIcon className="w-6 h-6" />,
    },
    {
      step: 7,
      title: "Bàn giao hồ sơ",
      description: "Hoàn tất và bàn giao hồ sơ thiết kế cho khách hàng",
      icon: <FolderOpenIcon className="w-6 h-6" />,
    },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.palette.background.default }}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.main}10 50%, ${theme.palette.secondary.main}15 100%)`
          }}
        >
          <div 
            className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl"
            style={{ backgroundColor: `${theme.palette.primary.main}15` }}
          ></div>
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: `${theme.palette.secondary.main}20` }}
          ></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="fade-in-up">
            <h1 
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
              style={{ color: theme.palette.primary.main }}
            >
              Tư Vấn Thiết Kế
              <br />
              Kiến Trúc
            </h1>
            <p 
              className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-12"
              style={{ color: theme.palette.text.secondary }}
            >
              Chúng tôi cung cấp dịch vụ tư vấn thiết kế kiến trúc chuyên nghiệp, từ ý tưởng ban đầu đến hồ sơ hoàn
              thiện, đảm bảo chất lượng và tiến độ.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                className="text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.palette.primary.dark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme.palette.primary.main;
                }}
              >
                Bắt đầu tư vấn
                <ArrowForwardIcon className="ml-2 w-5 h-5" />
              </button>
              <button
                className="text-lg px-8 py-6 rounded-lg border-2 transition-all duration-300 bg-transparent"
                style={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${theme.palette.primary.main}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Xem portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-32">
          {mainSections.map((section, index) => (
            <div key={section.id} className={`${index % 2 === 0 ? "slide-in-left" : "slide-in-right"}`}>
              <div
                className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-16`}
              >
                <div className="flex-1 space-y-8">
                  <div className="flex items-center gap-6">
                    <div 
                      className="p-4 rounded-xl"
                      style={{
                        backgroundColor: `${theme.palette.primary.main}15`,
                        color: theme.palette.primary.main
                      }}
                    >
                      {section.icon}
                    </div>
                    <h2 
                      className="text-3xl md:text-4xl font-bold"
                      style={{ color: theme.palette.text.primary }}
                    >
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {section.content.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <CheckCircleIcon 
                          className="w-6 h-6 mt-1 flex-shrink-0" 
                          style={{ color: theme.palette.primary.main }}
                        />
                        <p 
                          className="text-lg leading-relaxed"
                          style={{ color: theme.palette.text.secondary }}
                        >
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="relative">
                    <div 
                      className="w-full h-80 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${theme.palette.grey[100]} 0%, ${theme.palette.primary.main}20 100%)`
                      }}
                    >
                      <div 
                        className="text-6xl"
                        style={{ color: `${theme.palette.primary.main}50` }}
                      >
                        {section.icon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section 
        className="py-24 px-6"
        style={{ backgroundColor: `${theme.palette.grey[50]}` }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 fade-in-up">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: theme.palette.primary.main }}
            >
              Quy Trình 7 Bước Thiết kế
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: theme.palette.text.secondary }}
            >
              Hành trình thiết kế chuyên nghiệp với 7 bước được tối ưu hóa để mang lại kết quả tốt nhất
            </p>
          </div>

          <div className="relative flex items-center justify-center min-h-[600px]">
            {/* Central content area */}
            <div 
              className="relative z-10 w-80 h-80 rounded-full shadow-2xl flex flex-col items-center justify-center p-8"
              style={{
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}10 100%)`,
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              <div className="text-center">
                <div 
                  className="mb-4"
                  style={{ color: theme.palette.primary.main }}
                >
                  {designProcess[activeStep].icon}
                </div>
                <div 
                  className="text-3xl font-bold mb-2"
                  style={{ color: theme.palette.primary.main }}
                >
                  Bước {designProcess[activeStep].step}
                </div>
                <h3 
                  className="text-lg font-semibold mb-3 leading-tight"
                  style={{ color: theme.palette.text.primary }}
                >
                  {designProcess[activeStep].title}
                </h3>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: theme.palette.text.secondary }}
                >
                  {designProcess[activeStep].description}
                </p>
              </div>
            </div>

            {/* Circular step indicators */}
            {designProcess.map((process, index) => {
              const angle = (index * 360) / designProcess.length - 90 // Start from top
              const radius = 250
              const x = Math.cos((angle * Math.PI) / 180) * radius
              const y = Math.sin((angle * Math.PI) / 180) * radius

              return (
                <button
                  key={process.step}
                  onClick={() => setActiveStep(index)}
                  className="absolute w-16 h-16 rounded-full border-2 transition-all duration-500 hover:scale-110"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    zIndex: 30, // Increased z-index to be above the circle
                    backgroundColor: index === activeStep 
                      ? theme.palette.primary.main 
                      : index < activeStep 
                        ? `${theme.palette.primary.main}30`
                        : theme.palette.background.paper,
                    color: index === activeStep 
                      ? theme.palette.primary.contrastText
                      : index < activeStep 
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                    borderColor: index === activeStep 
                      ? theme.palette.primary.main
                      : index < activeStep 
                        ? `${theme.palette.primary.main}60`
                        : theme.palette.divider,
                    boxShadow: index === activeStep ? `0 8px 25px ${theme.palette.primary.main}40` : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (index !== activeStep) {
                      e.currentTarget.style.borderColor = `${theme.palette.primary.main}60`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index !== activeStep) {
                      e.currentTarget.style.borderColor = index < activeStep 
                        ? `${theme.palette.primary.main}60`
                        : theme.palette.divider;
                    }
                  }}
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-xs font-bold">{process.step}</div>
                  </div>
                </button>
              )
            })}

            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <circle
                cx="50%"
                cy="50%"
                r="250"
                fill="none"
                stroke={theme.palette.divider}
                strokeWidth="2"
                strokeDasharray="8,8"
                className="opacity-30"
              />
              {/* Progress arc */}
              <circle
                cx="50%"
                cy="50%"
                r="250"
                fill="none"
                stroke={theme.palette.primary.main}
                strokeWidth="3"
                strokeDasharray={`${(activeStep + 1) * (1570 / designProcess.length)}, 1570`}
                strokeLinecap="round"
                className="transition-all duration-700"
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "50% 50%",
                }}
              />
            </svg>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              className="rounded-full border px-3 py-2 transition-all duration-300"
              style={{
                borderColor: theme.palette.divider,
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper
              }}
              onClick={() => setActiveStep(activeStep > 0 ? activeStep - 1 : designProcess.length - 1)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.palette.primary.main;
                e.currentTarget.style.color = theme.palette.primary.main;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.palette.divider;
                e.currentTarget.style.color = theme.palette.text.primary;
              }}
            >
              ←
            </button>
            <div className="flex gap-2">
              {designProcess.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: index === activeStep ? theme.palette.primary.main : theme.palette.divider,
                    width: index === activeStep ? '32px' : '8px'
                  }}
                  onMouseEnter={(e) => {
                    if (index !== activeStep) {
                      e.currentTarget.style.backgroundColor = `${theme.palette.primary.main}60`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index !== activeStep) {
                      e.currentTarget.style.backgroundColor = theme.palette.divider;
                    }
                  }}
                />
              ))}
            </div>
            <button
              className="rounded-full border px-3 py-2 transition-all duration-300"
              style={{
                borderColor: theme.palette.divider,
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper
              }}
              onClick={() => setActiveStep(activeStep < designProcess.length - 1 ? activeStep + 1 : 0)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.palette.primary.main;
                e.currentTarget.style.color = theme.palette.primary.main;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.palette.divider;
                e.currentTarget.style.color = theme.palette.text.primary;
              }}
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center fade-in-up">
          <div 
            className="relative rounded-2xl p-12 md:p-16 text-white overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.primary.dark} 100%)`,
              boxShadow: `0 20px 60px ${theme.palette.primary.main}30`
            }}
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/5 rounded-full -translate-x-12 -translate-y-12 animate-pulse"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Bắt Đầu Dự Án Của Bạn Ngay Hôm Nay
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-10">
                Liên hệ với chúng tôi để được tư vấn miễn phí và nhận báo giá chi tiết cho dự án thiết kế của bạn.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  className="text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                  style={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.primary.main,
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
                  <PhoneIcon className="mr-2 w-5 h-5" />
                  Gọi Tư Vấn: 0123 456 789
                </button>

                <button
                  className="text-lg px-8 py-6 rounded-lg border-2 border-white text-white transition-all duration-300 bg-transparent font-semibold"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Nhận Báo Giá
                  <ArrowForwardIcon className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
