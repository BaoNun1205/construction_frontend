'use client';

import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Paper,
  useTheme
} from '@mui/material';
import {
  Build,
  Architecture,
  ContactMail,
  ArrowForward,
  CheckCircle,
  Phone,
  Construction,
  Visibility,
  Assignment,
  Gavel
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Intersection Observer Hook
const useScrollAnimations = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all animation elements
    const animatedElements = document.querySelectorAll(
      '.fade-in-on-scroll, .slide-in-left-on-scroll, .slide-in-right-on-scroll, .zoom-in-on-scroll'
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

export default function Home() {
  const theme = useTheme();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  useScrollAnimations();

  const services = [
    {
      title: 'Dịch vụ thi công',
      description: 'Thi công xây dựng chuyên nghiệp từ nhà ở đến công trình công nghiệp',
      icon: <Build sx={{ fontSize: 30, color: 'white' }} />,
      href: '/services/construction',
      color: theme.palette.primary.main
    },
    {
      title: 'Tư vấn thiết kế',
      description: 'Thiết kế kiến trúc, kết cấu và nội thất theo yêu cầu khách hàng',
      icon: <Architecture sx={{ fontSize: 30, color: 'white' }} />,
      href: '/services/design-consulting',
      color: '#4caf50'
    },
    {
      title: 'Giám sát thi công',
      description: 'Giám sát chất lượng, tiến độ và an toàn trong quá trình thi công',
      icon: <Visibility sx={{ fontSize: 30, color: 'white' }} />,
      href: '/services/supervision',
      color: theme.palette.secondary.main
    },
    {
      title: 'Tư vấn quản lý dự án',
      description: 'Quản lý dự án chuyên nghiệp từ lập kế hoạch đến bàn giao',
      icon: <Assignment sx={{ fontSize: 30, color: 'white' }} />,
      href: '/services/project-management',
      color: '#9c27b0'
    },
    {
      title: 'Tư vấn đấu thầu',
      description: 'Hỗ trợ lập hồ sơ mời thầu và tư vấn lựa chọn nhà thầu',
      icon: <Gavel sx={{ fontSize: 30, color: 'white' }} />,
      href: '/services/bidding-consulting',
      color: '#ff5722'
    }
  ];

  const projects = [
    {
      title: 'Thi công phần thô và hoàn thiện mặt ngoài Shophouse và Hạ Tầng Kỹ Thuật – Long An.',
      description: 'Thi công phần thô và hoàn thiện mặt ngoài Shophouse, kết hợp xây dựng hạ tầng kỹ thuật đồng bộ, đảm bảo tiến độ và chất lượng.',
      image: '/products/Shophouse.jpg',
      status: 'Hoàn thành',
      area: '25/08/2022'
    },
    {
      title: 'Thi công nhà biệt thự – Long An',
      description: 'Xây dựng biệt thự cao cấp 2 tầng với kiến trúc hiện đại, không gian sang trọng và sân vườn thoáng đãng.',
      image: '/products/biet-thu.jpg',
      status: 'Hoàn thành',
      area: '27/05/2023'
    },
    {
      title: 'Thi công cải tạo căn hộ chung cư – Trung Sơn',
      description: 'Cải tạo và nâng cấp căn hộ chung cư theo phong cách hiện đại, tối ưu công năng và tăng tính thẩm mỹ.',
      image: '/products/trung-son.jpg',
      status: 'Hoàn thành',
      area: '27/07/2023'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          color: 'white',
          pt: { xs: 12, md: 20 },
          pb: { xs: 2, md: 4 },
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'url(/banner/banner-home3.png)',
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
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="slide-in-left-on-scroll">
              <Typography
                variant="h1"
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
                LAI PHÁT
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  mb: 4,
                  color: 'white',
                  fontWeight: 700,
                  lineHeight: 1.6,
                  textShadow: '1px 1px 4px rgba(0,0,0,0.5)'
                }}
              >
                Đối tác tin cậy trong mọi dự án xây dựng của bạn. <br />
                Chất lượng - Uy tín - Chuyên nghiệp
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  component={Link}
                  href="/contact"
                  sx={{
                    backgroundColor: '#e42222',
                    color: 'white',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: '#c41e1e',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  Liên hệ ngay
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Phone />}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'white'
                    }
                  }}
                >
                  0939 927 975
                </Button>
              </Stack>
            </div>
            <div className="slide-in-right-on-scroll">
              <Box
                sx={{
                  height: { xs: 300, md: 400 },
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Image
                  src="/banner/banner.jpg"
                  alt="Banner"
                  fill
                  style={{
                    objectFit: 'cover'
                  }}
                />
              </Box>
            </div>
          </div>
          
          {/* Scroll Down Icon */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mt: 4,
              animation: 'bounce 2s infinite'
            }}
          >
            <Box 
              component="div"
              onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
              sx={{ 
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                opacity: 0.7,
                '&:hover': { opacity: 1 }
              }}
            >
              <Typography variant="body2" sx={{ mb: 1, color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                Cuộn xuống để xem thêm
              </Typography>
              <Box sx={{ 
                width: 30, 
                height: 30, 
                border: '2px solid', 
                borderColor: 'white',
                borderRadius: '15px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                pt: 0.5
              }}>
                <Box sx={{ 
                  width: 4, 
                  height: 6, 
                  backgroundColor: 'white',
                  borderRadius: 2,
                  animation: 'scroll 1.5s infinite'
                }} />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Animated Divider */}
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <Box 
              sx={{ 
                flex: 1, 
                height: '2px',
                background: 'linear-gradient(to right, transparent, #1976d2, transparent)',
                animation: 'shimmer 2s infinite'
              }} 
            />
            <Box 
              sx={{ 
                mx: 3,
                p: 2,
                borderRadius: '50%',
                backgroundColor: 'white',
                boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
                animation: 'float 3s ease-in-out infinite'
              }}
            >
              <Construction 
                sx={{ 
                  fontSize: 40, 
                  color: '#1976d2',
                  animation: 'rotate 4s linear infinite'
                }} 
              />
            </Box>
            <Box 
              sx={{ 
                flex: 1, 
                height: '2px',
                background: 'linear-gradient(to left, transparent, #1976d2, transparent)',
                animation: 'shimmer 2s infinite reverse'
              }} 
            />
          </Box>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ color: 'black', py: 10 }}>
        <Container maxWidth="lg">
          {/* Main Container with Border */}
          <Box
            sx={{
              border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: 4,
              p: 6
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="slide-in-left-on-scroll">
                <Typography 
                  variant="h2" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', md: '3rem' },
                    lineHeight: 1.2,
                    mb: 4,
                    color: 'black'
                  }}
                >
                  Phát triển ngành xây dựng của bạn
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: 'text.secondary',
                    mb: 6,
                    maxWidth: 500
                  }}
                >
                  Từ thi công dân dụng đến công nghiệp, kiến thức chuyên sâu về ngành giúp chúng tôi xây dựng những giải pháp phù hợp với nhu cầu hiện tại và tương lai của dự án.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  component={Link}
                  href="/services"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    }
                  }}
                >
                  Khám phá dịch vụ của chúng tôi
                </Button>
              </div>

              {/* Right Services Cards */}
              <div className="slide-in-right-on-scroll" style={{ position: 'relative' }}>
                <Box
                  className="scroll-container"
                  onScroll={(e) => {
                    const target = e.target as HTMLElement;
                    const isScrolledToBottom = 
                      target.scrollHeight - target.scrollTop <= target.clientHeight + 10;
                    setShowScrollIndicator(!isScrolledToBottom);
                  }}
                  onWheel={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    const { deltaY } = e;
                    const { scrollTop, scrollHeight, clientHeight } = target;
                    
                    // If scrolling down and at bottom, prevent default
                    if (deltaY > 0 && scrollTop + clientHeight >= scrollHeight - 1) {
                      e.preventDefault();
                      e.stopPropagation();
                      return;
                    }
                    
                    // If scrolling up and at top, prevent default  
                    if (deltaY < 0 && scrollTop <= 0) {
                      e.preventDefault();
                      e.stopPropagation();
                      return;
                    }
                  }}
                  sx={{
                    height: 400,
                    position: 'relative',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    overscrollBehavior: 'contain', // Ngăn chặn scroll chain
                    scrollBehavior: 'auto', // Tắt built-in smooth để tránh conflict
                    // Hide scrollbar
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE and Edge
                    '&::-webkit-scrollbar': {
                      display: 'none', // Chrome, Safari, Opera
                    },
                    // Fade effects
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '20px',
                      background: 'linear-gradient(to bottom, white 0%, transparent 100%)',
                      zIndex: 1,
                      pointerEvents: 'none',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '20px',
                      background: 'linear-gradient(to top, white 0%, transparent 100%)',
                      zIndex: 1,
                      pointerEvents: 'none',
                    },
                  }}
                >
                  <div className="space-y-3 pr-2">
                    {services.map((service, index) => (
                      <div
                        key={index}
                      >
                        <Box
                          component={Link}
                          href={service.href}
                          sx={{
                            p: 3,
                            backgroundColor: 'white',
                            border: '1px solid #e0e0e0',
                            borderRadius: 3,
                            textDecoration: 'none',
                            color: 'black',
                            transition: 'all 0.3s ease-in-out',
                            display: 'block',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            position: 'relative',
                            '&:hover': {
                              transform: 'translateX(8px)',
                              // borderColor: theme.palette.primary.main,
                              zIndex: 2,
                            }
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Box
                              sx={{
                                p: 1.5,
                                borderRadius: 2,
                                backgroundColor: service.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: 50,
                                height: 50,
                                boxShadow: `0 4px 12px ${service.color}40`
                              }}
                            >
                              {service.icon}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  fontWeight: 700,
                                  mb: 0.5,
                                  color: 'black',
                                  fontSize: '1.1rem'
                                }}
                              >
                                {service.title}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: 'text.secondary',
                                  lineHeight: 1.4,
                                  fontSize: '0.85rem'
                                }}
                              >
                                {service.description}
                              </Typography>
                            </Box>
                            <ArrowForward sx={{ color: 'text.secondary', ml: 1, fontSize: 20 }} />
                          </Box>
                        </Box>
                      </div>
                    ))}
                  </div>
                </Box>

                {/* Scroll Indicator - Mouse Effect */}
                {showScrollIndicator && (
                  <Box
                    sx={{
                      position: 'absolute',
                      right: -35,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      zIndex: 2,
                      opacity: 0.7,
                      '&:hover': { opacity: 1 }
                    }}
                  >
                    {/* Mouse Container */}
                    <Box 
                      sx={{ 
                        width: 22, 
                        height: 35, 
                        border: '2px solid', 
                        borderColor: theme.palette.primary.main,
                        borderRadius: '12px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        pt: 0.8
                      }}
                    >
                      {/* Mouse Wheel */}
                      <Box sx={{ 
                        width: 3, 
                        height: 6, 
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 2,
                        animation: 'scroll 1.5s infinite'
                      }} />
                    </Box>
                  </Box>
                )}
              </div>
            </div>
          </Box>
        </Container>
      </Box>

      {/* Animated Divider */}
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <Box 
              sx={{ 
                flex: 1, 
                height: '2px',
                background: 'linear-gradient(to right, transparent, #ff9800, transparent)',
                animation: 'shimmer 2s infinite'
              }} 
            />
            <Box 
              sx={{ 
                mx: 3,
                p: 2,
                borderRadius: '50%',
                backgroundColor: 'white',
                boxShadow: '0 4px 20px rgba(255, 152, 0, 0.3)',
                animation: 'float 3s ease-in-out infinite reverse'
              }}
            >
              <Architecture 
                sx={{ 
                  fontSize: 40, 
                  color: '#ff9800',
                  animation: 'pulse 2s ease-in-out infinite'
                }} 
              />
            </Box>
            <Box 
              sx={{ 
                flex: 1, 
                height: '2px',
                background: 'linear-gradient(to left, transparent, #ff9800, transparent)',
                animation: 'shimmer 2s infinite reverse'
              }} 
            />
          </Box>
        </Container>
      </Box>

      {/* Projects Section */}
      <Box sx={{ backgroundColor: theme.palette.grey[50], py: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6} className="fade-in-on-scroll">
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Dự án tiêu biểu
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Những công trình đã hoàn thành với chất lượng xuất sắc
            </Typography>
          </Box>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className={`slide-in-left-on-scroll animate-delay-${index + 1}`}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    sx={{ height: 200, position: 'relative', overflow: 'hidden' }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      style={{
                        objectFit: 'cover'
                      }}
                    />
                  </CardMedia>
                  <CardContent>
                    <Stack direction="row" spacing={1} mb={1}>
                      <Chip
                        label={project.status}
                        size="small"
                        color={project.status === 'Hoàn thành' ? 'success' : 'warning'}
                        icon={<CheckCircle />}
                      />
                      <Chip label={project.area} size="small" variant="outlined" />
                    </Stack>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.description}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          elevation={0}
          className="zoom-in-on-scroll"
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            color: 'white',
            p: 6,
            textAlign: 'center',
            borderRadius: 3
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
            Sẵn sàng bắt đầu dự án?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/contact"
              startIcon={<ContactMail />}
              sx={{
                backgroundColor: 'white',
                color: theme.palette.primary.main,
                fontWeight: 600,
                px: 4,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }
              }}
            >
              Tư vấn miễn phí
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              href="/services"
              sx={{
                borderColor: 'white',
                color: 'white',
                fontWeight: 600,
                px: 4,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Xem dịch vụ
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
