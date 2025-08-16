'use client';

import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Architecture,
  Engineering,
  Home,
  Landscape,
} from '@mui/icons-material';
import { useTranslations } from '@/hooks/useTranslations';

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

export default function DesignConsultingPage() {
  useScrollAnimations();
  const theme = useTheme();
  const { t } = useTranslations();

  const designServices = [
    {
      icon: <Architecture sx={{ fontSize: 60 }} />,
      title: t('designConsulting.services.architecture.title') as string,
      description: t('designConsulting.services.architecture.description') as string,
      features: t('designConsulting.services.architecture.features') as string[],
      projects: t('designConsulting.services.architecture.projects') as string,
      specialty: t('designConsulting.services.architecture.specialty') as string
    },
    {
      icon: <Engineering sx={{ fontSize: 60 }} />,
      title: t('designConsulting.services.structural.title') as string,
      description: t('designConsulting.services.structural.description') as string,
      features: t('designConsulting.services.structural.features') as string[],
      projects: t('designConsulting.services.structural.projects') as string,
      specialty: t('designConsulting.services.structural.specialty') as string
    },
    {
      icon: <Home sx={{ fontSize: 60 }} />,
      title: t('designConsulting.services.interior.title') as string,
      description: t('designConsulting.services.interior.description') as string,
      features: t('designConsulting.services.interior.features') as string[],
      projects: t('designConsulting.services.interior.projects') as string,
      specialty: t('designConsulting.services.interior.specialty') as string
    },
    {
      icon: <Landscape sx={{ fontSize: 60 }} />,
      title: t('designConsulting.services.landscape.title') as string,
      description: t('designConsulting.services.landscape.description') as string,
      features: t('designConsulting.services.landscape.features') as string[],
      projects: t('designConsulting.services.landscape.projects') as string,
      specialty: t('designConsulting.services.landscape.specialty') as string
    },
  ];

  return (
    <Box className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Container maxWidth="lg" className="py-16 space-y-20">
        {/* Header Section */}
        <section className="fade-in-on-scroll">
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
        </section>

        {/* Services Grid */}
        <section className="slide-in-left-on-scroll">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {designServices.map((service, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-lg border border-gray-200/50 transition-all duration-700 cursor-pointer zoom-in-on-scroll overflow-hidden"
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
                
                {/* Decorative element */}
                <div 
                  className="absolute top-4 right-4 w-20 h-20 rounded-full group-hover:scale-110 transition-transform duration-500"
                  style={{
                    background: `linear-gradient(to bottom right, ${theme.palette.primary.main}15, ${theme.palette.primary.main}25)`
                  }}
                ></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-start mb-6">
                    <div 
                      className="p-4 rounded-2xl mr-4 transition-all duration-300 group-hover:scale-105 group-hover:rotate-2"
                      style={{
                        background: `linear-gradient(to bottom right, ${theme.palette.primary.main}20, ${theme.palette.primary.main}30)`
                      }}
                    >
                      {service.icon}
                    </div>
                    <div className="flex-grow">
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
                        className="px-3 py-1 rounded-full text-xs font-medium mb-2"
                        style={{
                          background: `${theme.palette.primary.main}12`,
                          color: theme.palette.primary.main
                        }}
                      >
                        {service.projects}
                      </div>
                      <Typography variant="caption" className="text-gray-500 italic">
                        {service.specialty}
                      </Typography>
                    </div>
                  </div>
                  
                  <Typography variant="body1" className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </Typography>
                  
                  <div className="space-y-3 flex-grow">
                    <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
                      {t('designConsulting.servicesInclude')}
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

                  {/* Action Button */}
                  <div className="mt-6 pt-4 border-t border-gray-200/50">
                    <button
                      className="w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.main}25)`,
                        color: theme.palette.primary.main,
                        border: `1px solid ${theme.palette.primary.main}30`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `linear-gradient(135deg, ${theme.palette.primary.main}25, ${theme.palette.primary.main}35)`;
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.main}25)`;
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {t('designConsulting.freeConsulting')}
                    </button>
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
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #10b981 50%, #6366f1 100%)`,
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
									{t('designConsulting.cta.title')}
								</Typography>
								<Typography variant="body1" className="text-white/90 max-w-2xl mx-auto leading-relaxed">
									{t('designConsulting.cta.subtitle')}
								</Typography>
							</div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  className="relative px-8 py-4 bg-white font-bold rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-105"
                  style={{
                    color: theme.palette.primary.main,
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
                  <span className="relative z-10 text-lg">{t('designConsulting.cta.phone')}</span>
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
                  <span className="relative z-10 text-lg">{t('designConsulting.cta.quoteBtn')}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </Box>
  )
}
