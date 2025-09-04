'use client';

import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useTheme,
  Tooltip
} from '@mui/material';
import {
  Build,
  ArrowForward,
  Construction,
  ArrowBackIos,
  ArrowForwardIos,
  BuildOutlined,
  ArchitectureOutlined,
  VisibilityOutlined,
  AssignmentOutlined,
  GavelOutlined,
  HandshakeOutlined,
  ConstructionOutlined,
  VerifiedUserOutlined,
  GroupOutlined
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import ProjectHelpers from '@/utils/projectHelpers';
import useScrollAnimations from '@/hooks/useScrollAnimations';
import PhoneButton from '@/components/ui/PhoneButton';
import ImageMarquee from '@/components/ui/ImageMarquee';
import { useFeaturedProjects } from '@/hooks/useProjects';

export default function Home() {
  const theme = useTheme();
  const { t: tRaw } = useTranslations();
  // Type-safe wrapper for translation function
  const t = (key: string): string => tRaw(key) as string;

  const { data, isLoading, error } = useFeaturedProjects()
  const projects = (data || []).map(project => ProjectHelpers.transformForHomePage(project));

  useScrollAnimations(undefined, undefined, undefined, [projects]);

  // Component for project title with fixed height and tooltip
  const ProjectTitle = ({ title }: { title: string }) => {
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
      // Check if text would overflow beyond 2 lines
      const tempDiv = document.createElement('div');
      tempDiv.style.cssText = `
        position: absolute;
        visibility: hidden;
        width: 256px;
        font-size: 20px;
        font-weight: bold;
        line-height: 1.5;
        font-family: inherit;
      `;
      tempDiv.textContent = title;
      document.body.appendChild(tempDiv);
      
      const height = tempDiv.offsetHeight;
      const lineHeight = 30; // 20px font-size * 1.5 line-height
      const maxHeight = lineHeight * 2; // 2 lines
      
      setIsOverflowing(height > maxHeight);
      document.body.removeChild(tempDiv);
    }, [title]);

    return (
      <Tooltip 
        title={isOverflowing ? title : ""} 
        arrow 
        placement="top"
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              fontSize: '14px',
              maxWidth: '300px',
              whiteSpace: 'normal'
            }
          }
        }}
      >
        <h3 
          className="text-xl font-bold text-gray-800 mb-3 transition-colors duration-300 cursor-default"
          style={{
            height: '60px', // Fixed height for exactly 2 lines (30px * 2)
            lineHeight: '30px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            wordBreak: 'break-word'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = theme.palette.primary.main;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#1f2937';
          }}
        >
          {title}
        </h3>
      </Tooltip>
    );
  };

  const services = [
    {
      title: t('home.services.constructionService'),
      description: t('home.services.constructionDesc'),
      icon: <BuildOutlined sx={{ fontSize: 30, color: theme.palette.action.hover }} />,
      href: '/services/construction',
      color: theme.palette.secondary.light
    },
    {
      title: t('home.services.designConsulting'),
      description: t('home.services.designDesc'),
      icon: <ArchitectureOutlined sx={{ fontSize: 30, color: theme.palette.action.hover }} />,
      href: '/services/design-consulting',
      color: theme.palette.secondary.light
    },
    {
      title: t('home.services.supervision'),
      description: t('home.services.supervisionDesc'),
      icon: <VisibilityOutlined sx={{ fontSize: 30, color: theme.palette.action.hover }} />,
      href: '/services/supervision',
      color: theme.palette.secondary.light
    },
    {
      title: t('home.services.projectManagement'),
      description: t('home.services.projectDesc'),
      icon: <AssignmentOutlined sx={{ fontSize: 30, color: theme.palette.action.hover }} />,
      href: '/services/project-management',
      color: theme.palette.secondary.light
    },
    {
      title: t('home.services.bidding'),
      description: t('home.services.biddingDesc'),
      icon: <GavelOutlined sx={{ fontSize: 30, color: theme.palette.action.hover }} />,
      href: '/services/bidding-consulting',
      color: theme.palette.secondary.light
    }
  ];

  return (
    <Box className="min-h-screen">
      {/* Hero Section */}
      <Box
        sx={{
          color: 'white',
          pt: { xs: 12, md: 20 },
          pb: { xs: 2, md: 4 },
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'url(/banner/banner_home3.png)',
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="slide-in-left">
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
                {t('home.hero.title')}
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
                {t('home.hero.subtitle')} <br />
                {t('home.hero.description')}
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
                  {t('home.hero.contactBtn')}
                </Button>
                <PhoneButton />
              </Stack>
            </div>
            <div className="slide-in-right">
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
                {t('home.hero.scrollDown')}
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

      <Container className="py-16 space-y-20" sx={{ px: 4 }}>
        {/* Animated Divider */}
        <section>
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
                background: `linear-gradient(to right, transparent, ${theme.palette.action.hover}, transparent)`,
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
                  color: theme.palette.action.hover,
                  animation: 'rotate 4s linear infinite'
                }} 
              />
            </Box>
            <Box 
              sx={{ 
                flex: 1, 
                height: '2px',
                background: `linear-gradient(to left, transparent, ${theme.palette.action.hover}, transparent)`,
                animation: 'shimmer 2s infinite reverse'
              }} 
            />
          </Box>
        </section>

        {/* Services Section */}
        <section>
          {/* Main Container with Border */}
          <Box
            sx={{
              border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: 4,
              py: 4,
              pl: 4,
              pr: 6,
              position: 'relative'
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="slide-in-left">
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
                  {t('home.services.title')}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: 'text.secondary',
                    // mb: 6,
                    maxWidth: 500
                  }}
                >
                  {t('home.services.description')}
                </Typography>
              </div>

              {/* Right Services Cards */}
              <div className="slide-in-right" style={{ position: 'relative' }}>
                <Box
                  className="scroll-container"
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
                    height: 350,
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
                    }
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
                            backgroundColor: theme.palette.primary.main,
                            // border: '1px solid #e0e0e0',
                            borderRadius: 3,
                            textDecoration: 'none',
                            color: 'black',
                            transition: 'all 0.3s ease-in-out',
                            display: 'block',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            position: 'relative',
                            '&:hover': {
                              transform: 'translateX(8px)',
                              // borderColor: theme.palette.primary.main
                            }
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Box
                              sx={{
                                p: 1.5,
                                borderRadius: '50%',
                                backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: 64,
                                height: 64,
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
                                  color: 'white',
                                  fontSize: '1.1rem'
                                }}
                              >
                                {service.title}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: 'white',
                                  lineHeight: 1.4,
                                  fontSize: '0.85rem',
                                  display: { xs: 'none', md: 'block' }
                                }}
                              >
                                {service.description}
                              </Typography>
                            </Box>
                            {/* <ArrowForward sx={{ color: 'text.secondary', ml: { xs: 0, md: 1 }, fontSize: 20 }} /> */}
                          </Box>
                        </Box>
                      </div>
                    ))}
                  </div>
                </Box>

                {/* Scroll Indicator - Mouse Effect */}
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
                    '&:hover': { opacity: 1 }
                  }}
                >
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
                    <Box sx={{ 
                      width: 3, 
                      height: 6, 
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 2,
                      animation: 'scroll 1.5s infinite'
                    }} />
                  </Box>
                </Box>
              </div>
            </div>
          </Box>
        </section>

        {/* Projects Section */}
        <section>
          <Box textAlign="center" mb={6} className="fade-in-up">
            <Typography
              variant="h2"
              gutterBottom
              className="font-bold text-center"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700
              }}
            >
              {t('home.projects.title')}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {t('home.projects.subtitle')}
            </Typography>
          </Box>

          {/* Projects Carousel */}
          <div className="relative">
            {/* Left Arrow Button - Hidden on mobile/tablet */}
            <button
              className="absolute -left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center transition-colors duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed hidden lg:flex"
              style={{
                color: '#6b7280',
                transition: 'color 300ms'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.palette.primary.main;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6b7280';
              }}
              onClick={() => {
                const container = document.querySelector('.projects-scroll-container') as HTMLElement;
                if (container) {
                  container.scrollBy({
                    left: -320, // Scroll one card width to the left
                    behavior: 'smooth'
                  });
                }
              }}
              id="scroll-left-btn"
            >
              <ArrowBackIos sx={{ fontSize: 28 }} />
            </button>

            {/* Right Arrow Button - Hidden on mobile/tablet */}
            <button
              className="absolute -right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center transition-colors duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed hidden lg:flex"
              style={{
                color: '#6b7280',
                transition: 'color 300ms'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.palette.primary.main;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6b7280';
              }}
              onClick={() => {
                const container = document.querySelector('.projects-scroll-container') as HTMLElement;
                if (container) {
                  container.scrollBy({
                    left: 320, // Scroll one card width to the right
                    behavior: 'smooth'
                  });
                }
              }}
              id="scroll-right-btn"
            >
              <ArrowForwardIos sx={{ fontSize: 28 }} />
            </button>

            {/* Projects Scroll Container */}
            {isLoading && <div>Đang tải dự án...</div>}
            {error && <div>Lỗi khi tải dự án!</div>}
            {!isLoading && !error && projects.length === 0 && (
              <div>Không có dự án nào!</div>
            )}
            {!isLoading && !error && projects.length > 0 && (
            <div 
              className="projects-scroll-container flex gap-6 overflow-x-auto scrollbar-hide pb-4"
              style={{
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch'
              }}
              onScroll={(e) => {
                const container = e.target as HTMLElement;
                const leftBtn = document.getElementById('scroll-left-btn') as HTMLButtonElement;
                const rightBtn = document.getElementById('scroll-right-btn') as HTMLButtonElement;

                if (leftBtn && rightBtn) {
                  // Disable left button if at start
                  leftBtn.disabled = container.scrollLeft <= 0;
                  
                  // Disable right button if at end
                  const isAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 1;
                  rightBtn.disabled = isAtEnd;
                }
              }}
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-80 slide-in-left animate-delay-${index + 1}`}
                  style={{ scrollSnapAlign: 'start' }}
                >
                  {/* Custom Project Card */}
                  <div
                    className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:transition-all duration-500 h-full"
                  >
                    {/* Card Image */}
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Hover View Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Link
                          href={project.url}
                          className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300"
                        >
                          {t('home.projects.viewDetail')}
                        </Link>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <ProjectTitle title={project.title} />
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-3">
                        {project.description}
                      </p>
                      <p className="text-gray-500 text-xs font-medium mb-4">
                        {project.statusRaw === 'completed' ? t('home.projects.completedOn') : t('home.projects.startedOn')}: {project.duration}
                      </p>

                      {/* Card Footer */}
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div
                          className="flex items-center gap-2 transition-colors duration-200"
                          style={{ color: theme.palette.primary.main }}
                        >
                          <Build sx={{ fontSize: 18 }} />
                          <span className="text-sm font-medium">
                            {project.statusRaw === 'completed' ? t('home.projects.completed') : t('home.projects.inProgress')}
                          </span>
                        </div>
                        <button 
                          className="transition-colors duration-200"
                          style={{ color: theme.palette.primary.main }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = theme.palette.primary.dark || '#1565c0';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = theme.palette.primary.main;
                          }}
                        >
                          <ArrowForward sx={{ fontSize: 20 }} />
                        </button>
                      </div>
                    </div>

                    {/* Card Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div 
                        className="absolute inset-0 rounded-3xl"
                        style={{
                          background: `linear-gradient(to right, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10, ${theme.palette.primary.light}10)`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}

            {/* Scroll Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.ceil(projects.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  className="w-3 h-3 rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor: '#d1d5db'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.palette.primary.main;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#d1d5db';
                  }}
                  onClick={() => {
                    const container = document.querySelector('.projects-scroll-container');
                    if (container) {
                      container.scrollTo({
                        left: index * (320 * 3), // 320px per card width + gap
                        behavior: 'smooth'
                      });
                    }
                  }}
                ></button>
              ))}
            </div>
          </div>
        </section>

        {/* Why choose us? */}
        <section>
          {/* Title outside the background */}
          <Typography
            variant="h2"
            className="font-bold text-center"
            sx={{ 
              marginBottom: '2rem',
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700
            }}
          >
            {t('home.whyChooseUs.title')}
          </Typography>
          
          {/* Background box with 4 columns */}
          <Box 
            sx={{ 
              backgroundColor: theme.palette.primary.main,
              borderRadius: 3
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
              {/* Experience */}
              <div className="scale-in animate-delay-1 border-b border-white md:border-b-0 md:border-r md:border-white md:last:border-r-0">
                <div className="text-center p-6 flex flex-col">
                  <div className="flex justify-center mb-4 flex-shrink-0">
                    <HandshakeOutlined
                      sx={{ fontSize: 60, color: theme.palette.action.active }} 
                    />
                  </div>
                  <Typography variant="h5" className="font-bold mb-4 text-white flex-shrink-0">
                    {t('home.whyChooseUs.experience.title')}
                  </Typography>
                  <div className="flex-1 overflow-y-auto">
                    <Typography variant="body1" className="text-white/90 leading-relaxed">
                      {t('home.whyChooseUs.experience.description')}
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Solution */}
              <div className="scale-in animate-delay-1 border-b border-white md:border-b-0 md:border-r md:border-white md:last:border-r-0">
                <div className="text-center p-6 flex flex-col">
                  <div className="flex justify-center mb-4 flex-shrink-0">
                    <ConstructionOutlined
                      sx={{ fontSize: 60, color: theme.palette.action.active }} 
                    />
                  </div>
                  <Typography variant="h5" className="font-bold mb-4 text-white flex-shrink-0">
                    {t('home.whyChooseUs.solution.title')}
                  </Typography>
                  <div className="flex-1 overflow-y-auto">
                    <Typography variant="body1" className="text-white/90 leading-relaxed">
                      {t('home.whyChooseUs.solution.description')}
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Quality */}
              <div className="scale-in animate-delay-1 border-b border-white md:border-b-0 md:border-r md:border-white md:last:border-r-0">
                <div className="text-center p-6 flex flex-col">
                  <div className="flex justify-center mb-4 flex-shrink-0">
                    <VerifiedUserOutlined
                      sx={{ fontSize: 60, color: theme.palette.action.active }} 
                    />
                  </div>
                  <Typography variant="h5" className="font-bold mb-4 text-white flex-shrink-0">
                    {t('home.whyChooseUs.quality.title')}
                  </Typography>
                  <div className="flex-1 overflow-y-auto">
                    <Typography variant="body1" className="text-white/90 leading-relaxed">
                      {t('home.whyChooseUs.quality.description')}
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Team */}
              <div className="scale-in animate-delay-4">
                <div className="text-center p-6 flex flex-col">
                  <div className="flex justify-center mb-4 flex-shrink-0">
                    <GroupOutlined
                      sx={{ fontSize: 60, color: theme.palette.action.active }} 
                    />
                  </div>
                  <Typography variant="h5" className="font-bold mb-4 text-white flex-shrink-0">
                    {t('home.whyChooseUs.team.title')}
                  </Typography>
                  <div className="flex-1 overflow-y-auto">
                    <Typography variant="body1" className="text-white/90 leading-relaxed">
                      {t('home.whyChooseUs.team.description')}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </section>
      </Container>

      {/* Image Marquee Section */}
      <ImageMarquee
        title='Phát Triển Bền Vững'
      />
    </Box>
  );
}
