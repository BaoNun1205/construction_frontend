"use client"

import { useState, useRef } from "react"
import { useTheme } from "@mui/material/styles"
import Image from "next/image"
import {
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
import useScrollAnimations from "@/hooks/useScrollAnimations"

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
      image: "/design-consulting/ai.jpg",
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
      image: "/design-consulting/superiority.jpg",
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
      image: "/design-consulting/application.jpg",
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
      image: "/design-consulting/condition.jpg",
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
      image: "/design-consulting/process.jpg",
    },
    {
      id: "thinking",
      title: "Nghĩ khác làm khác",
      description: "Triết lý và phương pháp làm việc đột phá",
      details: [
        "Xác định mục tiêu: học để ứng dụng.  Loại bỏ những mục tiêu lan man",
        "Dám loại bỏ những thứ không cần thiết", 
        "Kế thừa tinh hoa các cao thủ",
        "Tư duy ngược: làm rồi học (Tư duy truyền thống: học rồi làm)",
        "Trên đời không ai có thể tự mình làm mọi việc. Tìm cộng sự khi cần (Team work is dream work)"
      ],
      image: "/design-consulting/thinking.jpg",
    },
  ]

  return (
    <Box className="min-h-screen">
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
            backgroundColor: 'rgba(10, 24, 61, 0.5)',
            zIndex: 1
          }
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 2, px: 4 }}>
          <Box
            className="fade-in-on"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
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
                letterSpacing: '0.05em',
                lineHeight: 1.2,
                color: 'white',
                textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
              }}
            >
              Tư Vấn Thiết Kế
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                color: 'white',
                fontWeight: 700,
                lineHeight: 1.6,
                textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
                width: { xs: '100%', md: '50%' },
                textAlign: 'left',
              }}
            >
              Đội ngũ kiến trúc sư và kỹ sư giàu kinh nghiệm sẽ biến ý tưởng của bạn thành hiện thực với những thiết kế độc đáo và chức năng
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ mt: 4, width: '100%' }}
            >
              <Button
                fullWidth
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                  backgroundColor: 'white',
                  color: 'black',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  boxShadow: 2,
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                    color: 'white',
                  },
                }}
              >
                Bắt đầu tư vấn
              </Button>

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                  backgroundColor: 'white',
                  color: 'black',
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  boxShadow: 2,
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.main,
                    color: 'white',
                  },
                }}
              >
                Xem portfolio
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Container className="py-16 space-y-20" sx={{ px: 4 }}>
        {/* Main Sections */}
        <section>
          <div className="mx-auto space-y-20">
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

        <section style={{ backgroundColor: `${theme.palette.grey[50]}` }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 fade-in-on">
              <h2 
                className="text-4xl md:text-5xl font-bold mb-6 fade-in-on"
                style={{ color: theme.palette.primary.main }}
              >
                Quy Trình Thiết Kế Kiến Trúc
              </h2>
              <h2 
                className="text-4xl md:text-5xl font-bold mb-6 fade-in-on"
                style={{ color: theme.palette.secondary.light }}
              >
                Nhanh, Chuẩn, Đẹp
              </h2>
            </div>

            {/* 12 Steps Card Layout */}
            <div className="fade-in-on">
              <div
                className="relative p-6 rounded-2xl overflow-hidden"
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
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = theme.palette.secondary.main;
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = theme.palette.secondary.dark;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = `${theme.palette.secondary.dark}20`;
                      e.currentTarget.style.color = theme.palette.secondary.main;
                      e.currentTarget.style.borderColor = theme.palette.secondary.main;
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                    Tải xuống sơ đồ chi tiết
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
                      className={`group p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300 ${
                        index === 3 ? 'cursor-pointer hover:scale-105' : ''
                      }`}
                      style={{
                        boxShadow: index === 3 ? `0 8px 25px ${theme.palette.secondary.light}20` : 'none'
                      }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
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
                            Tăng tốc bằng AI
                          </div>
                        )}
                      </div>
                      
                      <h4
                        className="font-semibold mb-2 leading-tight"
                        style={{ color: theme.palette.text.primary, fontSize: '1rem' }}
                      >
                        {step.title}
                      </h4>
                      
                      {/* <p
                        className="mb-3 leading-relaxed"
                        style={{ color: theme.palette.text.secondary, fontSize: '0.9rem' }}
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
                                style={{ color: theme.palette.text.secondary, fontSize: '0.9rem' }}
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
        <section ref={aiToolsRef} style={{ backgroundColor: `${theme.palette.grey[50]}` }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 fade-in-on">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              {/* Left side - AI Tools List */}
              <div className="flex flex-col justify-between slide-in-left min-h-[600px] h-[600px]" id="ai-tools-list">
                {aiTools.filter(tool => !tool.isCenter).map((tool, index) => (
                  <div
                    key={tool.id}
                    onClick={() => setActiveAITool(index)}
                    className={`p-6 rounded-xl cursor-pointer transition-all duration-300 border-2 flex-1 ${
                      activeAITool === index 
                        ? 'shadow-lg transform scale-105' 
                        : 'hover:shadow-md hover:transform hover:scale-102'
                    }`}
                    style={{
                      backgroundColor: activeAITool === index 
                        ? `${theme.palette.primary.main}10` 
                        : theme.palette.background.paper,
                      borderColor: activeAITool === index 
                        ? theme.palette.primary.main 
                        : theme.palette.divider,
                      marginBottom: index < aiTools.filter(tool => !tool.isCenter).length - 1 ? '16px' : '0'
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg"
                        style={{ backgroundColor: theme.palette.primary.main }}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3
                          className="text-xl font-bold mb-1"
                          style={{ 
                            color: activeAITool === index 
                              ? theme.palette.primary.main 
                              : theme.palette.text.primary 
                          }}
                        >
                          {tool.title}
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: theme.palette.text.secondary }}
                        >
                          {tool.description}
                        </p>
                      </div>
                      <div className="text-2xl">
                        <ArrowForwardIcon 
                          className={`transition-transform duration-300 ${
                            activeAITool === index ? 'rotate-90' : ''
                          }`}
                          style={{ 
                            color: activeAITool === index 
                              ? theme.palette.primary.main 
                              : theme.palette.text.secondary 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Controls - Centered between two sections */}
              <div className="lg:hidden flex items-center justify-center gap-4 py-6">
                <button
                  className="rounded-full border px-6 py-3 transition-all duration-300 hover:scale-105 font-medium"
                  style={{
                    borderColor: theme.palette.divider,
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.paper
                  }}
                  onClick={() => {
                    if (activeAITool === null || activeAITool === 0) {
                      setActiveAITool(aiTools.filter(tool => !tool.isCenter).length - 1)
                    } else {
                      setActiveAITool(activeAITool - 1)
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

                {/* Progress Indicators */}
                <div className="flex gap-2">
                  {aiTools.filter(tool => !tool.isCenter).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveAITool(index)}
                      className="transition-all duration-300"
                      style={{
                        width: activeAITool === index ? '32px' : '12px',
                        height: '12px',
                        borderRadius: '6px',
                        backgroundColor: activeAITool === index 
                          ? theme.palette.primary.main 
                          : theme.palette.divider
                      }}
                    />
                  ))}
                </div>

                <button
                  className="rounded-full border px-6 py-3 transition-all duration-300 hover:scale-105 font-medium"
                  style={{
                    borderColor: theme.palette.divider,
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.paper
                  }}
                  onClick={() => {
                    if (activeAITool === null || activeAITool === aiTools.filter(tool => !tool.isCenter).length - 1) {
                      setActiveAITool(0)
                    } else {
                      setActiveAITool(activeAITool + 1)
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

              {/* Right side - Content Display */}
              <div className="lg:sticky lg:top-8 slide-in-right min-h-[600px]">
                <Box
                  sx={{
                    borderRadius: '1rem',
                    boxShadow: 3,
                    border: 1,
                    borderColor: 'divider',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '600px',
                    backgroundColor: 'background.paper',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundImage: activeAITool !== null && aiTools.filter(tool => !tool.isCenter)[activeAITool] 
                      ? `url(${aiTools.filter(tool => !tool.isCenter)[activeAITool].image})`
                      : 'url(/design-consulting/ai.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'background-image 0.3s ease-in-out',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(10, 24, 61, 0.85)',
                      zIndex: 1
                    }
                  }}
                >
                  <Box 
                    sx={{
                      position: 'relative',
                      zIndex: 10,
                      p: 3,
                      flex: 1,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%'
                    }}
                  >
                    {activeAITool !== null && aiTools.filter(tool => !tool.isCenter)[activeAITool] ? (
                      <div key={`ai-tool-${activeAITool}`} className="transition-opacity duration-300 flex flex-col h-full">
                        {/* Header - Fixed */}
                        <div className="text-center mb-4 flex-shrink-0">
                          <Box
                            sx={{
                              width: 56,
                              height: 56,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: '1.25rem',
                              mb: 1.5,
                              mx: 'auto',
                              backgroundColor: 'secondary.light'
                            }}
                          >
                            {activeAITool + 1}
                          </Box>
                          
                          <Typography
                            variant="h4"
                            sx={{
                              fontWeight: 'bold',
                              mb: 1.5,
                              color: 'white'
                            }}
                          >
                            {aiTools.filter(tool => !tool.isCenter)[activeAITool].title}
                          </Typography>
                          
                          <Typography 
                            variant="body1"
                            sx={{ color: 'white' }}
                          >
                            {aiTools.filter(tool => !tool.isCenter)[activeAITool].description}
                          </Typography>
                        </div>

                        {/* Chi tiết title - Fixed */}
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 'semibold',
                            mb: 1.5,
                            color: 'white',
                            flexShrink: 0
                          }}
                        >
                          Chi tiết:
                        </Typography>

                        {/* Content - Scrollable */}
                        <Box 
                          sx={{
                            flex: 1,
                            overflowY: 'auto',
                            pr: 1,
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            '&::-webkit-scrollbar': {
                              display: 'none'
                            }
                          }}
                        >
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {aiTools.filter(tool => !tool.isCenter)[activeAITool].details?.map((detail, index) => (
                              <Box 
                                key={index} 
                                sx={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: 1.5,
                                  p: 1.5,
                                  borderRadius: 1
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    mt: 1,
                                    flexShrink: 0,
                                    backgroundColor: 'secondary.light'
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{
                                    lineHeight: 1.6,
                                    color: 'white'
                                  }}
                                >
                                  {detail}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </div>
                    ) : (
                      <Box 
                        key="default-content" 
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          height: '100%'
                        }}
                      >
                        <Box sx={{ mb: 1 }}>
                          <Image
                            src="/design-consulting/chatgpt.png"
                            alt="AI Technology"
                            width={80}
                            height={80}
                            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,58,106,0.3))' }}
                          />
                        </Box>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 'bold',
                            mb: 3,
                            color: 'white',
                          }}
                        >
                          Công Nghệ AI
                        </Typography>
                        <Typography 
                          variant="body1"
                          sx={{
                            lineHeight: 1.6,
                            maxWidth: '400px',
                            mx: 'auto',
                            color: 'white',
                          }}
                        >
                          Chọn một mục bên trái để xem chi tiết từng công nghệ AI được sử dụng trong bước 4 của quy trình thiết kế.
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </div>
            </div>

            {/* Navigation Controls - Responsive */}
            <div className="flex items-center fade-in-on justify-center gap-4 mt-6">
              <button
                className="rounded-full border px-4 md:px-6 py-2 md:py-3 transition-all duration-300 hover:scale-105 font-medium text-sm md:text-base"
                style={{
                  borderColor: theme.palette.divider,
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.background.paper
                }}
                onClick={() => {
                  if (activeAITool === null || activeAITool === 0) {
                    setActiveAITool(aiTools.filter(tool => !tool.isCenter).length - 1)
                  } else {
                    setActiveAITool(activeAITool - 1)
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
                <span className="hidden sm:inline">← Trước</span>
                <span className="sm:hidden">←</span>
              </button>

              {/* Progress Indicators */}
              <div className="flex gap-1 md:gap-2">
                {aiTools.filter(tool => !tool.isCenter).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveAITool(index)}
                    className="transition-all duration-300"
                    style={{
                      width: activeAITool === index ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: activeAITool === index 
                        ? theme.palette.primary.main 
                        : theme.palette.divider
                    }}
                  />
                ))}
              </div>

              <button
                className="rounded-full border px-4 md:px-6 py-2 md:py-3 transition-all duration-300 hover:scale-105 font-medium text-sm md:text-base"
                style={{
                  borderColor: theme.palette.divider,
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.background.paper
                }}
                onClick={() => {
                  if (activeAITool === null || activeAITool === aiTools.filter(tool => !tool.isCenter).length - 1) {
                    setActiveAITool(0)
                  } else {
                    setActiveAITool(activeAITool + 1)
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
                <span className="hidden sm:inline">Tiếp →</span>
                <span className="sm:hidden">→</span>
              </button>
            </div>

            {/* Progress Information */}
            <div className="text-center fade-in-on mt-4">
              <span 
                className="text-sm font-medium"
                style={{ color: theme.palette.text.secondary }}
              >
                {activeAITool === null 
                  ? 'Chọn một mục để xem chi tiết' 
                  : `${activeAITool + 1} / ${aiTools.filter(tool => !tool.isCenter).length}`
                }
              </span>
            </div>
          </div>
        </section>
      </Container>
    </Box>
  )
}
