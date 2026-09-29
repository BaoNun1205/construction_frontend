'use client'

import React, { useState, useEffect, Suspense } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  useTheme,
  Box,
  Container,
  Alert,
  CircularProgress,
  Typography,
  Chip
} from '@mui/material'
import {
  HomeWork,
  Architecture,
  Inventory2,
  Close,
  Phone,
  Email,
  Person,
  Send,
  OpenInNew,
  ArrowForward,
  CheckCircle,
  HelpOutline,
  AutoAwesome
} from '@mui/icons-material'
import JsonLd from '@/components/seo/JsonLd'
import { useTranslations } from '@/hooks/useTranslations'
import { CONTACT } from '@/constants/contact'
import { BRAND_COLORS } from '@/constants/colors'
import useScrollAnimations from '@/hooks/useScrollAnimations'
import { useCreateContact } from '@/hooks/useContacts'
import { CreateContactDto } from '@/types/contact'

function ContactFormInner() {
  useScrollAnimations()
  const theme = useTheme()
  const { t } = useTranslations()
  const searchParams = useSearchParams()

  const rawType = searchParams.get('type') || 'general'
  const rawTitle = searchParams.get('title') || ''
  const rawCode = searchParams.get('code') || ''
  const rawCategory = searchParams.get('category') || ''
  const rawImage = searchParams.get('image') || ''
  const rawUrl = searchParams.get('url') || ''
  const rawSubject = searchParams.get('subject') || ''
  const rawMessage = searchParams.get('message') || ''

  // Has quotation target attached
  const isQuoteFromParams = Boolean(rawTitle || (rawType && rawType !== 'general'))

  const [quoteTarget, setQuoteTarget] = useState<{
    type: string
    title: string
    code: string
    category: string
    image: string
    url: string
  } | null>(
    isQuoteFromParams
      ? {
          type: rawType,
          title: rawTitle,
          code: rawCode,
          category: rawCategory,
          image: rawImage,
          url: rawUrl
        }
      : null
  )

  const [formData, setFormData] = useState<CreateContactDto>({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: rawType,
    subject: rawSubject,
    targetTitle: rawTitle,
    targetCode: rawCode,
    targetCategory: rawCategory,
    targetImage: rawImage,
    targetUrl: rawUrl
  })

  const [showThankYou, setShowThankYou] = useState(false)
  const [submittedData, setSubmittedData] = useState<CreateContactDto | null>(null)

  // Initialize or update formData when query params change
  useEffect(() => {
    if (rawTitle || (rawType && rawType !== 'general')) {
      const typeText =
        rawType === 'template'
          ? 'mẫu thiết kế'
          : rawType === 'project'
            ? 'dự án công trình'
            : rawType === 'material'
              ? 'sản phẩm vật tư'
              : 'hạng mục'

      const defaultSubject =
        rawSubject ||
        `Yêu cầu báo giá ${typeText}: ${rawTitle || rawCode || 'Công trình'}`

      const defaultMessage =
        rawMessage ||
        `Xin chào Công ty Xây Dựng Lai Phát,\n\nTôi đang quan tâm đến ${typeText} "${rawTitle}"${rawCode ? ` (Mã: ${rawCode})` : ''}.\nVui lòng liên hệ tư vấn giải pháp, dự toán kinh phí và gửi báo giá chi tiết cho tôi.\n\nThông tin thêm (diện tích/ngân sách/thời gian khởi công): `

      setQuoteTarget({
        type: rawType,
        title: rawTitle,
        code: rawCode,
        category: rawCategory,
        image: rawImage,
        url: rawUrl
      })

      setFormData((prev) => ({
        ...prev,
        type: rawType,
        subject: defaultSubject,
        targetTitle: rawTitle,
        targetCode: rawCode,
        targetCategory: rawCategory,
        targetImage: rawImage,
        targetUrl: rawUrl,
        message: defaultMessage
      }))
    } else if (rawSubject || rawMessage) {
      setFormData((prev) => ({
        ...prev,
        subject: rawSubject || prev.subject,
        message: rawMessage || prev.message
      }))
    }
  }, [rawType, rawTitle, rawCode, rawCategory, rawImage, rawUrl, rawSubject, rawMessage])

  const createContactMutation = useCreateContact()
  const isLoading = Boolean(
    createContactMutation.isPending ||
      ('isLoading' in createContactMutation && createContactMutation.isLoading)
  )

  const handleRemoveQuoteTarget = () => {
    setQuoteTarget(null)
    setFormData((prev) => ({
      ...prev,
      type: 'general',
      subject: '',
      targetTitle: '',
      targetCode: '',
      targetCategory: '',
      targetImage: '',
      targetUrl: '',
      message: ''
    }))
  }

  const [imageError, setImageError] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await createContactMutation.mutateAsync(formData)
      setSubmittedData({ ...formData })
      setShowThankYou(true)
      // Xóa query parameters trên thanh địa chỉ URL để khi tải lại không bị lặp lại
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', '/contact')
      }
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

  const handleSendAnother = () => {
    setShowThankYou(false)
    setQuoteTarget(null)
    setImageError(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      type: 'general',
      subject: '',
      targetTitle: '',
      targetCode: '',
      targetCategory: '',
      targetImage: '',
      targetUrl: ''
    })
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', '/contact')
    }
  }

  const isQuoteMode = Boolean(quoteTarget && quoteTarget.title)

  const getTypeLabel = () => {
    if (!quoteTarget) return 'Tư Vấn & Báo Giá'
    if (quoteTarget.type === 'project') return 'Báo Giá Dự Án'
    if (quoteTarget.type === 'template') return 'Báo Giá Mẫu Thiết Kế'
    if (quoteTarget.type === 'material') return 'Báo Giá Vật Tư'
    return 'Yêu Cầu Báo Giá'
  }

  const getTypeBadgeIcon = () => {
    if (!quoteTarget) return <AutoAwesome sx={{ fontSize: 16 }} />
    if (quoteTarget.type === 'project') return <HomeWork sx={{ fontSize: 16 }} />
    if (quoteTarget.type === 'template') return <Architecture sx={{ fontSize: 16 }} />
    if (quoteTarget.type === 'material') return <Inventory2 sx={{ fontSize: 16 }} />
    return <AutoAwesome sx={{ fontSize: 16 }} />
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12 items-start">
      {/* Cột trái: Form Báo Giá / Liên Hệ hoặc Màn hình Thành Công */}
      <div
        id="contact-form"
        className="lg:col-span-7 slide-in-left"
        style={{ scrollMarginTop: '120px' }}
      >
        {showThankYou ? (
          /* MÀN HÌNH THÀNH CÔNG (ẨN HOÀN TOÀN MỤC ĐÍNH KÈM & FORM) */
          <div className="p-6 sm:p-8 rounded-3xl border border-emerald-200 bg-white shadow-sm animate-fade-in space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
                <CheckCircle sx={{ fontSize: 40 }} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {submittedData?.targetTitle ? 'Gửi Yêu Cầu Báo Giá Thành Công!' : 'Gửi Tin Nhắn Thành Công!'}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                Cảm ơn <strong>{submittedData?.name || 'Quý khách'}</strong>! Chúng tôi đã ghi nhận đầy đủ thông tin yêu cầu của bạn.
              </p>
            </div>

            {/* Khối tóm tắt thông tin đã tiếp nhận */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Thông tin yêu cầu đã tiếp nhận
              </span>

              {submittedData?.targetTitle && (
                <div className="p-3 bg-white rounded-xl border border-sky-100 shadow-2xs">
                  <span className="text-[11px] font-semibold text-sky-700 uppercase tracking-wide block mb-0.5">
                    Mục yêu cầu báo giá:
                  </span>
                  <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {submittedData.targetTitle}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1.5 text-xs">
                    {submittedData.targetCode && (
                      <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-800 font-semibold border border-sky-100">
                        Mã: {submittedData.targetCode}
                      </span>
                    )}
                    {submittedData.targetCategory && (
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {submittedData.targetCategory}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                <div className="p-2.5 rounded-lg bg-white border border-slate-100">
                  <span className="text-slate-400 text-xs block">Số điện thoại liên hệ:</span>
                  <span className="font-bold text-slate-900">{submittedData?.phone || '--'}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-100">
                  <span className="text-slate-400 text-xs block">Email phản hồi:</span>
                  <span className="font-bold text-slate-900 truncate block">{submittedData?.email || '--'}</span>
                </div>
              </div>

              {submittedData?.message && (
                <div className="p-2.5 rounded-lg bg-white border border-slate-100 text-xs text-slate-600">
                  <span className="text-slate-400 block mb-1">Ghi chú / Lời nhắn:</span>
                  <p className="italic line-clamp-3">&ldquo;{submittedData.message}&rdquo;</p>
                </div>
              )}

              <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-100 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle sx={{ fontSize: 16 }} className="text-emerald-600 shrink-0" />
                <span>Đội ngũ kỹ sư Lai Phát sẽ liên hệ lại trực tiếp với bạn trong vòng 15-30 phút.</span>
              </div>
            </div>

            {/* Các nút điều hướng tiếp theo */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleSendAnother}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
              >
                Gửi thêm yêu cầu khác
              </button>
              <Link
                href="/projects/design-templates"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition-opacity hover:opacity-90 shadow-sm"
                style={{ backgroundColor: BRAND_COLORS.primary.main }}
              >
                <span>Xem thêm mẫu thiết kế</span>
                <ArrowForward sx={{ fontSize: 14 }} />
              </Link>
            </div>
          </div>
        ) : (
          /* MÀN HÌNH NHẬP THÔNG TIN KHI CHƯA GỬI */
          <>
            {/* Banner tiêu đề */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2"
                style={{
                  backgroundColor: BRAND_COLORS.secondary.surface,
                  color: BRAND_COLORS.secondary.dark,
                  border: `1px solid ${BRAND_COLORS.secondary.border}`
                }}
              >
                {getTypeBadgeIcon()}
                <span>{isQuoteMode ? getTypeLabel() : 'Liên hệ trực tiếp'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {isQuoteMode ? 'Nhận Tư Vấn & Bảng Dự Toán Chi Tiết' : (t('contact.form.title') as string)}
              </h2>
              <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                {isQuoteMode
                  ? 'Điền thông tin liên hệ của bạn bên dưới. Đội ngũ kỹ sư Lai Phát sẽ phân tích nhu cầu và gửi bảng báo giá chi tiết trong thời gian sớm nhất.'
                  : 'Để lại thông tin hoặc thắc mắc của bạn, chúng tôi luôn sẵn sàng hỗ trợ và giải đáp 24/7.'}
              </p>
            </div>

            {/* Khối Thông tin Mục được chọn báo giá (Attached Target Card) */}
            {quoteTarget && quoteTarget.title && (
              <div className="mb-6 p-4 sm:p-5 rounded-2xl border bg-gradient-to-br from-sky-50/80 via-white to-blue-50/80 shadow-xs relative overflow-hidden transition-all duration-300"
                style={{ borderColor: BRAND_COLORS.secondary.border }}
              >
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <span className="text-xs font-bold text-sky-800 uppercase tracking-wider flex items-center gap-1.5">
                    {getTypeBadgeIcon()}
                    <span>Mục đính kèm yêu cầu báo giá</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveQuoteTarget}
                    title="Bỏ chọn mục này và chuyển sang liên hệ thông thường"
                    className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-0.5 transition-colors cursor-pointer"
                  >
                    <Close sx={{ fontSize: 16 }} />
                    <span>Bỏ đính kèm</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
                  {quoteTarget.image && !imageError ? (
                    <div className="relative w-full sm:w-28 h-28 sm:h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={quoteTarget.image}
                        alt={quoteTarget.title}
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-sky-100 to-indigo-100 text-sky-600 flex items-center justify-center shrink-0 border border-sky-200 shadow-2xs">
                      {getTypeBadgeIcon()}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug line-clamp-2">
                      {quoteTarget.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-600">
                      {quoteTarget.code && (
                        <span className="font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800">
                          Mã: {quoteTarget.code}
                        </span>
                      )}
                      {quoteTarget.category && (
                        <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                          Phân loại: {quoteTarget.category}
                        </span>
                      )}
                      {quoteTarget.url && (
                        <Link
                          href={quoteTarget.url}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 font-semibold hover:underline ml-auto"
                        >
                          <span>Xem lại chi tiết</span>
                          <OpenInNew sx={{ fontSize: 13 }} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Form điền thông tin */}
            <form className="space-y-5 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs" onSubmit={handleSubmit}>
            {createContactMutation.error && (
              <Alert severity="error" className="mb-4">
                Có lỗi xảy ra:{' '}
                {createContactMutation.error.message || 'Đã xảy ra lỗi không xác định'}
              </Alert>
            )}

            {/* Trường Họ và tên */}
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Họ và tên <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Person sx={{ fontSize: 18 }} />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all"
                  required
                />
              </div>
            </div>

            {/* Hai cột: Số điện thoại & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Số điện thoại <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone sx={{ fontSize: 18 }} />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Ví dụ: 0912 345 678"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Email sx={{ fontSize: 18 }} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Ví dụ: hoten@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Tiêu đề yêu cầu nếu có */}
            {formData.subject && (
              <div>
                <label htmlFor="subject" className="mb-1.5 block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Tiêu đề yêu cầu
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-200"
                />
              </div>
            )}

            {/* Nội dung tin nhắn / Yêu cầu chi tiết */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="message" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Nội dung yêu cầu / Ghi chú thêm <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  {isQuoteMode ? 'Đã điền mẫu tự động, có thể sửa' : 'Nhập thắc mắc của bạn'}
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                placeholder="Nhập yêu cầu chi tiết về công trình, diện tích đất, số tầng dự kiến, ngân sách hoặc thời gian mong muốn..."
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm leading-relaxed text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all"
                required
              />
            </div>

            {/* Nút Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-6 text-white font-bold text-sm sm:text-base shadow-md transition-all hover:opacity-95 cursor-pointer disabled:opacity-60"
                style={{
                  backgroundColor: isLoading ? theme.palette.grey[400] : BRAND_COLORS.primary.main,
                  color: BRAND_COLORS.primary.contrastText
                }}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={18} color="inherit" />
                    <span>Đang xử lý gửi...</span>
                  </>
                ) : (
                  <>
                    <Send sx={{ fontSize: 18 }} style={{ color: BRAND_COLORS.secondary.main }} />
                    <span>{isQuoteMode ? 'Gửi Yêu Cầu Báo Giá Ngay' : 'Gửi Tin Nhắn Liên Hệ'}</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-2.5">
                Thông tin của bạn được bảo mật tuyệt đối. Kỹ sư Lai Phát sẽ liên hệ lại trực tiếp trong 15-30 phút làm việc.
              </p>
            </div>
          </form>
        </>
      )}
    </div>

      {/* Cột phải: Thông tin Liên hệ Trực tiếp & Bản đồ */}
      <div className="lg:col-span-5 slide-in-right space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <span>{t('contact.info.title') as string}</span>
          </h2>

          {/* Trụ sở chính */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-1.5"
              style={{ color: BRAND_COLORS.secondary.dark }}
            >
              {t('contact.info.office.title') as string}
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              {(t('contact.info.office.address') as string).split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < 2 && <br />}
                </span>
              ))}
            </p>
          </div>

          {/* Hotline & Email */}
          <div className="space-y-3 pt-1 border-t border-slate-100">
            <div>
              <span className="text-[11px] text-slate-400 font-semibold uppercase block">Hotline tư vấn</span>
              <a
                href={`tel:${CONTACT.PHONE.replace(/\s+/g, '')}`}
                className="text-base sm:text-lg font-black text-sky-700 hover:text-sky-800 transition-colors inline-flex items-center gap-1.5 mt-0.5"
              >
                <Phone sx={{ fontSize: 18 }} />
                <span>{CONTACT.PHONE}</span>
              </a>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 font-semibold uppercase block">Email hỗ trợ</span>
              <a
                href={`mailto:${CONTACT.EMAIL}`}
                className="text-sm font-semibold text-slate-800 hover:text-sky-600 transition-colors inline-flex items-center gap-1.5 mt-0.5"
              >
                <Email sx={{ fontSize: 16 }} />
                <span>{CONTACT.EMAIL}</span>
              </a>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 font-semibold uppercase block">Website chính thức</span>
              <a
                href={`https://${CONTACT.WEBSITE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-sky-600 hover:underline inline-flex items-center gap-1.5 mt-0.5"
              >
                <span>{CONTACT.WEBSITE}</span>
                <OpenInNew sx={{ fontSize: 13 }} />
              </a>
            </div>
          </div>

          {/* Bản đồ định vị */}
          <div className="pt-2 border-t border-slate-100">
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-2.5"
              style={{ color: BRAND_COLORS.secondary.dark }}
            >
              {t('contact.info.map.title') as string}
            </h3>
            <div className="h-52 overflow-hidden rounded-xl border border-slate-200">
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

          {/* Kênh mạng xã hội */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="font-semibold">Kết nối với chúng tôi:</span>
            <div className="flex gap-2">
              <a
                href={CONTACT.FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold transition-colors"
              >
                Facebook
              </a>
              <span className="px-3 py-1 rounded-lg bg-sky-50 text-sky-600 font-semibold">
                Zalo
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactLoadingSkeleton() {
  return (
    <div className="grid gap-12 lg:grid-cols-12 animate-pulse py-6">
      <div className="lg:col-span-7 space-y-4">
        <div className="h-8 bg-slate-200 rounded-lg w-1/3"></div>
        <div className="h-6 bg-slate-100 rounded-lg w-2/3"></div>
        <div className="h-40 bg-slate-100 rounded-2xl"></div>
        <div className="h-64 bg-slate-100 rounded-2xl"></div>
      </div>
      <div className="lg:col-span-5 space-y-4">
        <div className="h-96 bg-slate-100 rounded-2xl"></div>
      </div>
    </div>
  )
}

export default function ContactPage() {
  const theme = useTheme()
  const { t } = useTranslations()

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
    <Box className="min-h-screen bg-slate-50/50">
      <JsonLd data={contactPageJsonLd} />

      <Container className="pt-0 pb-12 sm:pb-16 space-y-12" sx={{ px: { xs: 2, sm: 4 } }}>
        <div className="fade-in-on">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('contact.title') as string}{' '}
            <span style={{ color: BRAND_COLORS.secondary.dark }}>
              {t('contact.titleHighlight') as string}
            </span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Đội ngũ kiến trúc sư và kỹ sư Lai Phát luôn đồng hành kiến tạo không gian sống mơ ước của bạn.
          </p>
        </div>

        <Suspense fallback={<ContactLoadingSkeleton />}>
          <ContactFormInner />
        </Suspense>
      </Container>
    </Box>
  )
}
