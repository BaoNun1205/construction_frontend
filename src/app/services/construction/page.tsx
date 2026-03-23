'use client'

import React from 'react'
import {
  Box,
  Container,
  Typography,
  useTheme
} from '@mui/material'
import {
  HomeWork,
  Business,
  Factory,
  Engineering
} from '@mui/icons-material'
import ServiceKeywordLinks from '@/components/seo/ServiceKeywordLinks'
import { useTranslations } from '@/hooks/useTranslations'
import useScrollAnimations from '@/hooks/useScrollAnimations'

export default function ConstructionPage() {
  useScrollAnimations()
  const theme = useTheme()
  const { t: tRaw } = useTranslations()
  const t = (key: string): string => tRaw(key) as string

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
      projects: t('construction.services.0.projects')
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
      projects: t('construction.services.1.projects')
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
      projects: t('construction.services.2.projects')
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
      projects: t('construction.services.3.projects')
    }
  ]

  const keywordLinks = [
    {
      href: '/services/design-consulting',
      label: 'Tư vấn thiết kế nhà phố, biệt thự và công trình',
      description: 'Khám phá giải pháp thiết kế kiến trúc, concept 3D và hồ sơ kỹ thuật trước khi triển khai thi công.'
    },
    {
      href: '/services/supervision',
      label: 'Tư vấn giám sát thi công công trình xây dựng',
      description: 'Theo dõi chất lượng, tiến độ và an toàn để công trình được thi công đúng tiêu chuẩn.'
    },
    {
      href: '/services/project-management',
      label: 'Quản lý dự án xây dựng toàn diện',
      description: 'Kiểm soát phạm vi, ngân sách, tiến độ và nhân lực cho công trình dân dụng lẫn công nghiệp.'
    },
    {
      href: '/projects',
      label: 'Xem dự án thi công xây dựng tiêu biểu',
      description: 'Tham khảo các công trình thực tế mà Lai Phát đã triển khai và hoàn thiện.'
    },
    {
      href: '/contact#contact-form',
      label: 'Liên hệ nhận báo giá thi công xây dựng',
      description: 'Gửi thông tin công trình để được tư vấn nhanh về quy mô, phương án và báo giá phù hợp.'
    }
  ]

  return (
    <Box className="min-h-screen">
      <Container className="space-y-20 py-16" sx={{ px: 4 }}>
        <section className="fade-in-up">
          <div className="mb-16 flex flex-col items-center justify-center text-center">
            <Typography
              variant="h2"
              component="h1"
              className="text-4xl font-bold text-center text-gray-800"
              sx={{ mb: 3 }}
            >
              {t('construction.title')}
              <span style={{ color: theme.palette.primary.main }}> {t('construction.titleHighlight')}</span>
            </Typography>
            <Typography
              variant="h6"
              component="p"
              className="mx-auto max-w-4xl text-center leading-relaxed text-gray-600"
            >
              {t('construction.description')}
            </Typography>
          </div>
        </section>

        <section className="slide-in-left">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {constructionServices.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-gradient-to-br from-white/80 to-gray-50/80 p-8 backdrop-blur-lg transition-all duration-700 scale-in"
                style={{
                  boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)'
                  e.currentTarget.style.boxShadow = `0 25px 80px ${theme.palette.primary.main}25`
                  e.currentTarget.style.borderColor = `${theme.palette.primary.main}50`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(229,231,235,0.5)'
                }}
              >
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(to bottom right, ${theme.palette.primary.main}10, ${theme.palette.primary.main}20)`
                  }}
                />

                <div
                  className="absolute right-4 top-4 h-16 w-16 rounded-full transition-transform duration-500 group-hover:scale-125"
                  style={{
                    background: `linear-gradient(to bottom right, ${theme.palette.primary.main}20, ${theme.palette.primary.main}30)`
                  }}
                />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6 flex items-center">
                    <div
                      className="mr-4 rounded-2xl p-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        background: `linear-gradient(to bottom right, ${theme.palette.primary.main}15, ${theme.palette.primary.main}25)`
                      }}
                    >
                      {service.icon}
                    </div>
                    <div>
                      <Typography
                        variant="h5"
                        component="h2"
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
                        className="rounded-full px-3 py-1 text-sm font-medium"
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
                    component="p"
                    className="leading-relaxed text-gray-600"
                    sx={{ mb: 3 }}
                  >
                    {service.description}
                  </Typography>

                  <div className="flex-grow space-y-3">
                    <Typography variant="h6" component="h3" className="font-semibold text-gray-800" sx={{ mb: 1.5 }}>
                      {t('construction.featureTitle')}
                    </Typography>
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700 transition-colors duration-300 group-hover:text-gray-800">
                        <div
                          className="mr-3 h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-125"
                          style={{
                            background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.main})`
                          }}
                        />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <ServiceKeywordLinks
          id="construction-related-links"
          title="Khám Phá Thêm Giải Pháp Thi Công Xây Dựng Liên Quan"
          description="Cụm liên kết này giúp người dùng đi nhanh tới các dịch vụ thường đi cùng thi công xây dựng như thiết kế, giám sát, quản lý dự án và các dự án thực tế. Đồng thời đây cũng là internal link tự nhiên theo nhóm từ khóa thi công công trình, xây dựng dân dụng và xây dựng công nghiệp."
          links={keywordLinks}
        />
      </Container>
    </Box>
  )
}
