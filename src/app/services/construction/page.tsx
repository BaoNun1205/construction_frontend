'use client';

import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import {
  HomeWork,
  Business,
  Factory,
  Engineering,
} from '@mui/icons-material';
import { useTranslations } from '@/hooks/useTranslations';
import useScrollAnimations from '@/hooks/useScrollAnimations';

export default function ConstructionPage() {
  useScrollAnimations();
  const theme = useTheme();
  const { t: tRaw } = useTranslations();
  // Type-safe wrapper for translation function
  const t = (key: string): string => tRaw(key) as string;

  const constructionServices = [
    {
      icon: <HomeWork sx={{ fontSize: 60 }} />,
      title: t('construction.services.0.title'),
      description: t('construction.services.0.description'),
      features: [
        t('construction.services.0.features.0'),
        t('construction.services.0.features.1'),
        t('construction.services.0.features.2'),
        t('construction.services.0.features.3')
      ],
      projects: t('construction.services.0.projects'),
    },
    {
      icon: <Business sx={{ fontSize: 60 }} />,
      title: t('construction.services.1.title'),
      description: t('construction.services.1.description'),
      features: [
        t('construction.services.1.features.0'),
        t('construction.services.1.features.1'),
        t('construction.services.1.features.2'),
        t('construction.services.1.features.3')
      ],
      projects: t('construction.services.1.projects'),
    },
    {
      icon: <Factory sx={{ fontSize: 60 }} />,
      title: t('construction.services.2.title'),
      description: t('construction.services.2.description'),
      features: [
        t('construction.services.2.features.0'),
        t('construction.services.2.features.1'),
        t('construction.services.2.features.2'),
        t('construction.services.2.features.3')
      ],
      projects: t('construction.services.2.projects'),
    },
    {
      icon: <Engineering sx={{ fontSize: 60 }} />,
      title: t('construction.services.3.title'),
      description: t('construction.services.3.description'),
      features: [
        t('construction.services.3.features.0'),
        t('construction.services.3.features.1'),
        t('construction.services.3.features.2'),
        t('construction.services.3.features.3')
      ],
      projects: t('construction.services.3.projects'),
    },
  ];

  return (
    <Box className="min-h-screen">
      <Container className="py-16 space-y-20" sx={{ px: { xs: 4, md: 0 } }}>
        {/* Header Section */}
        <section className="fade-in-up">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <Typography
              variant="h2"
              className="text-4xl font-bold text-center text-gray-800"
              sx={{ mb: 3 }}
            >
              {t('construction.title')}
              <span style={{ color: theme.palette.primary.main }}> {t('construction.titleHighlight')}</span>
            </Typography>
            <Typography
              variant="h6"
              className="text-center text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              {t('construction.description')}
            </Typography>
          </div>
        </section>

        {/* Services Grid */}
        <section className="slide-in-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {constructionServices.map((service, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-lg border border-gray-200/50 transition-all duration-700 cursor-pointer scale-in overflow-hidden"
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
                    background: `linear-gradient(to bottom right, ${theme.palette.primary.main}10, ${theme.palette.primary.main}20)`
                  }}
                ></div>
                
                {/* Decorative element */}
                <div 
                  className="absolute top-4 right-4 w-16 h-16 rounded-full group-hover:scale-125 transition-transform duration-500"
                  style={{
                    background: `linear-gradient(to bottom right, ${theme.palette.primary.main}20, ${theme.palette.primary.main}30)`
                  }}
                ></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div 
                      className="p-4 rounded-2xl mr-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        background: `linear-gradient(to bottom right, ${theme.palette.primary.main}15, ${theme.palette.primary.main}25)`
                      }}
                    >
                      {service.icon}
                    </div>
                    <div>
                      <Typography 
                        variant="h5" 
                        className="font-bold text-gray-800 transition-colors duration-300"
                        sx={{
                          mb: 1,
                          '.group:hover &': {
                            color: theme.palette.primary.main
                          }
                        }}
                      >
                        {service.title}
                      </Typography>
                      <div 
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          background: `${theme.palette.primary.main}15`,
                          color: theme.palette.primary.main
                        }}
                      >
                        {service.projects}
                      </div>
                    </div>
                  </div>
                  
                  <Typography
                    variant="body1"
                    className="text-gray-600 leading-relaxed"
                    sx={{ mb: 3 }}
                    >
                    {service.description}
                  </Typography>
                  
                  <div className="space-y-3 flex-grow">
                    <Typography variant="h6" className="font-semibold text-gray-800" sx={{ mb: 1.5 }}>
                      {t('construction.featureTitle')}
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
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </Box>
  )
}
