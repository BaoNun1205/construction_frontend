'use client';

import React from 'react';
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
import { useTranslations } from '@/hooks/useTranslations';
import useScrollAnimations from '@/hooks/useScrollAnimations';

export default function BiddingConsultingPage() {
  useScrollAnimations();
  const theme = useTheme();
  const { t } = useTranslations();

  const biddingServices = [
    {
      icon: <Description sx={{ fontSize: 60 }} />,
      title: t('biddingConsulting.services.documentation.title') as string,
      description: t('biddingConsulting.services.documentation.description') as string,
      features: t('biddingConsulting.services.documentation.features') as string[],
      documents: t('biddingConsulting.services.documentation.documents') as string[],
      experience: t('biddingConsulting.services.documentation.experience') as string,
      success: t('biddingConsulting.services.documentation.success') as string
    },
    {
      icon: <Assessment sx={{ fontSize: 60 }} />,
      title: t('biddingConsulting.services.evaluation.title') as string,
      description: t('biddingConsulting.services.evaluation.description') as string,
      features: t('biddingConsulting.services.evaluation.features') as string[],
      criteria: t('biddingConsulting.services.evaluation.criteria') as string[],
      experience: t('biddingConsulting.services.evaluation.experience') as string,
      success: t('biddingConsulting.services.evaluation.success') as string
    },
    {
      icon: <PersonSearch sx={{ fontSize: 60 }} />,
      title: t('biddingConsulting.services.selection.title') as string,
      description: t('biddingConsulting.services.selection.description') as string,
      features: t('biddingConsulting.services.selection.features') as string[],
      benefits: t('biddingConsulting.services.selection.benefits') as string[],
      experience: t('biddingConsulting.services.selection.experience') as string,
      success: t('biddingConsulting.services.selection.success') as string
    },
  ];

  const biddingProcess = t('biddingConsulting.process.steps') as Array<{
    step: string;
    duration: string;
    activities: string[];
    icon: string;
  }>;

  const advantages = t('biddingConsulting.advantages.items') as Array<{
    title: string;
    description: string;
    icon: string;
    color: string;
  }>;

  return (
    <Box className="min-h-screen">
      <Container className="py-16 space-y-20"  sx={{ px: { xs: 4, md: 0 } }}>
        {/* Header Section */}
        <section className="fade-in-up">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <Typography
              variant="h2"
              className="text-4xl font-bold text-center text-gray-800"
              sx={{ mb: 3 }}
            >
              {t('biddingConsulting.title') as string}
              <span style={{ color: theme.palette.primary.main }}> {t('biddingConsulting.titleHighlight') as string}</span>
            </Typography>
            <Typography
              variant="h6"
              className="text-center text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              {t('biddingConsulting.subtitle') as string}
            </Typography>
          </div>
        </section>

        {/* Services Grid */}
        <section className="slide-in-left">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {biddingServices.map((service, index) => (
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
                      className="font-bold text-gray-800 transition-colors duration-300"
                      sx={{
                        mb: 1.5,
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

                  <Typography
                    variant="body1"
                    className="text-gray-600 leading-relaxed text-center"
                    sx={{ mb: 3 }}
                  >
                    {service.description}
                  </Typography>
                  
                  <div className="space-y-4 mb-6 flex-grow">
                    <Typography variant="h6" className="font-semibold text-gray-800" sx={{ mb: 1 }}>
                      {t('biddingConsulting.mainActivities') as string}
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
                    <Typography variant="subtitle2" className="font-semibold text-gray-800" sx={{ mb: 1 }}>
                      {service.documents ? t('biddingConsulting.documentsProvided') as string : service.criteria ? t('biddingConsulting.evaluationCriteria') as string : t('biddingConsulting.benefitsProvided') as string}
                    </Typography>
                    <div className="space-y-1">
                      {(service.documents || service.criteria || service.benefits)?.map((item, idx) => (
                        <div key={idx} className="text-xs text-gray-600 px-2 py-1">
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
        <section className="slide-in-right">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <Typography variant="h3" className="font-bold text-gray-800" sx={{ mb: 2 }}>
              {t('biddingConsulting.process.title') as string}
            </Typography>
            <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto">
              {t('biddingConsulting.process.subtitle') as string}
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

                    <Typography variant="h6" className="font-bold text-gray-800" sx={{ mb: 1 }}>
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
        <section className="fade-in-up">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <Typography variant="h3" className="font-bold text-gray-800" sx={{ mb: 2 }}>
              {t('biddingConsulting.advantages.title') as string}
            </Typography>
            <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto">
              {t('biddingConsulting.advantages.subtitle') as string}
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
                <Typography variant="h6" className="font-bold text-gray-800" sx={{ mb: 1 }}>
                  {advantage.title}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {advantage.description}
                </Typography>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </Box>
  )
}
