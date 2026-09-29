'use client'

import React, { use, useState, useEffect, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowBack,
  CheckCircle,
  Phone,
  Star,
  ArrowForward,
  Close,
  ZoomIn,
  NavigateBefore,
  NavigateNext,
  CameraAlt,
  HomeWork,
  Palette,
  SquareFoot,
  Stairs,
  Hotel,
  Bathtub,
  AssignmentTurnedInOutlined,
  DescriptionOutlined,
  AutoAwesome
} from '@mui/icons-material'
import { Box, Container, Alert } from '@mui/material'
import { useDesignTemplateBySlug, useDesignTemplates } from '@/hooks/useDesignTemplates'
import { useBreadcrumb } from '@/contexts/BreadcrumbContext'
import { BRAND_COLORS } from '@/constants/colors'
import { CONTACT } from '@/constants/contact'
import { DesignTemplate } from '@/types/designTemplate'
import { ProjectDetailPageSkeleton } from '@/components/projects/ProjectPageSkeletons'

function formatCurrency(amount: number): string {
  if (amount >= 1000000000) {
    const billions = amount / 1000000000
    return `${billions % 1 === 0 ? billions : billions.toFixed(1)} tỷ đ`
  }
  if (amount >= 1000000) {
    const millions = amount / 1000000
    return `${millions % 1 === 0 ? millions : millions.toFixed(0)} triệu đ`
  }
  return new Intl.NumberFormat('vi-VN').format(amount) + ' đ'
}

export default function DesignTemplateDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug

  const { data: template, isLoading, isError, error } = useDesignTemplateBySlug(slug)
  const { data: allTemplates } = useDesignTemplates()
  const { setCustomTitle } = useBreadcrumb()

  // Gallery state
  const [activeMediaIndex, setActiveMediaIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Cập nhật Breadcrumb title khi template được tải
  useEffect(() => {
    if (template?.title) {
      setCustomTitle(template.title)
    }
    return () => {
      setCustomTitle(null)
    }
  }, [template?.title, setCustomTitle])

  // Tập hợp danh sách tất cả các ảnh của mẫu thiết kế
  const allMedia: string[] = useMemo(() => {
    if (!template) return []
    const combined = [template.mainImage, ...(template.images || [])].filter(Boolean) as string[]
    const unique = Array.from(new Set(combined))
    return unique.length > 0 ? unique : ['/banner/banner_home2.jpg']
  }, [template])

  // Reset index ảnh khi slug thay đổi
  useEffect(() => {
    setActiveMediaIndex(0)
  }, [slug])

  // Construct Quote URL carrying template info
  const quoteUrl = useMemo(() => {
    if (!template) return '/contact'
    const query = new URLSearchParams({
      type: 'template',
      id: template._id || template.id || slug,
      title: template.title,
      code: template.code || slug,
      category: template.categoryName || template.styleName || '',
      image: template.mainImage || allMedia[0] || '',
      url: `/projects/design-templates/${slug}`
    }).toString()
    return `/contact?${query}`
  }, [template, slug, allMedia])

  // Lightbox keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null || allMedia.length === 0) return
      if (e.key === 'Escape') {
        setLightboxIndex(null)
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + allMedia.length) % allMedia.length : null))
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % allMedia.length : null))
      }
    },
    [lightboxIndex, allMedia.length]
  )

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxIndex, handleKeyDown])

  // Danh sách các mẫu thiết kế gợi ý khác
  const relatedTemplates = useMemo(() => {
    if (!allTemplates || !template) return []
    return allTemplates
      .filter((item) => (item.slug || item.id || item.code) !== (template.slug || template.id || template.code))
      .slice(0, 3)
  }, [allTemplates, template])

  if (isLoading) {
    return <ProjectDetailPageSkeleton />
  }

  if (isError) {
    return (
      <Box className="min-h-[60vh] flex items-center justify-center p-6 bg-slate-50">
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Alert severity="error" className="rounded-2xl shadow-sm mb-4">
            Lỗi khi tải chi tiết mẫu thiết kế: {error?.message}
          </Alert>
          <div className="text-center">
            <Link
              href="/projects/design-templates"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors hover:opacity-90"
              style={{ backgroundColor: BRAND_COLORS.primary.main, color: BRAND_COLORS.primary.contrastText }}
            >
              <ArrowBack sx={{ fontSize: 18 }} />
              <span>Quay lại danh sách mẫu thiết kế</span>
            </Link>
          </div>
        </Container>
      </Box>
    )
  }

  if (!template) {
    return (
      <Box className="min-h-[60vh] flex items-center justify-center p-6 bg-slate-50">
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }} className="text-center">
          <Alert severity="info" className="rounded-2xl shadow-sm mb-6">
            Không tìm thấy thông tin mẫu thiết kế này hoặc mẫu thiết kế đã ngừng kích hoạt.
          </Alert>
          <Link
            href="/projects/design-templates"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-colors shadow-sm hover:opacity-90"
            style={{ backgroundColor: BRAND_COLORS.primary.main, color: BRAND_COLORS.primary.contrastText }}
          >
            <ArrowBack sx={{ fontSize: 18 }} />
            <span>Khám phá các mẫu thiết kế khác</span>
          </Link>
        </Container>
      </Box>
    )
  }

  const currentMediaUrl = allMedia[activeMediaIndex] || template.mainImage || '/banner/banner_home2.jpg'

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: BRAND_COLORS.neutral.background, overflowX: 'hidden', width: '100%', pb: 12 }}>
      {/* Container chuẩn maxWidth="lg" khớp chính xác 100% với Header */}
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, pt: 0 }}>
        {/* Top Hero Section: Bố cục 2 cột side-by-side chuẩn trang chi tiết Project */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-2xs mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-start">
            {/* Cột trái (7 cột): Khung xem ảnh vừa vặn (~380px) + Phóng to + Bộ chuyển ảnh */}
            <div className="lg:col-span-7 flex flex-col gap-2.5">
              <div className="relative w-full aspect-[16/10] max-h-[380px] rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xs relative group">
                <Image
                  src={currentMediaUrl}
                  alt={template.title}
                  fill
                  priority
                  unoptimized
                  className="object-cover group-hover:scale-[1.01] transition-transform duration-500 cursor-pointer"
                  sizes="(max-width: 1024px) 100vw, 680px"
                  onClick={() => setLightboxIndex(activeMediaIndex)}
                />

                {/* Huy hiệu đếm ảnh & nút xem lớn */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold pointer-events-auto">
                    <CameraAlt sx={{ fontSize: 13 }} className="text-sky-400" />
                    <span>
                      {activeMediaIndex + 1} / {allMedia.length || 1}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setLightboxIndex(activeMediaIndex)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-slate-900 backdrop-blur-md text-white text-[11px] font-medium pointer-events-auto transition-colors cursor-pointer"
                    title="Phóng to ảnh"
                  >
                    <ZoomIn sx={{ fontSize: 14 }} />
                    <span>Xem lớn</span>
                  </button>
                </div>

                {/* Mũi tên chuyển ảnh */}
                {allMedia.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setActiveMediaIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length)}
                      aria-label="Hình trước"
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/75 hover:bg-slate-900 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-110 shadow-md cursor-pointer z-10"
                    >
                      <NavigateBefore sx={{ fontSize: 22 }} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMediaIndex((prev) => (prev + 1) % allMedia.length)}
                      aria-label="Hình kế tiếp"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/75 hover:bg-slate-900 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-110 shadow-md cursor-pointer z-10"
                    >
                      <NavigateNext sx={{ fontSize: 22 }} />
                    </button>
                  </>
                )}
              </div>

              {/* Dải Thumbnail nhỏ phía dưới */}
              {allMedia.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-300">
                  {allMedia.map((mediaUrl, idx) => {
                    const isActive = idx === activeMediaIndex
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveMediaIndex(idx)}
                        className={`relative w-16 sm:w-20 aspect-video rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                          isActive
                            ? 'border-sky-500 ring-2 ring-sky-400/30 scale-105 shadow-xs'
                            : 'border-slate-200 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={mediaUrl}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          unoptimized
                          className="object-cover"
                          sizes="80px"
                        />
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Cột phải (5 cột): Tiêu đề, Phân loại, 4 Chỉ số nhanh & Chi phí ước tính */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-3.5">
              <div>
                {/* Thẻ Phân loại & Phong cách */}
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200/90">
                    <HomeWork sx={{ fontSize: 13 }} className="text-sky-600" />
                    <span>{template.categoryName || 'Mẫu thiết kế'}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/90">
                    <Palette sx={{ fontSize: 13 }} className="text-emerald-600" />
                    <span>{template.styleName || template.style}</span>
                  </span>

                  {template.featured && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-300">
                      <Star sx={{ fontSize: 13 }} className="text-amber-500" />
                      <span>Nổi bật</span>
                    </span>
                  )}
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug mb-3">
                  {template.title}
                </h1>

                {/* 4 Chỉ số kỹ thuật nhanh: Đồng bộ theo mẫu project detail */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-150 mb-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <SquareFoot sx={{ fontSize: 15 }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Diện tích XD</p>
                      <p className="text-xs font-bold text-slate-800 truncate">{template.area} m²</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <Stairs sx={{ fontSize: 15 }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Quy mô</p>
                      <p className="text-xs font-bold text-slate-800 truncate">{template.floors} tầng</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <Hotel sx={{ fontSize: 15 }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Phòng ngủ</p>
                      <p className="text-xs font-bold text-slate-800 truncate">{template.bedrooms} PN</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <Bathtub sx={{ fontSize: 15 }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Phòng vệ sinh</p>
                      <p className="text-xs font-bold text-slate-800 truncate">{template.bathrooms} WC</p>
                    </div>
                  </div>
                </div>

                {/* Thông tin quy cách kiến trúc & Chi phí */}
                <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                  {template.landArea && (
                    <div className="flex justify-between py-1 border-t border-slate-100">
                      <span className="text-slate-400">Khuôn viên đất:</span>
                      <span className="font-semibold text-slate-800">{template.landArea} m²</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1 border-t border-slate-100">
                    <span className="text-slate-400">Đơn vị thiết kế:</span>
                    <span className="font-bold text-slate-800">Kiến Trúc & Xây Dựng Lai Phát</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-t border-slate-100">
                    <span className="text-slate-500 font-medium">Chi phí thi công ước tính:</span>
                    <span className="text-base sm:text-lg font-extrabold text-cyan-900">
                      ~{formatCurrency(template.constructionCostEstimated || template.designCost || 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Nút Nhận báo giá ở góc dưới */}
              <div className="hidden sm:flex justify-end pt-2 mt-auto">
                <Link
                  href={quoteUrl}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition-all shadow-2xs hover:opacity-90 hover:shadow-md cursor-pointer"
                  style={{ backgroundColor: BRAND_COLORS.primary.main }}
                >
                  <span>Nhận báo giá mẫu này</span>
                  <ArrowForward sx={{ fontSize: 16 }} style={{ color: BRAND_COLORS.secondary.main }} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bố cục nội dung chi tiết bên dưới */}
        <div className="space-y-6">
          {/* Khối 1: Mô Tả (trải rộng full width thanh lịch ở trên) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <DescriptionOutlined sx={{ fontSize: 18 }} />
              </div>
              <h2 className="text-base font-bold text-slate-900">Mô Tả</h2>
            </div>

            <div className="text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              <p>{template.description}</p>
            </div>
          </div>

          {/* Cặp khối 2 & 3 cân đối 50/50: Bảng thông số (Trái) & Đặc điểm tiện ích (Phải) */}
          <div className={`grid grid-cols-1 ${template.features && template.features.length > 0 ? 'lg:grid-cols-2' : ''} gap-5 items-stretch`}>
            {/* Cột trái: Bảng Thông Số Kỹ Thuật Chi Tiết */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <AssignmentTurnedInOutlined sx={{ fontSize: 18 }} />
                  </div>
                  <h2 className="text-base font-bold text-slate-900">Bảng Thông Số Kỹ Thuật Chi Tiết</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                    <span className="text-[11px] text-slate-400 block mb-0.5 font-medium">Diện tích sàn XD</span>
                    <span className="text-sm sm:text-base font-bold text-slate-800">{template.area} m²</span>
                  </div>
                  {template.landArea ? (
                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                      <span className="text-[11px] text-slate-400 block mb-0.5 font-medium">Khuôn viên đất</span>
                      <span className="text-sm sm:text-base font-bold text-slate-800">{template.landArea} m²</span>
                    </div>
                  ) : null}
                  <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                    <span className="text-[11px] text-slate-400 block mb-0.5 font-medium">Quy mô</span>
                    <span className="text-sm sm:text-base font-bold text-slate-800">{template.floors} tầng</span>
                  </div>
                  <div className={`p-3 bg-slate-50/80 rounded-xl border border-slate-100 ${!template.landArea ? 'col-span-2 sm:col-span-1' : ''}`}>
                    <span className="text-[11px] text-slate-400 block mb-0.5 font-medium">Phong cách</span>
                    <span className="text-sm sm:text-base font-bold text-cyan-800 truncate block">{template.styleName || template.style}</span>
                  </div>
                  <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                    <span className="text-[11px] text-slate-400 block mb-0.5 font-medium">Số phòng ngủ</span>
                    <span className="text-sm sm:text-base font-bold text-slate-800">{template.bedrooms} phòng</span>
                  </div>
                  <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                    <span className="text-[11px] text-slate-400 block mb-0.5 font-medium">Phòng vệ sinh</span>
                    <span className="text-sm sm:text-base font-bold text-slate-800">{template.bathrooms} WC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cột phải: Đặc Điểm & Tiện Ích Nổi Bật (danh sách xếp thẳng từ trên xuống) */}
            {template.features && template.features.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3.5">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <AutoAwesome sx={{ fontSize: 18 }} />
                    </div>
                    <h2 className="text-base font-bold text-slate-900">Đặc Điểm & Tiện Ích Nổi Bật</h2>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {template.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-slate-100/70 transition-colors"
                      >
                        <CheckCircle sx={{ fontSize: 17, color: BRAND_COLORS.secondary.dark, mt: '2px', shrink: 0 }} />
                        <span className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>


            {/* Khối hỗ trợ tư vấn & dự toán chi phí (Chỉ hiển thị trên mobile/tablet, ẩn trên desktop) */}
            <div className="block lg:hidden bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Phone sx={{ fontSize: 15 }} className="text-sky-600" />
                <span>Tư Vấn & Dự Toán Chi Phí</span>
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-3.5">
                Bạn quan tâm đến mẫu thiết kế này và muốn nhận bảng dự toán thi công chi tiết hoặc xem hồ sơ bản vẽ? Liên hệ trực tiếp với kỹ sư Lai Phát.
              </p>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-150 mb-3.5 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Dự toán thi công:</span>
                  <span className="font-bold text-slate-900">
                    ~{formatCurrency(template.constructionCostEstimated || 0)}
                  </span>
                </div>
                {template.designCost > 0 && (
                  <div className="flex justify-between py-1 border-t border-slate-100">
                    <span className="text-slate-500">Đơn giá thiết kế:</span>
                    <span className="font-semibold text-cyan-800">
                      ~{formatCurrency(template.designCost)}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Link
                  href={quoteUrl}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: BRAND_COLORS.primary.main, color: BRAND_COLORS.primary.contrastText }}
                >
                  <span>Yêu cầu báo giá mẫu này</span>
                  <ArrowForward sx={{ fontSize: 14 }} style={{ color: BRAND_COLORS.secondary.main }} />
                </Link>

                <a
                  href={`tel:${CONTACT.PHONE.replace(/\s+/g, '')}`}
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <Phone sx={{ fontSize: 14 }} className="text-sky-600" />
                  <span>Gọi hotline: {CONTACT.PHONE}</span>
                </a>
              </div>
            </div>
          </div>

        {/* Khối chân trang: Mẫu thiết kế tương tự gợi ý khác (Giống related projects) */}
        {relatedTemplates.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
              <div>
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                  Mẫu thiết kế khác
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  Phương án kiến trúc tiêu biểu khác của Lai Phát
                </h2>
              </div>
              <Link
                href="/projects/design-templates"
                className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:underline transition-colors"
              >
                <span>Xem tất cả</span>
                <ArrowForward sx={{ fontSize: 13 }} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTemplates.map((rel: DesignTemplate) => (
                <Link
                  key={rel.id}
                  href={`/projects/design-templates/${rel.slug || rel.code || rel.id}`}
                  className="group block"
                >
                  <div className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300">
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                      <Image
                        src={rel.mainImage || '/banner/banner_home2.jpg'}
                        alt={rel.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <span
                        className="absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-md text-white backdrop-blur-2xs"
                        style={{ backgroundColor: `${BRAND_COLORS.primary.main}cc` }}
                      >
                        {rel.categoryName || 'Mẫu thiết kế'}
                      </span>
                    </div>

                    <div className="p-3">
                      <div className="text-[11px] font-semibold text-cyan-700 mb-0.5">
                        Mã: {rel.code}
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1 group-hover:text-sky-600 transition-colors mb-1">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1 mb-2">{rel.description}</p>
                      <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-100">
                        <span className="font-bold text-emerald-600">
                          ~{formatCurrency(rel.constructionCostEstimated || rel.designCost || 0)}
                        </span>
                        <span className="text-sky-600 font-medium flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                          <span>Chi tiết</span>
                          <ArrowForward sx={{ fontSize: 12 }} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>

      {/* Fullscreen Lightbox Modal via Portal directly to body */}
      {mounted && lightboxIndex !== null && allMedia.length > 0 && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 select-none animate-fade-in"
          style={{ zIndex: 99999 }}
          onClick={() => setLightboxIndex(null)}
        >
          {/* Prominent Floating Close Button (Top-Right) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex(null)
            }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/20 hover:bg-red-600/90 active:bg-red-700 text-white transition-all cursor-pointer shadow-2xl backdrop-blur-md hover:scale-105 border border-white/30"
            title="Đóng (Esc hoặc click vùng tối)"
            aria-label="Đóng xem lớn"
          >
            <Close sx={{ fontSize: { xs: 22, sm: 26 } }} />
            <span className="text-xs sm:text-sm font-semibold pr-1">Đóng</span>
          </button>

          {/* Lightbox Header / Counter */}
          <div
            className="flex items-center gap-3 text-white z-20 pr-24 pt-1 sm:pt-0"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs sm:text-sm font-semibold text-slate-200 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              {lightboxIndex + 1} / {allMedia.length}
            </span>
            <span className="hidden sm:inline-block text-xs text-slate-400">|</span>
            <span className="hidden sm:inline-block text-xs text-slate-300 max-w-md truncate font-medium">
              {template?.title}
            </span>
          </div>

          {/* Main Stage (Center Image) */}
          <div
            className="relative flex-1 w-full max-h-[82vh] my-auto flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-5xl">
              <Image
                src={allMedia[lightboxIndex]}
                alt={`Ảnh phóng to ${lightboxIndex + 1}`}
                fill
                unoptimized
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Prev / Next Buttons */}
            {allMedia.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + allMedia.length) % allMedia.length : 0))
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 shadow-xl cursor-pointer border border-white/20"
                  aria-label="Ảnh trước"
                >
                  <NavigateBefore sx={{ fontSize: { xs: 28, sm: 32 } }} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % allMedia.length : 0))
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 shadow-xl cursor-pointer border border-white/20"
                  aria-label="Ảnh sau"
                >
                  <NavigateNext sx={{ fontSize: { xs: 28, sm: 32 } }} />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Footer Thumbnails */}
          {allMedia.length > 1 && (
            <div
              className="flex justify-center items-center gap-2 overflow-x-auto py-2 z-20 max-w-2xl mx-auto scrollbar-none"
              onClick={(e) => e.stopPropagation()}
            >
              {allMedia.map((mediaUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative w-14 sm:w-16 aspect-video rounded-md overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    idx === lightboxIndex
                      ? 'border-sky-400 scale-110 shadow-lg ring-2 ring-sky-400/50'
                      : 'border-white/30 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={mediaUrl} alt="" fill unoptimized className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>,
        document.body
      )}
    </Box>
  )
}
