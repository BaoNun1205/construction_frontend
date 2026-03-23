'use client'

import React from 'react'
import {
  Box,
  Container,
  Typography,
  useTheme
} from '@mui/material'
import {
  VerifiedUser,
  Timeline,
  Security
} from '@mui/icons-material'
import ServiceKeywordLinks from '@/components/seo/ServiceKeywordLinks'
import { useTranslations } from '@/hooks/useTranslations'
import useScrollAnimations from '@/hooks/useScrollAnimations'

export default function SupervisionPage() {
  useScrollAnimations()
  const theme = useTheme()
  const { t } = useTranslations()

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
    }
  ]

  const supervisionProcess = t('supervision.process.steps') as Array<{
    step: string
    title: string
    description: string
  }>

  const keywordLinks = [
    {
      href: '/services/construction',
      label: 'Thi công xây dựng đồng bộ cùng giám sát công trình',
      description: 'Kết hợp giám sát thi công với thi công thực tế để kiểm soát chất lượng từ đầu tới cuối.'
    },
    {
      href: '/services/project-management',
      label: 'Quản lý dự án xây dựng và kiểm soát tiến độ',
      description: 'Bổ sung lớp quản lý tổng thể về ngân sách, nguồn lực và tiến độ cho công trình đang triển khai.'
    },
    {
      href: '/services/design-consulting',
      label: 'Tư vấn thiết kế để giám sát bám sát hồ sơ kỹ thuật',
      description: 'Đối chiếu quá trình thi công với hồ sơ thiết kế, công năng và tiêu chuẩn kỹ thuật đã được phê duyệt.'
    },
    {
      href: '/projects',
      label: 'Xem các công trình đã được triển khai thực tế',
      description: 'Tham khảo dự án tiêu biểu để đánh giá năng lực giám sát thi công và kiểm soát chất lượng.'
    },
    {
      href: '/contact#contact-form',
      label: 'Liên hệ tư vấn giám sát thi công công trình',
      description: 'Trao đổi nhanh nhu cầu giám sát chất lượng, tiến độ hoặc an toàn cho công trình của bạn.'
    }
  ]

  return (
    <Box className="min-h-screen">
      <Container maxWidth="lg" className="space-y-20 py-16" sx={{ px: 4 }}>
        <section className="fade-in-up">
          <div className="mb-16 flex flex-col items-center justify-center text-center">
            <Typography
              variant="h2"
              component="h1"
              className="text-4xl font-bold text-center text-gray-800"
              sx={{ mb: 3 }}
            >
              {t('supervision.title') as string}
              <span style={{ color: theme.palette.primary.main }}> {t('supervision.titleHighlight') as string}</span>
            </Typography>
            <Typography
              variant="h6"
              component="p"
              className="mx-auto max-w-4xl text-center leading-relaxed text-gray-600"
            >
              {t('supervision.subtitle') as string}
            </Typography>
          </div>
        </section>

        <section className="slide-in-left">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {supervisionServices.map((service, index) => (
              <div
                key={index}
                className="group relative h-full overflow-hidden rounded-3xl border border-gray-200/50 bg-gradient-to-br from-white/90 to-gray-50/90 p-8 backdrop-blur-lg transition-all duration-700 scale-in"
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
                    background: `linear-gradient(to bottom right, ${theme.palette.primary.main}08, ${theme.palette.primary.main}15)`
                  }}
                />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6 text-center">
                    <div
                      className="mb-4 inline-flex rounded-2xl p-4 transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(to bottom right, ${theme.palette.primary.main}20, ${theme.palette.primary.main}30)`
                      }}
                    >
                      {service.icon}
                    </div>
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
                      className="inline-block rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        background: `${theme.palette.primary.main}12`,
                        color: theme.palette.primary.main
                      }}
                    >
                      {service.projects}
                    </div>
                  </div>

                  <Typography
                    variant="body1"
                    component="p"
                    className="text-center leading-relaxed text-gray-600"
                    sx={{ mb: 3 }}
                  >
                    {service.description}
                  </Typography>

                  <div className="mb-6 space-y-4">
                    <Typography
                      variant="h6"
                      component="h3"
                      className="text-center font-semibold text-gray-800"
                      sx={{ mb: 1.5 }}
                    >
                      {t('supervision.supervisionContent') as string}
                    </Typography>
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700 transition-colors duration-300 group-hover:text-gray-800">
                        <div
                          className="mr-3 h-2 w-2 flex-shrink-0 rounded-full transition-transform duration-300 group-hover:scale-125"
                          style={{
                            background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.main})`
                          }}
                        />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <Typography
                      variant="h6"
                      component="h3"
                      className="text-center font-semibold text-gray-800"
                      sx={{ mb: 1.5 }}
                    >
                      {t('supervision.benefits') as string}
                    </Typography>
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="mb-2 flex items-center text-sm text-green-700">
                        <div className="mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                        <span className="font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="slide-in-right">
          <div className="mb-12 flex flex-col items-center justify-center text-center">
            <Typography variant="h3" component="h2" className="font-bold text-gray-800" sx={{ mb: 2 }}>
              {t('supervision.process.title') as string}
            </Typography>
            <Typography variant="body1" component="p" className="mx-auto max-w-2xl text-gray-600">
              {t('supervision.process.subtitle') as string}
            </Typography>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {supervisionProcess.map((process, index) => (
              <div key={index} className="relative">
                <div className="rounded-2xl border border-gray-200/50 bg-white/80 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                  <div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, #10b981)`
                    }}
                  >
                    {process.step}
                  </div>
                  <Typography variant="h6" component="h3" className="font-bold text-gray-800" sx={{ mb: 1 }}>
                    {process.title}
                  </Typography>
                  <Typography variant="body2" component="p" className="text-gray-600">
                    {process.description}
                  </Typography>
                </div>
                {index < supervisionProcess.length - 1 && (
                  <div className="absolute top-1/2 -right-6 hidden h-0.5 w-6 bg-gradient-to-r from-blue-400 to-blue-600 lg:block" />
                )}
              </div>
            ))}
          </div>
        </section>

        <ServiceKeywordLinks
          id="supervision-related-links"
          title="Liên Kết Nội Bộ Theo Nhóm Từ Khóa Giám Sát Thi Công"
          description="Đây là các liên kết nội bộ được nhóm theo hành trình thực tế của khách hàng đang tìm dịch vụ giám sát thi công, kiểm soát chất lượng xây dựng, tiến độ công trình và giải pháp quản lý dự án."
          links={keywordLinks}
        />
      </Container>
    </Box>
  )
}
