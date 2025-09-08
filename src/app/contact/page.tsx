'use client'

import React, { useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { useTheme, Box, Container, Alert, CircularProgress, Typography } from '@mui/material'
import { useTranslations } from '@/hooks/useTranslations'
import { CONTACT } from '@/constants/contact'
import useScrollAnimations from '@/hooks/useScrollAnimations'
import { useCreateContact } from '@/hooks/useContacts'
import { CreateContactDto } from '@/types/contact'

export default function ContactPage() {
  useScrollAnimations()
  const theme = useTheme()
  const { t } = useTranslations()

  // State cho form
  const [formData, setFormData] = useState<CreateContactDto>({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  // State để hiển thị thông báo cảm ơn
  const [showThankYou, setShowThankYou] = useState(false)

  // Hook để tạo contact
  const createContactMutation = useCreateContact()

  // Helper để check loading state
  const isLoading = Boolean(createContactMutation.isPending || ('isLoading' in createContactMutation && createContactMutation.isLoading))

  // Xử lý submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await createContactMutation.mutateAsync(formData)
      setShowThankYou(true)
      // Không reset form, để user tự reload nếu muốn gửi lại
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Lỗi khi gửi liên hệ:', error)
    }
  }

  // Xử lý thay đổi input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Box className="min-h-screen">
      <Container className="py-16 space-y-20" sx={{ px: 4 }}>
        <div className="fade-in-on">
          <h1 className="text-3xl font-bold mb-8">
            {t('contact.title') as string} <span style={{ color: theme.palette.primary.main }}>{t('contact.titleHighlight') as string}</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="slide-in-left">
            <h2 className="text-2xl font-semibold mb-6">{t('contact.form.title') as string}</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Hiển thị lỗi nếu có */}
              {createContactMutation.error && (
                <Alert severity="error" className="mb-4">
                    Có lỗi xảy ra: {createContactMutation.error.message || 'Đã xảy ra lỗi không xác định'}
                </Alert>
              )}                <div className="scale-in" style={{ animationDelay: '0.1s' }}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.name') as string}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{
                    '--tw-ring-color': theme.palette.primary.main + '80'
                  } as React.CSSProperties}
                  required
                />
              </div>

              <div className="scale-in" style={{ animationDelay: '0.2s' }}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.email') as string}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{
                    '--tw-ring-color': theme.palette.primary.main + '80'
                  } as React.CSSProperties}
                  required
                />
              </div>

              <div className="scale-in" style={{ animationDelay: '0.3s' }}>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.phone') as string}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{
                    '--tw-ring-color': theme.palette.primary.main + '80'
                  } as React.CSSProperties}
                />
              </div>

              <div className="scale-in" style={{ animationDelay: '0.4s' }}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.message') as string}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{
                    '--tw-ring-color': theme.palette.primary.main + '80'
                  } as React.CSSProperties}
                  required
                ></textarea>
              </div>

              <div className="scale-in" style={{ animationDelay: '0.5s' }}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-white py-2 px-4 rounded-md transition duration-200 flex items-center justify-center gap-2"
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

              {/* Hiển thị thông báo cảm ơn sau khi gửi thành công */}
              {showThankYou && (
                <Alert severity="success" className="mt-4">
                  <Typography variant="body1" className="font-medium">
                      Cảm ơn bạn đã gửi tin nhắn cho chúng tôi!
                  </Typography>
                  <Typography variant="body2" className="mt-1">
                      Chúng tôi đã nhận được tin nhắn của bạn và sẽ liên hệ lại bạn sớm nhất có thể.
                  </Typography>
                </Alert>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="slide-in-right">
            <h2 className="text-2xl font-semibold mb-6">{t('contact.info.title') as string}</h2>

            <div className="space-y-8">
              {/* Office Address */}
              <div className="fade-in-on" style={{ animationDelay: '0.1s' }}>
                <h3
                  className="text-lg font-medium mb-3"
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

              {/* Contact Details */}
              <div className="fade-in-on" style={{ animationDelay: '0.2s' }}>
                <h3
                  className="text-lg font-medium mb-3"
                  style={{ color: theme.palette.primary.main }}
                >
                  {t('contact.info.details.title') as string}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-medium">{t('contact.info.details.phone') as string}</span> {CONTACT.PHONE}</p>
                  <p><span className="font-medium">{t('contact.info.details.email') as string}</span> {CONTACT.EMAIL}</p>
                  <p><span className="font-medium">{t('contact.info.details.website') as string}</span> {CONTACT.WEBSITE}</p>
                </div>
              </div>

              {/* Google Maps */}
              <div className="fade-in-on" style={{ animationDelay: '0.3s' }}>
                <h3
                  className="text-lg font-medium mb-3"
                  style={{ color: theme.palette.primary.main }}
                >
                  {t('contact.info.map.title') as string}
                </h3>
                <div className="h-64 rounded-lg overflow-hidden scale-in">
                  <iframe
                    src={CONTACT.MAP}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Bản đồ Vĩnh Lộc, TP Hồ Chí Minh"
                  />
                </div>
              </div>

              {/* Request Form */}
              <div className="fade-in-on" style={{ animationDelay: '0.4s' }}>
                <h3
                  className="text-lg font-medium mb-3"
                  style={{ color: theme.palette.primary.main }}
                >
                  {t('contact.info.quote.title') as string}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('contact.info.quote.description') as string}
                </p>
                <button
                  className="text-white px-6 py-2 rounded-md transition duration-200"
                  style={{
                    backgroundColor: theme.palette.primary.main
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.palette.primary.dark
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = theme.palette.primary.main
                  }}
                >
                  {t('contact.info.quote.button') as string}
                </button>
              </div>

              {/* Social Network */}
              <div className="fade-in-on" style={{ animationDelay: '0.5s' }}>
                <h3
                  className="text-lg font-medium mb-3"
                  style={{ color: theme.palette.primary.main }}
                >
                  {t('contact.info.social.title') as string}
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="hover:underline transition duration-200"
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
                  <a
                    href="#"
                    className="hover:underline transition duration-200"
                    style={{ color: theme.palette.primary.main }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme.palette.primary.dark
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme.palette.primary.main
                    }}
                  >
                    Zalo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Box>
  )
}
