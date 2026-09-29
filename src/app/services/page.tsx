'use client'

import React from 'react'
import Link from 'next/link'
import {
  Box,
  Container,
  Typography,
  Chip
} from '@mui/material'
import {
  Construction,
  Engineering,
  ManageAccounts,
  Assessment,
  Schedule,
  AccountBalance,
  Landscape
} from '@mui/icons-material'
import { useTranslations } from '@/hooks/useTranslations'
import useScrollAnimations from '@/hooks/useScrollAnimations'
import { BRAND_COLORS } from '@/constants/colors'

export default function ServicesPage() {
  useScrollAnimations()
  const { t: tRaw } = useTranslations()
  // Type-safe wrapper for translation function
  const t = (key: string): string => tRaw(key) as string

  const constructionServices = [
    {
      icon: <Construction sx={{ fontSize: 44 }} />,
      title: t('services.constructionTech.civilConstruction.title'),
      description: t('services.constructionTech.civilConstruction.description'),
    },
    {
      icon: <Engineering sx={{ fontSize: 44 }} />,
      title: t('services.constructionTech.industrialConstruction.title'),
      description: t('services.constructionTech.industrialConstruction.description'),
    },
    {
      icon: <AccountBalance sx={{ fontSize: 44 }} />,
      title: t('services.constructionTech.urbanInfrastructure.title'),
      description: t('services.constructionTech.urbanInfrastructure.description'),
    },
    {
      icon: <Landscape sx={{ fontSize: 44 }} />,
      title: t('services.constructionTech.landscapeDesign.title'),
      description: t('services.constructionTech.landscapeDesign.description'),
    }
  ]

  const managementServices = [
    {
      icon: <ManageAccounts sx={{ fontSize: 44 }} />,
      title: t('services.projectManagement.management.title'),
      description: t('services.projectManagement.management.description'),
      features: [
        t('services.projectManagement.management.features.0'),
        t('services.projectManagement.management.features.1'),
        t('services.projectManagement.management.features.2')
      ],
    },
    {
      icon: <Assessment sx={{ fontSize: 44 }} />,
      title: t('services.projectManagement.qualityControl.title'),
      description: t('services.projectManagement.qualityControl.description'),
      features: [
        t('services.projectManagement.qualityControl.features.0'),
        t('services.projectManagement.qualityControl.features.1'),
        t('services.projectManagement.qualityControl.features.2')
      ],
    },
    {
      icon: <Schedule sx={{ fontSize: 44 }} />,
      title: t('services.projectManagement.scheduleManagement.title'),
      description: t('services.projectManagement.scheduleManagement.description'),
      features: [
        t('services.projectManagement.scheduleManagement.features.0'),
        t('services.projectManagement.scheduleManagement.features.1'),
        t('services.projectManagement.scheduleManagement.features.2')
      ],
    }
  ]

  const consultingServices = [
    t('services.consulting.services.0'),
    t('services.consulting.services.1'),
    t('services.consulting.services.2'),
    t('services.consulting.services.3'),
    t('services.consulting.services.4'),
    t('services.consulting.services.5')
  ]

  return (
    <Box className="min-h-screen">
      <Container className="pt-0 pb-16 space-y-20" sx={{ px: 4 }}>
        {/* Header Section */}
        <section className="fade-in-up">
          <Typography
            variant="h2"
            className="text-3xl font-bold text-center mb-6 text-gray-900"
            sx={{ marginBottom: '1.5rem' }}
          >
            {t('services.title')}
          </Typography>
          <div className="flex items-center justify-center min-h-[80px]">
            <Typography
              variant="h6"
              className="text-center text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed"
              sx={{ marginBottom: '2rem' }}
            >
              {t('services.description')}
            </Typography>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Chip
              label={t('services.chips.experience')}
              className="bg-brand-accent-light text-brand-accent-dark border border-brand-accent-border font-medium"
              size="medium"
            />
            <Chip
              label={t('services.chips.projects')}
              className="bg-brand-accent-light text-brand-accent-dark border border-brand-accent-border font-medium"
              size="medium"
            />
            <Chip
              label={t('services.chips.team')}
              className="bg-brand-accent-light text-brand-accent-dark border border-brand-accent-border font-medium"
              size="medium"
            />
          </div>
        </section>

        {/* Construction Technology Section */}
        <section className="slide-in-left">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <Typography variant="h3" className="mb-4 font-bold text-gray-900">
              {t('services.constructionTech.title')}
            </Typography>
            <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('services.constructionTech.description')}
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {constructionServices.map((service, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-brand-accent hover:shadow-xl transition-all duration-300 cursor-pointer fade-in-up"
              >
                <div className="relative z-10 text-center h-full flex flex-col">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3.5 rounded-2xl bg-brand-accent-light text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 group-hover:scale-105 border border-brand-accent-border/40">
                      {service.icon}
                    </div>
                  </div>
                  <Typography variant="h6" className="font-bold text-gray-900 mb-3 group-hover:text-brand-primary transition-colors duration-300">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 leading-relaxed flex-grow">
                    {service.description}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Project Management Section */}
        <section className="slide-in-right">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <Typography variant="h3" className="mb-4 font-bold text-gray-900">
              {t('services.projectManagement.title')}
            </Typography>
            <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('services.projectManagement.description')}
            </Typography>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {managementServices.map((service, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-white border border-slate-200/80 hover:border-brand-accent hover:shadow-xl transition-all duration-300 cursor-pointer scale-in overflow-hidden"
              >
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="p-3.5 bg-brand-accent-light text-brand-primary rounded-2xl mr-4 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 group-hover:scale-105 border border-brand-accent-border/40">
                      {service.icon}
                    </div>
                    <Typography variant="h5" className="font-bold text-gray-900 group-hover:text-brand-primary transition-colors duration-300">
                      {service.title}
                    </Typography>
                  </div>
                  <Typography variant="body1" className="text-gray-600 mb-6 leading-relaxed flex-grow">
                    {service.description}
                  </Typography>
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-brand-accent rounded-full mr-3 shrink-0"></div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consultation Services Section */}
        <section className="scale-in">
          <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/80 p-8 md:p-12 shadow-sm">
            <div className="relative z-10">
              <div className="flex flex-col items-center justify-center text-center mb-12">
                <Typography variant="h3" className="mb-4 font-bold text-gray-900">
                  {t('services.consulting.title')}
                </Typography>
                <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  {t('services.consulting.description')}
                </Typography>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {consultingServices.map((service, index) => (
                  <div
                    key={index}
                    className="group relative p-5 rounded-xl bg-slate-50 border border-slate-200/60 hover:bg-white hover:border-brand-accent transition-all duration-300 cursor-pointer overflow-hidden flex items-center"
                  >
                    <div className="w-2.5 h-2.5 bg-brand-accent rounded-full mr-3.5 shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                    <Typography variant="body1" className="text-gray-800 font-semibold group-hover:text-brand-primary transition-colors duration-300">
                      {service}
                    </Typography>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  href="/contact#contact-form"
                  aria-label="Liên hệ để nhận tư vấn miễn phí"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl transition-all duration-200 hover:opacity-90 shadow-sm"
                  style={{
                    backgroundColor: BRAND_COLORS.primary.main,
                    color: BRAND_COLORS.primary.contrastText,
                    textDecoration: 'none'
                  }}
                >
                  <span className="text-base font-semibold">{t('services.consulting.consultBtn')}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </Box>
  )
}
