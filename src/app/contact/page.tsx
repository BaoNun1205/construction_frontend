'use client'

import React, { useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { useTheme, Box, Container, Alert, CircularProgress, Typography } from '@mui/material'
import JsonLd from '@/components/seo/JsonLd'
import { useTranslations } from '@/hooks/useTranslations'
import { CONTACT } from '@/constants/contact'
import useScrollAnimations from '@/hooks/useScrollAnimations'
import { useCreateContact } from '@/hooks/useContacts'
import { CreateContactDto } from '@/types/contact'

export default function ContactPage() {
  useScrollAnimations()
  const theme = useTheme()
  const { t } = useTranslations()

  const [formData, setFormData] = useState<CreateContactDto>({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [showThankYou, setShowThankYou] = useState(false)

  const createContactMutation = useCreateContact()
  const isLoading = Boolean(
    createContactMutation.isPending ||
      ('isLoading' in createContactMutation && createContactMutation.isLoading)
  )

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await createContactMutation.mutateAsync(formData)
      setShowThankYou(true)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Lỗi khi gửi liên hệ:', error)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const contactPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Liên hệ Công ty Xây dựng Lai Phát',
    url: `https://${CONTACT.WEBSITE}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Công Ty Cổ Phần Tư Vấn Và Xây Dựng Lai Phát',
      telephone: CONTACT.PHONE,
      email: CONTACT.EMAIL,
      url: `https://${CONTACT.WEBSITE}`,
      sameAs: [CONTACT.FACEBOOK]
    }
  }

  return (
    <Box className="min-h-screen">
      <JsonLd data={contactPageJsonLd} />

      <Container className="py-16 space-y-20" sx={{ px: 4 }}>
        <div className="fade-in-on">
          <h1 className="mb-8 text-3xl font-bold">
            {t('contact.title') as string}{' '}
            <span style={{ color: theme.palette.primary.main }}>
              {t('contact.titleHighlight') as string}
            </span>
          </h1>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div
            id="contact-form"
            className="slide-in-left"
            style={{ scrollMarginTop: '120px' }}
          >
            <h2 className="mb-6 text-2xl font-semibold">{t('contact.form.title') as string}</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {createContactMutation.error && (
                <Alert severity="error" className="mb-4">
                  Có lỗi xảy ra:{' '}
                  {createContactMutation.error.message || 'Đã xảy ra lỗi không xác định'}
                </Alert>
              )}

              <div className="scale-in" style={{ animationDelay: '0.1s' }}>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                  {t('contact.form.name') as string}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2"
                  style={{
                    '--tw-ring-color': `${theme.palette.primary.main}80`
                  } as React.CSSProperties}
                  required
                />
              </div>

              <div className="scale-in" style={{ animationDelay: '0.2s' }}>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                  {t('contact.form.email') as string}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2"
                  style={{
                    '--tw-ring-color': `${theme.palette.primary.main}80`
                  } as React.CSSProperties}
                  required
                />
              </div>

              <div className="scale-in" style={{ animationDelay: '0.3s' }}>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                  {t('contact.form.phone') as string}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2"
                  style={{
                    '--tw-ring-color': `${theme.palette.primary.main}80`
                  } as React.CSSProperties}
                />
              </div>

              <div className="scale-in" style={{ animationDelay: '0.4s' }}>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                  {t('contact.form.message') as string}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2"
                  style={{
                    '--tw-ring-color': `${theme.palette.primary.main}80`
                  } as React.CSSProperties}
                  required
                />
              </div>

              <div className="scale-in" style={{ animationDelay: '0.5s' }}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-white transition duration-200"
                  style={{
                    backgroundColor: isLoading
                      ? theme.palette.grey[400]
                      : theme.palette.primary.main
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.backgroundColor = theme.palette.primary.dark
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.backgroundColor = theme.palette.primary.main
                    }
                  }}
                >
                  {isLoading && <CircularProgress size={20} color="inherit" />}
                  {isLoading ? 'Đang gửi...' : (t('contact.form.submit') as string)}
                </button>
              </div>

              {showThankYou && (
                <Alert severity="success" className="mt-4">
                  <Typography variant="body1" className="font-medium">
                    Cảm ơn bạn đã gửi tin nhắn cho chúng tôi!
                  </Typography>
                  <Typography variant="body2" className="mt-1">
                    Chúng tôi đã nhận được tin nhắn của bạn và sẽ liên hệ lại sớm nhất có thể.
                  </Typography>
                </Alert>
              )}
            </form>
          </div>

          <div className="slide-in-right">
            <h2 className="mb-6 text-2xl font-semibold">{t('contact.info.title') as string}</h2>

            <div className="space-y-8">
              <div className="fade-in-on" style={{ animationDelay: '0.1s' }}>
                <h3
                  className="mb-3 text-lg font-medium"
                  style={{ color: theme.palette.primary.main }}
                >
                  {t('contact.info.office.title') as string}
                </h3>
                <p className="text-gray-600">
                  {(t('contact.info.office.address') as string).split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < 2 && <br />}
                    </span>
                  ))}
                </p>
              </div>

              <div className="fade-in-on" style={{ animationDelay: '0.2s' }}>
                <h3
                  className="mb-3 text-lg font-medium"
                  style={{ color: theme.palette.primary.main }}
                >
                  {t('contact.info.details.title') as string}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">{t('contact.info.details.phone') as string}</span>{' '}
                    <a
                      href={`tel:${CONTACT.PHONE.replace(/\s+/g, '')}`}
                      className="hover:underline"
                      style={{ color: theme.palette.primary.main }}
                    >
                      {CONTACT.PHONE}
                    </a>
                  </p>
                  <p>
                    <span className="font-medium">{t('contact.info.details.email') as string}</span>{' '}
                    <a
                      href={`mailto:${CONTACT.EMAIL}`}
                      className="hover:underline"
                      style={{ color: theme.palette.primary.main }}
                    >
                      {CONTACT.EMAIL}
                    </a>
                  </p>
                  <p>
                    <span className="font-medium">{t('contact.info.details.website') as string}</span>{' '}
                    <a
                      href={`https://${CONTACT.WEBSITE}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{ color: theme.palette.primary.main }}
                    >
                      {CONTACT.WEBSITE}
                    </a>
                  </p>
                </div>
              </div>

              <div className="fade-in-on" style={{ animationDelay: '0.3s' }}>
                <h3
                  className="mb-3 text-lg font-medium"
                  style={{ color: theme.palette.primary.main }}
                >
                  {t('contact.info.map.title') as string}
                </h3>
                <div className="h-64 overflow-hidden rounded-lg scale-in">
                  <iframe
                    src={CONTACT.MAP}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Bản đồ vị trí công ty xây dựng Lai Phát"
                  />
                </div>
              </div>

              <div className="fade-in-on" style={{ animationDelay: '0.4s' }}>
                <h3
                  className="mb-3 text-lg font-medium"
                  style={{ color: theme.palette.primary.main }}
                >
                  {t('contact.info.social.title') as string}
                </h3>
                <div className="flex space-x-4">
                  <a
                    href={CONTACT.FACEBOOK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition duration-200 hover:underline"
                    style={{ color: theme.palette.primary.main }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme.palette.primary.dark
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme.palette.primary.main
                    }}
                  >
                    Facebook
                  </a>
                  <span style={{ color: theme.palette.primary.main }}>
                    Zalo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Box>
  )
}
