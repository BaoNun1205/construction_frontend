'use client';

import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import {
  VerifiedUser,
  Timeline,
  Security,
} from '@mui/icons-material';
import { useTranslations } from '@/hooks/useTranslations';
import { CONTACT } from '@/constants/contact';
import useScrollAnimations from '@/hooks/useScrollAnimations';
import CallToAction from '@/components/ui/CallToAction';

export default function SupervisionPage() {
  useScrollAnimations();
  const theme = useTheme();
  const { t } = useTranslations();

  const supervisionServices = [
    {
      icon: <VerifiedUser sx={{ fontSize: 60 }} />,
      title: t('supervision.services.quality.title') as string,
      description: t('supervision.services.quality.description') as string,
      features: t('supervision.services.quality.features') as string[],
      benefits: t('supervision.services.quality.benefits') as string[],
      projects: t('supervision.services.quality.projects') as string
    },
    {
      icon: <Timeline sx={{ fontSize: 60 }} />,
      title: t('supervision.services.schedule.title') as string,
      description: t('supervision.services.schedule.description') as string,
      features: t('supervision.services.schedule.features') as string[],
      benefits: t('supervision.services.schedule.benefits') as string[],
      projects: t('supervision.services.schedule.projects') as string
    },
    {
      icon: <Security sx={{ fontSize: 60 }} />,
      title: t('supervision.services.safety.title') as string,
      description: t('supervision.services.safety.description') as string,
      features: t('supervision.services.safety.features') as string[],
      benefits: t('supervision.services.safety.benefits') as string[],
      projects: t('supervision.services.safety.projects') as string
    },
  ];

  const supervisionProcess = t('supervision.process.steps') as Array<{
    step: string;
    title: string;
    description: string;
  }>;

  return (
    <Box className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Container maxWidth="lg" className="py-16 space-y-20">
        {/* Header Section */}
        <section className="fade-in-up">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <Typography
              variant="h2"
              className="text-4xl font-bold text-center mb-6 text-gray-800"
            >
              {t('supervision.title') as string}
              <span style={{ color: theme.palette.primary.main }}> {t('supervision.titleHighlight') as string}</span>
            </Typography>
            <Typography
              variant="h6"
              className="text-center text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed"
            >
              {t('supervision.subtitle') as string}
            </Typography>
          </div>
        </section>

        {/* Services Grid */}
        <section className="slide-in-left">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {supervisionServices.map((service, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-lg border border-gray-200/50 transition-all duration-700 cursor-pointer scale-in overflow-hidden h-full"
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
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: `${theme.palette.primary.main}12`,
                        color: theme.palette.primary.main
                      }}
                    >
                      {service.projects}
                    </div>
                  </div>
                  
                  <Typography variant="body1" className="text-gray-600 mb-6 leading-relaxed text-center">
                    {service.description}
                  </Typography>
                  
                  <div className="space-y-4 mb-6">
                    <Typography variant="h6" className="font-semibold text-gray-800 text-center">
                      {t('supervision.supervisionContent') as string}
                    </Typography>
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                        <div 
                          className="w-2 h-2 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300 flex-shrink-0"
                          style={{
                            background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.main})`
                          }}
                        ></div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <Typography variant="h6" className="font-semibold text-gray-800 mb-3 text-center">
                      {t('supervision.benefits') as string}
                    </Typography>
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-sm text-green-700 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="slide-in-right">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <Typography variant="h3" className="font-bold text-gray-800 mb-4">
              {t('supervision.process.title') as string}
            </Typography>
            <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto">
              {t('supervision.process.subtitle') as string}
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supervisionProcess.map((process, index) => (
              <div key={index} className="relative">
                <div className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, #10b981)`
                    }}
                  >
                    {process.step}
                  </div>
                  <Typography variant="h6" className="font-bold text-gray-800 mb-2">
                    {process.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {process.description}
                  </Typography>
                </div>
                {index < supervisionProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 w-6 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                )}
              </div>
            ))}
          </div>
        </section>
      </Container>
      <CallToAction />
    </Box>
  )
}
