'use client'

import React, { use, useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { useProjectBySlug, useProjects } from '@/hooks/useProjects'
import { ProjectHelpers } from '@/utils/projectHelpers'
import { ProjectDetailPageSkeleton } from '@/components/projects/ProjectPageSkeletons'
import { CONTACT } from '@/constants/contact'
import {
  CalendarToday,
  CheckCircle,
  Close,
  CameraAlt,
  AccessTime,
  PlayArrow,
  Schedule,
  Phone,
  ZoomIn,
  NavigateBefore,
  NavigateNext,
  AssignmentTurnedInOutlined,
  Engineering,
  HomeWork,
  ArrowForward,
  AutoAwesome
} from '@mui/icons-material'
import { Alert, Box, Container } from '@mui/material'
import { BRAND_COLORS } from '@/constants/colors'
import { useBreadcrumb } from '@/contexts/BreadcrumbContext'

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug
  const { data: rawProject, isLoading, isError, error } = useProjectBySlug(slug)
  const { data: allProjectsData } = useProjects()
  const { setCustomTitle } = useBreadcrumb()

  // Gallery state
  const [activeMediaIndex, setActiveMediaIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const project = rawProject ? ProjectHelpers.transformForDetailPage(rawProject) : null

  useEffect(() => {
    if (project?.title) {
      setCustomTitle(project.title)
    }
    return () => {
      setCustomTitle(null)
    }
  }, [project?.title, setCustomTitle])

  // Collect all media items (mainImage + media array)
  const allMedia: string[] = React.useMemo(() => {
    if (!project) return []
    const combined = [project.mainImage, ...(project.media || [])].filter(Boolean) as string[]
    return Array.from(new Set(combined))
  }, [project])

  // Filter other projects for the "Related Projects" section
  const relatedProjects = React.useMemo(() => {
    if (!allProjectsData) return []
    return allProjectsData
      .filter((p) => p.slug !== slug)
      .slice(0, 3)
      .map((p) => ProjectHelpers.transformForHomePage(p))
  }, [allProjectsData, slug])

  // Construct Quote URL carrying project info
  const quoteUrl = React.useMemo(() => {
    if (!project) return '/contact'
    const query = new URLSearchParams({
      type: 'project',
      id: project.id || slug,
      title: project.title,
      code: slug,
      category: project.category || '',
      image: project.mainImage || '',
      url: `/projects/${slug}`
    }).toString()
    return `/contact?${query}`
  }, [project, slug])

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

  if (isLoading) {
    return <ProjectDetailPageSkeleton />
  }

  if (isError) {
    return (
      <Box className="min-h-[60vh] flex items-center justify-center p-6 bg-slate-50">
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Alert severity="error" className="rounded-2xl shadow-sm">
            Lỗi khi tải chi tiết dự án: {error?.message}
          </Alert>
          <div className="mt-4 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors hover:opacity-90"
              style={{ backgroundColor: BRAND_COLORS.primary.main, color: BRAND_COLORS.primary.contrastText }}
            >
              <span>Quay lại danh sách dự án</span>
            </Link>
          </div>
        </Container>
      </Box>
    )
  }

  if (!project) {
    return (
      <Box className="min-h-[60vh] flex items-center justify-center p-6 bg-slate-50">
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }} className="text-center">
          <Alert severity="info" className="rounded-2xl shadow-sm mb-6">
            Không tìm thấy thông tin dự án này hoặc dự án đã được chuyển đổi.
          </Alert>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-colors shadow-sm hover:opacity-90"
            style={{ backgroundColor: BRAND_COLORS.primary.main, color: BRAND_COLORS.primary.contrastText }}
          >
            <span>Khám phá các dự án khác</span>
          </Link>
        </Container>
      </Box>
    )
  }

  const isCompleted = project.statusRaw === 'completed'
  const currentActiveMedia = allMedia[activeMediaIndex] || project.mainImage || '/placeholder.svg'
  const isCurrentVideo = ProjectHelpers.isVideo(currentActiveMedia)

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: BRAND_COLORS.neutral.background, overflowX: 'hidden', width: '100%', pb: 10 }}>
      {/* Container chuẩn maxWidth="lg" khớp chính xác 100% với Header */}
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, pt: 0 }}>
        {/* Top Hero Section: Side-by-side Showcase + Thông tin công trình */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-2xs mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-start">
            {/* Cột trái: Khung xem ảnh vừa vặn (~380px) */}
            <div className="lg:col-span-7 flex flex-col gap-2.5">
              <div className="relative w-full aspect-[16/10] max-h-[380px] rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xs relative group">
                {isCurrentVideo ? (
                  <video
                    src={currentActiveMedia}
                    controls
                    autoPlay={false}
                    className="w-full h-full object-contain"
                    poster={project.mainImage}
                  />
                ) : (
                  <Image
                    src={currentActiveMedia}
                    alt={project.title}
                    fill
                    priority
                    unoptimized
                    className="object-cover group-hover:scale-[1.01] transition-transform duration-500 cursor-pointer"
                    sizes="(max-width: 1024px) 100vw, 680px"
                    onClick={() => setLightboxIndex(activeMediaIndex)}
                  />
                )}

                {/* Huy hiệu đếm ảnh & nút xem lớn */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold pointer-events-auto">
                    <CameraAlt sx={{ fontSize: 13 }} className="text-sky-400" />
                    <span>
                      {activeMediaIndex + 1} / {allMedia.length || 1}
                    </span>
                  </div>

                  {!isCurrentVideo && (
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(activeMediaIndex)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-slate-900 backdrop-blur-md text-white text-[11px] font-medium pointer-events-auto transition-colors cursor-pointer"
                      title="Phóng to ảnh"
                    >
                      <ZoomIn sx={{ fontSize: 14 }} />
                      <span>Xem lớn</span>
                    </button>
                  )}
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
                    const isVid = ProjectHelpers.isVideo(mediaUrl)
                    const isActive = idx === activeMediaIndex
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveMediaIndex(idx)}
                        className={`relative w-15 sm:w-17 aspect-video rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                          isActive
                            ? 'border-sky-500 ring-2 ring-sky-400/30 scale-105 shadow-xs'
                            : 'border-slate-200 opacity-60 hover:opacity-100'
                        }`}
                      >
                        {isVid ? (
                          <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white">
                            <PlayArrow sx={{ fontSize: 16 }} />
                          </div>
                        ) : (
                          <Image
                            src={mediaUrl}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            unoptimized
                            className="object-cover"
                            sizes="68px"
                          />
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Cột phải: Tiêu đề dự án, Phân loại, Trạng thái, 4 Chỉ số đồng bộ & Nút hành động */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-3.5">
              <div>
                {/* Thẻ Phân loại & Trạng thái */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200/90">
                    <HomeWork sx={{ fontSize: 13 }} className="text-sky-600" />
                    <span>{project.category}</span>
                  </span>

                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/90">
                      <CheckCircle sx={{ fontSize: 13 }} className="text-emerald-600" />
                      <span>Hoàn thành</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/90">
                      <Schedule sx={{ fontSize: 13 }} className="text-amber-600" />
                      <span>Đang triển khai</span>
                    </span>
                  )}
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug mb-3">
                  {project.title}
                </h1>

                {/* 4 Chỉ số nhanh: Đồng bộ 100% về màu Brand Sky/Navy - Loại bỏ màu lộn xộn */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-150 mb-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <CalendarToday sx={{ fontSize: 14 }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Khởi công</p>
                      <p className="text-xs font-bold text-slate-800 truncate">{project.startDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <CheckCircle sx={{ fontSize: 14 }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Bàn giao</p>
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {project.endDate || 'Đang triển khai'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <AccessTime sx={{ fontSize: 14 }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Thời gian</p>
                      <p className="text-xs font-bold text-slate-800 truncate">{project.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <Engineering sx={{ fontSize: 14 }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">Quy mô</p>
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {project.workingScope.length} Hạng mục
                      </p>
                    </div>
                  </div>
                </div>

                {/* Thông tin đơn vị thi công & địa điểm */}
                <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                  <div className="flex justify-between py-1 border-t border-slate-100">
                    <span className="text-slate-400">Đơn vị thi công:</span>
                    <span className="font-bold text-slate-800">Xây Dựng Lai Phát</span>
                  </div>
                  <div className="flex justify-between py-1 border-t border-slate-100">
                    <span className="text-slate-400">Phân loại công trình:</span>
                    <span className="font-semibold text-slate-800">{project.category}</span>
                  </div>
                  {project.location && (
                    <div className="flex justify-between py-1 border-t border-slate-100">
                      <span className="text-slate-400">Địa điểm thực hiện:</span>
                      <span className="font-semibold text-slate-800">{project.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Nút Yêu cầu báo giá bên góc phải */}
              <div className="flex justify-end pt-2 mt-auto">
                <Link
                  href={quoteUrl}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition-all shadow-2xs hover:opacity-90 hover:shadow-md cursor-pointer"
                  style={{ backgroundColor: BRAND_COLORS.primary.main }}
                >
                  <span>Yêu cầu báo giá dự án này</span>
                  <ArrowForward sx={{ fontSize: 16 }} style={{ color: BRAND_COLORS.secondary.main }} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bố cục nội dung chính bên dưới */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Cột trái (8 cột) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Khối: Hạng mục & Chi tiết công việc thực hiện */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <AssignmentTurnedInOutlined sx={{ fontSize: 18 }} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Hạng mục & Chi tiết công việc thực hiện</h2>
                </div>
              </div>

              {/* Phạm vi thi công */}
              {project.workingScope.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Phạm vi thi công
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.workingScope.map((scope, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold"
                      >
                        <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                        <span>{scope}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Chi tiết công việc */}
              {project.details.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Chi tiết công việc triển khai
                  </h3>
                  <div className="space-y-2">
                    {project.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50/80 border border-slate-100"
                      >
                        <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                          {idx + 1}
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed flex-1">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Cột phải (4 cột) */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-6">
            {/* Khối: Hỗ trợ tư vấn trực tiếp (Hiển thị trên mobile/tablet để khách cuộn xuống cuối dễ gọi & nhận báo giá, ẩn trên desktop) */}
            <div className="block lg:hidden bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Phone sx={{ fontSize: 15 }} className="text-sky-600" />
                <span>Tư vấn & Khảo sát công trình</span>
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-3.5">
                Bạn có nhu cầu thi công hoặc cần dự toán chi tiết cho công trình tương tự? Liên hệ trực tiếp với kỹ sư Lai Phát.
              </p>
              <div className="space-y-2">
                <Link
                  href={quoteUrl}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs hover:opacity-90"
                  style={{ backgroundColor: BRAND_COLORS.primary.main, color: BRAND_COLORS.primary.contrastText }}
                >
                  <ArrowForward sx={{ fontSize: 14 }} style={{ color: BRAND_COLORS.secondary.main }} />
                  <span>Yêu cầu báo giá dự án này</span>
                </Link>
                <a
                  href={`tel:${CONTACT.PHONE.replace(/\s+/g, '')}`}
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Phone sx={{ fontSize: 14 }} className="text-sky-600" />
                  <span>Gọi hotline: {CONTACT.PHONE}</span>
                </a>
              </div>
            </div>

            {/* Khối: Khám phá thêm mẫu thiết kế */}
            <div
              className="rounded-2xl p-5 shadow-xs relative overflow-hidden border"
              style={{
                backgroundColor: BRAND_COLORS.primary.main,
                color: BRAND_COLORS.primary.contrastText,
                borderColor: `${BRAND_COLORS.secondary.main}33`
              }}
            >
              <div
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider mb-1.5"
                style={{ color: BRAND_COLORS.secondary.main }}
              >
                <AutoAwesome sx={{ fontSize: 13 }} />
                <span>Ý tưởng thiết kế</span>
              </div>
              <h4 className="text-sm font-bold mb-1.5 text-white">Xem thêm các mẫu thiết kế nhà đẹp</h4>
              <p className="text-slate-300 text-xs leading-relaxed mb-3.5">
                Khám phá kho mẫu thiết kế nhà phố, biệt thự, nhà vườn hiện đại do Lai Phát thiết kế.
              </p>
              <Link
                href="/projects/design-templates"
                className="w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-opacity hover:opacity-90 shadow-sm"
                style={{ backgroundColor: BRAND_COLORS.secondary.main, color: BRAND_COLORS.primary.main }}
              >
                <span>Xem mẫu thiết kế</span>
                <ArrowForward sx={{ fontSize: 13 }} />
              </Link>
            </div>
          </div>
        </div>

        {/* Dự án tiêu biểu khác */}
        {relatedProjects.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
              <div>
                <span className="text-xs font-bold text-brand-accent-dark uppercase tracking-wider">
                  Dự án khác
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  Công trình tiêu biểu khác của Lai Phát
                </h2>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-accent-dark hover:underline transition-colors"
              >
                <span>Xem tất cả</span>
                <ArrowForward sx={{ fontSize: 13 }} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedProjects.map((rel) => (
                <Link key={rel.id} href={rel.url} className="group block">
                  <div className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300">
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                      <Image
                        src={rel.image || '/placeholder.svg'}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <span
                        className="absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-md text-white backdrop-blur-2xs"
                        style={{ backgroundColor: `${BRAND_COLORS.primary.main}cc` }}
                      >
                        {rel.category}
                      </span>
                    </div>

                    <div className="p-3">
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1 group-hover:text-sky-600 transition-colors mb-1">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1">{rel.description}</p>
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
          className="fixed inset-0 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-fade-in select-none"
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
              {project?.title}
            </span>
          </div>

          {/* Lightbox Main Stage (Click background to close) */}
          <div
            className="relative flex-1 flex items-center justify-center my-2 sm:my-3 overflow-hidden cursor-pointer"
            onClick={() => setLightboxIndex(null)}
          >
            {allMedia.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex((prev) =>
                    prev !== null ? (prev - 1 + allMedia.length) % allMedia.length : null
                  )
                }}
                className="absolute left-2 sm:left-4 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 hover:scale-110 shadow-xl"
                title="Ảnh trước (Mũi tên trái)"
                aria-label="Ảnh trước"
              >
                <NavigateBefore sx={{ fontSize: 32 }} />
              </button>
            )}

            <div
              className="relative w-full h-full max-w-5xl flex items-center justify-center p-2 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {ProjectHelpers.isVideo(allMedia[lightboxIndex]) ? (
                <video
                  src={allMedia[lightboxIndex]}
                  controls
                  autoPlay
                  className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
                />
              ) : (
                <Image
                  src={allMedia[lightboxIndex]}
                  alt="Hình ảnh dự án phóng to"
                  fill
                  unoptimized
                  className="object-contain rounded-xl shadow-2xl"
                  sizes="100vw"
                  priority
                />
              )}
            </div>

            {allMedia.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex((prev) => (prev !== null ? (prev + 1) % allMedia.length : null))
                }}
                className="absolute right-2 sm:right-4 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 hover:scale-110 shadow-xl"
                title="Ảnh kế tiếp (Mũi tên phải)"
                aria-label="Ảnh kế tiếp"
              >
                <NavigateNext sx={{ fontSize: 32 }} />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Thumbnail Strip */}
          {allMedia.length > 1 && (
            <div
              className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              {allMedia.map((thumbUrl, idx) => {
                const isActive = idx === lightboxIndex
                const isVid = ProjectHelpers.isVideo(thumbUrl)
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setLightboxIndex(idx)
                    }}
                    className={`relative w-14 sm:w-16 aspect-video rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      isActive
                        ? 'border-sky-400 ring-2 ring-sky-300/40 scale-110'
                        : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    {isVid ? (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white">
                        <PlayArrow sx={{ fontSize: 16 }} />
                      </div>
                    ) : (
                      <Image
                        src={thumbUrl}
                        alt={`Thumb ${idx + 1}`}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="64px"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          )}

          <div
            className="text-center text-slate-400 text-[11px] pb-1 cursor-pointer"
            onClick={() => setLightboxIndex(null)}
          >
            Nhấn phím Esc hoặc click vùng tối bên ngoài ảnh để đóng
          </div>
        </div>,
        document.body
      )}
    </Box>
  )
}
