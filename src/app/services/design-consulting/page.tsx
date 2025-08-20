"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "@mui/material/styles"
import Image from "next/image"
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
import { Box, Button, Container, Stack, Typography } from "@mui/material"
import { useTranslations } from "@/hooks/useTranslations"

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
  const { t: tRaw } = useTranslations();
  // Type-safe wrapper for translation function
  const t = (key: string): string => tRaw(key) as string;

  const [activeAITool, setActiveAITool] = useState<number | null>(null)
  const aiToolsRef = useRef<HTMLElement>(null)

  // Function to scroll to AI Tools section
  const scrollToAITools = () => {
    aiToolsRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  const mainSections = [
    {
      id: "purpose",
      title: "Mục đích của tư vấn thiết kế kiến trúc",
      icon: <GpsFixedIcon className="w-8 h-8" />,
      image: "/design-consulting/target.jpg",
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
      image: "/design-consulting/request.jpg",
      content: [
        "Khách hàng cung cấp đầy đủ thông tin về nhu cầu sử dụng, quy mô và ngân sách dự kiến",
        "Cung cấp hồ sơ pháp lý đất đai, giấy phép xây dựng (nếu có)",
        "Thông tin về điều kiện địa chất, hạ tầng kỹ thuật khu vực",
        "Yêu cầu về phong cách kiến trúc, màu sắc và vật liệu ưa thích",
        "Cam kết hợp tác trong suốt quá trình thiết kế và thi công",
      ],
    },
  ]

  // Quy trình thiết kế AI kiến trúc theo sơ đồ (12 bước)
  const aiDesignProcess = [
    {
      step: 1,
      title: "Gặp gỡ Chủ đầu tư",
      description: "Làm rõng các yêu cầu, quy mô hình dự án, nguyện vọng ban đầu",
      details: ["Làm công tác tư tưởng", "Quy trình làm việc", "Nguyên tắc làm việc"],
      icon: <GroupIcon className="w-6 h-6" />,
    },
    {
      step: 2,
      title: "Khảo sát hiện trạng / Thu thập dữ liệu / Tư vấn định hướng thiết kế",
      description: "Phân tích hiện trạng và định hướng thiết kế",
      details: ["Thu thập tất cả dữ liệu đầu vào gồm phong cách, công năng, các yếu tốc cầu khác"],
      icon: <LocationOnIcon className="w-6 h-6" />,
    },
    {
      step: 3,
      title: "Phác thảo view mẫu",
      description: "Phác thảo view mẫu bằng",
      details: ["Phác thảo view mặt bằng"],
      icon: <PaletteIcon className="w-6 h-6" />,
    },
    {
      step: 4,
      title: 'Lên phương án concept "view mẫu" 3D',
      description: "Phát triển ý tưởng để hình thành bản thiết kế hoàn thiện sử dụng công nghệ AI",
      details: ['Phác thảo view 3D kiến trúc (chọn view "ăn tiền" nhất)', "Ứng dụng AI để bứt phá tiến độ"],
      icon: <BuildIcon className="w-6 h-6" />,
      isAIStep: true,
    },
    {
      step: 5,
      title: "Chốt hợp đồng thiết kế",
      description: "Hoàn thiện chữ ký quyết định hạn đến thời gian đảm bảo thiết kế",
      details: ["Bước then chốt để quyết định giai đoạn thiết kế tiếp theo"],
      icon: <HandshakeIcon className="w-6 h-6" />,
    },
    {
      step: 6,
      title: "Đông bộ hóa các bản vẽ Mặt bằng, mặt đứng, mặt cắt",
      description: "kết hợp ống đến phần kỹ thuật tính đến của chất",
      details: ["Kết hợp đồng bộ bản vẽ kết cấu, điện nước, nội thất"],
      icon: <DescriptionIcon className="w-6 h-6" />,
    },
    {
      step: 7,
      title: "Báo vệ phương án",
      description: "đánh giá thiết kế cơ nguyệt trở thành tồng gửi kim thiết kế quy thiết kế thiết tính từ một",
      details: ["Do bộ phận quản lý đảm nhiệm, nhằm bảo vệ thàng quả làm việc các bước trước đó", "Cần kiến thức sâu, giàu kinh nghiệm đàm phán"],
      icon: <CheckCircleIcon className="w-6 h-6" />,
    },
    {
      step: 8,
      title: "Dựng 3D động toại (market bố cục đồng loạt)",
      description: "Tạo mô hình 3D động và hoàn thiện",
      details: ["Cover lại từ bố cục concept đã được duyệt", "Bổ sung một số ý cần thiết (dưới 10%)"],
      icon: <BuildIcon className="w-6 h-6" />,
    },
    {
      step: 9,
      title: "Tổng Defect bố cục",
      description: "đỏ ảnh nhận các điểm lỗi",
      details: ["Do bộ phận quản lý đảm nhiệm"],
      icon: <CheckCircleIcon className="w-6 h-6" />,
    },
    {
      step: 10,
      title: "Render đông loạt",
      description: "ánh đỏ nhận hưởng chất thiết kế",
      details: ["Do bộ phận kỹ thuật đảm nhiệm"],
      icon: <PaletteIcon className="w-6 h-6" />,
    },
    {
      step: 11,
      title: "Triển khai bản vẽ kỹ thuật thi công",
      description: "đỏ đảnh hũy nhận thiết kế",
      details: ["Do bộ phận kỹ thuật đảm nhiệm"],
      icon: <FolderOpenIcon className="w-6 h-6" />,
    },
    {
      step: 12,
      title: "Tổng duyệt và bàn giao hồ sơ",
      description: "ánh và nhận kỹ điểm nhận",
      details: ["Do bộ phận quản lý đảm nhiệm"],
      icon: <CheckCircleIcon className="w-6 h-6" />,
    },
  ]

  // Các công cụ và ứng dụng AI được sử dụng (theo sơ đồ)
  const aiTools = [
    {
      id: "ai-architecture",
      title: "AI - KIẾN TRÚC",
      description: "Trung tâm công nghệ AI",
      details: ["Hệ thống AI chính", "Quản lý toàn bộ quy trình"],
      isCenter: true,
    },
    {
      id: "advantages",
      title: "Ưu việt",
      description: "Các ưu điểm vượt trội của AI trong thiết kế",
      details: [
        "NÓI KHÔNG với máy tính cấu hình cao, các thiết bị đắt tiền",
        "NÓI KHÔNG với những thao tác cài đặt phức tạp",
        "VỨT SỌT RÁC đống code như màng nhện rắc rối khó hiểu",
        "BỨT PHÁ tiến độ thiết kế",
        "ĐỘT PHÁ khối lượng concept",
        "CHINH PHỤC khách hàng"
      ],
    },
    {
      id: "applications",
      title: "Ứng dụng",
      description: "Phần mềm và công cụ",
      details: [
        "Remake bố cục vật liệu kiến trúc từ hình concept 3D đã có.",
        'Làm bố cục vật liệu từ sketch, render theo một phong cách "đã được tạo sẵn" (lora)',
        "Thỏa mãn đam mê, luyện tay nghề kiến trúc",
        "Tạo sản phẩm mẫu (quảng bá, truyền thông)"
      ],
    },
    {
      id: "conditions",
      title: "Điều kiện",
      description: "Yêu cầu hệ thống",
      details: [
        "Smart phone đă đăng nhập Google",
        'Sẵn sàng "tốc ký" những nội dung quan trọng',
        '"Tư duy mở" & Khả năng cảm nhận'
      ],
    },
    {
      id: "operations",
      title: "Thao tác", 
      description: "Các thao tác chính",
      details: [
        "Tải hình ảnh đầu vào / chế độ controlnet",
        "Xác định chủ thể kiến trúc, phân tích thành phần kiến trúc",
        "Chạy ứng dụng / nhận sản phẩm",
        "Chuẩn bị model, promt, lora"
      ],
    },
    {
      id: "thinking",
      title: "NGHĨ KHÁC LÀM KHÁC",
      description: "Triết lý và phương pháp làm việc đột phá",
      details: [
        "Xác định mục tiêu: học để ứng dụng.  Loại bỏ những mục tiêu lan man",
        "Dám loại bỏ những thứ không cần thiết", 
        "Kế thừa tinh hoa các cao thủ",
        "Tư duy ngược: làm rồi học (Tư duy truyền thống: học rồi làm)",
        "Trên đời không ai có thể tự mình làm mọi việc. Tìm cộng sự khi cần (Team work is dream work)"
      ],
    },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.palette.background.default }}>
      {/* Hero Section */}
      <Box
        sx={{
          color: 'white',
          pt: { xs: 16, md: 20 },
          pb: { xs: 6, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'url(/banner/banner_home.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(10, 24, 61, 0.75)',
            zIndex: 1
          }
        }}
      >
        <Box sx={{ px: 6 }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              justifyContent: 'center',
              height: '100%',
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                mb: 3,
                fontFamily: '"Poppins", "Segoe UI", sans-serif',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                lineHeight: 1.2,
                color: 'white',
                textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
              }}
            >
              Tư Vấn Và Thiết Kế
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                color: 'white',
                fontWeight: 700,
                lineHeight: 1.6,
                textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
                width: '75%',
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Đội ngũ kiến trúc sư và kỹ sư giàu kinh nghiệm sẽ biến ý tưởng của bạn thành hiện thực với những thiết kế độc đáo và chức năng
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  boxShadow: 2,
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                    color: 'white',
                  }
                }}
              >
                Bắt đầu tư vấn
              </Button>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  boxShadow: 2,
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                    color: 'white',
                  }
                }}
              >
                Xem portfolio
              </Button>
            </Stack>
          </Box>
        </Container>

        </Box>
      </Box>
      {/* Header Section */}
      {/* <section>
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <Typography
            variant="h2"
            className="text-4xl font-bold text-center mb-6 text-gray-800"
          >
            {t('designConsulting.title')}
            <span style={{ color: theme.palette.primary.main }}> {t('designConsulting.titleHighlight')}</span>
          </Typography>
          <Typography
            variant="h6"
            className="text-center text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed"
          >
            {t('designConsulting.subtitle')}
          </Typography>
        </div>
      </section> */}

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
                      className="w-full h-60 md:h-80 rounded-2xl overflow-hidden shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${theme.palette.grey[100]} 0%, ${theme.palette.primary.main}20 100%)`
                      }}
                    >
                      {section.image ? (
                        <Image 
                          src={section.image}
                          alt={section.title}
                          width={800}
                          height={320}
                          className="object-cover w-full h-full"
                          style={{
                            filter: 'brightness(0.9) contrast(1.1)'
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div 
                            className="text-6xl"
                            style={{ color: `${theme.palette.primary.main}50` }}
                          >
                            {section.icon}
                          </div>
                        </div>
                      )}
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
              Quy Trình Thiết Kế Kiến Trúc
            </h2>
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: theme.palette.secondary.light }}
            >
              Nhanh, Chuẩn, Đẹp
            </h2>
            {/* <p 
              className="text-xl max-w-3xl mx-auto"
              style={{ color: theme.palette.text.secondary }}
            >
              Quy trình thiết kế hiện đại với công nghệ AI và 12 bước được tối ưu hóa để mang lại kết quả tốt nhất
            </p> */}
          </div>

          {/* 12 Steps Card Layout */}
          <div className="fade-in-up">
            <div
              className="relative p-12 rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}05 0%, ${theme.palette.primary.main}10 100%)`,
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3
                    className="text-3xl font-bold mb-4"
                    style={{ color: theme.palette.primary.main }}
                  >
                    Quy Trình Chi Tiết Từng Bước
                  </h3>
                  <p
                    className="text-lg"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    Mỗi bước trong quy trình đều được tối ưu hóa để mang lại kết quả tốt nhất
                  </p>
                </div>
                <a
                  href="/Đề%20cương%20-%20AI%20KIẾN%20TRÚC%20280823.pdf"
                  download
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all duration-300 shadow-sm border"
                  style={{
                    backgroundColor: `${theme.palette.secondary.dark}20`,
                    borderColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.main,
                    textDecoration: 'none'
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                  Tải xuống
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aiDesignProcess.map((step, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      // If step 4 (index 3), scroll to AI Tools section
                      if (index === 3) {
                        setTimeout(() => scrollToAITools(), 300)
                      }
                    }}
                    className={`p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300 ${
                      index === 3 ? 'cursor-pointer hover:scale-105' : ''
                    }`}
                    style={{
                      boxShadow: index === 3 ? `0 8px 25px ${theme.palette.secondary.light}20` : 'none'
                    }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                        style={{ 
                          backgroundColor: index === 3 ? theme.palette.secondary.light : theme.palette.primary.main 
                        }}
                      >
                        {step.step}
                      </div>
                      {index !== 3 && (
                        <div
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: index === 3 ? `${theme.palette.primary.main}15` : `${theme.palette.primary.main}15`,
                          color: index === 3 ? theme.palette.primary.main : theme.palette.primary.main
                        }}
                      >
                        {step.icon}
                      </div>
                      )
                      }
                      {index === 3 && (
                        <div
                          className="px-3 py-1 rounded-full text-xs font-semibold animate-pulse flex items-center gap-2"
                          style={{
                            backgroundColor: `${theme.palette.primary.main}20`,
                            color: theme.palette.primary.main
                          }}
                        >
                          <Image
                            src="https://cdn.fchat.vn/assets/img/chat.9a86eb64.svg"
                            alt="AI Technology"
                            width={20}
                            height={20}
                            style={{ display: 'inline-block' }}
                          />
                          Sử dụng AI
                        </div>
                      )}
                    </div>
                    
                    <h4
                      className="font-semibold mb-2 text-sm leading-tight"
                      style={{ color: theme.palette.text.primary }}
                    >
                      {step.title}
                    </h4>
                    
                    {/* <p
                      className="text-xs mb-3 leading-relaxed"
                      style={{ color: theme.palette.text.secondary }}
                    >
                      {step.description}
                    </p> */}

                    {step.details && (
                      <div className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start gap-2">
                            <div
                              className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                              style={{ 
                                backgroundColor: index === 3 ? theme.palette.primary.main : theme.palette.primary.main 
                              }}
                            ></div>
                            <span
                              className="text-xs"
                              style={{ color: theme.palette.text.secondary }}
                            >
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {index === 3 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div
                          className="text-xs font-medium text-center animate-bounce"
                          style={{ color: theme.palette.primary.main }}
                        >
                          👆 Click để xem công nghệ AI
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tools and Applications Section */}
      <section ref={aiToolsRef} className="py-24 px-6" style={{ backgroundColor: `${theme.palette.grey[50]}` }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 fade-in-up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h2 
                className="text-4xl md:text-5xl font-bold"
                style={{ color: theme.palette.primary.main }}
              >
                Công Nghệ & Ứng Dụng AI
              </h2>
            </div>
            <p 
              className="text-xl max-w-3xl mx-auto mb-4"
              style={{ color: theme.palette.text.secondary }}
            >
              Hệ thống AI tiên tiến được sử dụng trong bước 4 để tối ưu hóa quy trình thiết kế
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left side - Circular AI Tools */}
            <div className="lg:col-span-2 relative flex items-center justify-center min-h-[750px]">
              {/* Central Hub - Dynamic Content Display */}
              <div 
                className="relative z-20 w-96 h-96 rounded-full shadow-2xl flex flex-col items-center justify-center p-8 transition-all duration-700"
                style={{
                  background: `radial-gradient(circle at center, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}10 50%, ${theme.palette.primary.main}15 100%)`,
                  border: `3px solid ${theme.palette.primary.main}`,
                  boxShadow: `0 0 40px ${theme.palette.primary.main}40, inset 0 0 30px ${theme.palette.primary.main}10`
                }}
              >
                <div className="text-center min-h-[300px] flex flex-col justify-center">
                  {activeAITool !== null && aiTools.filter(tool => !tool.isCenter)[activeAITool] ? (
                    // Display selected AI Tool content in center circle
                    <div key={`center-ai-tool-${activeAITool}`} className="transition-opacity duration-300">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3 mx-auto"
                        style={{ backgroundColor: theme.palette.primary.main }}
                      >
                        {activeAITool + 1}
                      </div>
                      <h3
                        className="text-2xl font-bold mb-3 leading-tight"
                        style={{ color: theme.palette.primary.main }}
                      >
                        {aiTools.filter(tool => !tool.isCenter)[activeAITool].title}
                      </h3>
                      <p 
                        className="text-sm leading-relaxed px-2"
                        style={{ color: theme.palette.text.secondary }}
                      >
                        {aiTools.filter(tool => !tool.isCenter)[activeAITool].description}
                      </p>
                    </div>
                  ) : (
                    // Default content when no tool is selected
                    <div key="default-center-content" className="transition-opacity duration-300">
                      <h3
                        className="text-3xl font-bold mb-3"
                        style={{ color: theme.palette.primary.main }}
                      >
                        Bước 4
                      </h3>
                      <h4
                        className="text-lg font-semibold mb-4"
                        style={{ color: theme.palette.text.primary }}
                      >
                        Lấy chương đối concept<br/>&apos;View mẫu&apos; 3D
                      </h4>
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ color: theme.palette.text.secondary }}
                      >
                        Phát triển ý tưởng để hình thành bản thiết kế hoàn thiện sử dụng công nghệ AI
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Surrounding AI Tools - Circular Arrangement */}
              {aiTools.filter(tool => !tool.isCenter).map((tool, index) => {
                const angle = (index * 360) / aiTools.filter(tool => !tool.isCenter).length - 90
                const radius = 320
                const x = Math.cos((angle * Math.PI) / 180) * radius
                const y = Math.sin((angle * Math.PI) / 180) * radius

                const isActive = activeAITool !== null && index === activeAITool

                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      console.log('Clicked tool:', index, tool.title)
                      setActiveAITool(index)
                    }}
                    className="absolute w-20 h-20 rounded-full border-3 transition-all duration-500 hover:scale-110 flex items-center justify-center"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                      zIndex: 30,
                      backgroundColor: isActive 
                        ? theme.palette.primary.main 
                        : theme.palette.background.paper,
                      color: isActive 
                        ? 'white'
                        : theme.palette.primary.main,
                      borderColor: isActive 
                        ? theme.palette.primary.main
                        : theme.palette.primary.main,
                      borderWidth: '3px',
                      boxShadow: isActive 
                        ? `0 8px 25px ${theme.palette.primary.main}50, 0 0 15px ${theme.palette.primary.main}30` 
                        : `0 4px 15px rgba(0,0,0,0.1)`,
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}
                  >
                    {index + 1}
                  </button>
                )
              })}

              {/* Connecting Circle */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                <circle
                  cx="50%"
                  cy="50%"
                  r="320"
                  fill="none"
                  stroke={theme.palette.divider}
                  strokeWidth="2"
                  strokeDasharray="10,5"
                  className="opacity-40"
                />
                
                <circle
                  cx="50%"
                  cy="50%"
                  r="320"
                  fill="none"
                  stroke={theme.palette.primary.main}
                  strokeWidth="4"
                  strokeDasharray={activeAITool !== null ? `${(activeAITool + 1) * (2010 / aiTools.filter(tool => !tool.isCenter).length)}, 2010` : '0, 2010'}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                  style={{
                    transform: "rotate(-90deg)",
                    transformOrigin: "50% 50%",
                    filter: `drop-shadow(0 0 8px ${theme.palette.primary.main}40)`
                  }}
                />
                
                <circle
                  cx="50%"
                  cy="50%"
                  r="200"
                  fill="none"
                  stroke={`${theme.palette.primary.main}20`}
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  className="opacity-60 animate-pulse"
                />
              </svg>

              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-full opacity-20 animate-pulse"
                style={{
                  background: `radial-gradient(circle at center, ${theme.palette.primary.main}30 0%, transparent 70%)`,
                  filter: 'blur(20px)',
                  zIndex: 0
                }}
              ></div>
            </div>

            {/* Right side - Content Display Panel */}
            <div className="lg:col-span-1 mt-12">
              <div
                className="rounded-2xl p-8 min-h-[500px] shadow-lg border"
                style={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider
                }}
              >
                {activeAITool !== null && aiTools.filter(tool => !tool.isCenter)[activeAITool] ? (
                  <div key={`ai-tool-${activeAITool}`} className="transition-opacity duration-300">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto"
                      style={{ backgroundColor: theme.palette.primary.main }}
                    >
                      {activeAITool + 1}
                    </div>
                    
                    <h3
                      className="text-2xl font-bold mb-4 text-center"
                      style={{ color: theme.palette.primary.main }}
                    >
                      {aiTools.filter(tool => !tool.isCenter)[activeAITool].title}
                    </h3>
                    
                    <p 
                      className="text-base mb-6 text-center"
                      style={{ color: theme.palette.text.secondary }}
                    >
                      {aiTools.filter(tool => !tool.isCenter)[activeAITool].description}
                    </p>

                    <div className="space-y-3">
                      {aiTools.filter(tool => !tool.isCenter)[activeAITool].details?.map((detail, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: theme.palette.primary.main }}
                          ></div>
                          <span
                            className="text-sm leading-relaxed"
                            style={{ color: theme.palette.text.secondary }}
                          >
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div key="default-content" className="transition-opacity duration-300 text-center">
                    <div className="mb-4 flex items-center justify-center">
                      <Image
                        src="https://cdn.fchat.vn/assets/img/chat.9a86eb64.svg"
                        alt="AI Technology"
                        width={64}
                        height={64}
                        style={{ filter: 'drop-shadow(0 2px 8px #003A6A40)' }}
                      />
                    </div>
                    <h3
                      className="text-2xl font-bold mb-4"
                      style={{ color: theme.palette.primary.main }}
                    >
                      Công Nghệ AI
                    </h3>
                    <p 
                      className="text-base leading-relaxed"
                      style={{ color: theme.palette.text.secondary }}
                    >
                      Click vào các nút số để xem chi tiết từng công nghệ AI được sử dụng trong bước 4 của quy trình thiết kế.
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation Controls - Moved here */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  className="rounded-full border px-4 py-3 transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: theme.palette.divider,
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.paper
                  }}
                  onClick={() => {
                    if (activeAITool === null) {
                      setActiveAITool(aiTools.filter(tool => !tool.isCenter).length - 1)
                    } else if (activeAITool > 0) {
                      setActiveAITool(activeAITool - 1)
                    } else {
                      setActiveAITool(null)
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = theme.palette.primary.main;
                    e.currentTarget.style.color = theme.palette.primary.main;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = theme.palette.divider;
                    e.currentTarget.style.color = theme.palette.text.primary;
                  }}
                >
                  ← Trước
                </button>

                {/* Dot indicators */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveAITool(null)}
                    className="w-3 h-3 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: activeAITool === null ? theme.palette.primary.main : theme.palette.divider,
                      width: activeAITool === null ? '32px' : '12px'
                    }}
                  />
                  
                  {aiTools.filter(tool => !tool.isCenter).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveAITool(index)}
                      className="w-3 h-3 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: activeAITool === index ? theme.palette.primary.main : theme.palette.divider,
                        width: activeAITool === index ? '32px' : '12px'
                      }}
                    />
                  ))}
                </div>

                <button
                  className="rounded-full border px-4 py-3 transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: theme.palette.divider,
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.paper
                  }}
                  onClick={() => {
                    if (activeAITool === null) {
                      setActiveAITool(0)
                    } else if (activeAITool < aiTools.filter(tool => !tool.isCenter).length - 1) {
                      setActiveAITool(activeAITool + 1)
                    } else {
                      setActiveAITool(null)
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = theme.palette.primary.main;
                    e.currentTarget.style.color = theme.palette.primary.main;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = theme.palette.divider;
                    e.currentTarget.style.color = theme.palette.text.primary;
                  }}
                >
                  Tiếp →
                </button>
              </div>

              {/* Progress Information */}
              <div className="text-center mt-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: theme.palette.primary.main }}
                  ></div>
                  <span className="text-sm font-medium text-gray-600">
                    {activeAITool === null ? 'AI Technology Hub' : `AI Tool ${activeAITool + 1}/5`}
                  </span>
                </div>
                {activeAITool !== null && (
                  <div className="w-48 mx-auto bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: theme.palette.primary.main,
                        width: `${((activeAITool + 1) / aiTools.filter(tool => !tool.isCenter).length) * 100}%`
                      }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center fade-in-up">
          <div 
            className="relative rounded-2xl p-12 md:p-16 text-white overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.dark} 100%)`,
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
