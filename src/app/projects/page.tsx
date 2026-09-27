'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useProjects } from '@/hooks/useProjects'
import { ProjectHelpers } from '@/utils/projectHelpers'
import { ProjectsListPageSkeleton } from '@/components/projects/ProjectPageSkeletons'
import Image from 'next/image'
import Link from 'next/link'
import {
  Build,
  Search,
  KeyboardArrowDown,
  Close,
  CheckCircleOutline,
  ArrowForward,
  Category,
  Assignment,
  Tune,
  RestartAlt,
  CalendarToday,
  FolderOpen
} from '@mui/icons-material'
import { Alert, Box, Pagination, Container } from '@mui/material'
import { BRAND_COLORS } from '@/constants/colors'

export default function ProjectsPage() {
  const { data, isLoading, error } = useProjects()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 6

  const filterDropdownRef = useRef<HTMLDivElement>(null)

  const allProjects = (data || []).map(project => ProjectHelpers.transformForHomePage(project))

  const t = (key: string): string => {
    const translations: Record<string, string> = {
      'home.projects.viewDetail': 'Xem chi tiết',
      'home.projects.completedOn': 'Hoàn thành',
      'home.projects.startedOn': 'Bắt đầu',
      'home.projects.completed': 'Dự án hoàn thành',
      'home.projects.inProgress': 'Đang triển khai'
    }
    return translations[key] || key
  }

  // Tự động đóng popup bộ lọc khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setIsFilterExpanded(false)
      }
    }
    if (isFilterExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isFilterExpanded])

  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = !searchTerm ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategories.length === 0 ||
      selectedCategories.includes(project.categorySlug)

    const matchesStatus = selectedStatuses.length === 0 ||
      selectedStatuses.includes(project.statusRaw)

    return matchesSearch && matchesCategory && matchesStatus
  })

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const startIndex = (currentPage - 1) * projectsPerPage
  const currentProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage)

  // Danh mục phân loại
  const defaultCategories = [
    { value: 'nha-dan-dung', label: 'Nhà dân dụng' },
    { value: 'cong-trinh-thuong-mai', label: 'Công trình thương mại' },
    { value: 'cong-trinh-cong-nghiep', label: 'Công trình công nghiệp' },
    { value: 'ha-tang-ky-thuat', label: 'Hạ tầng kỹ thuật' }
  ]

  // Gom thêm category từ data nếu có
  const extraCategories: { value: string; label: string }[] = []
  allProjects.forEach(p => {
    if (p.categorySlug && !defaultCategories.some(c => c.value === p.categorySlug)) {
      if (!extraCategories.some(c => c.value === p.categorySlug)) {
        extraCategories.push({
          value: p.categorySlug,
          label: p.category || p.categorySlug
        })
      }
    }
  })

  const categoriesWithCount = [...defaultCategories, ...extraCategories].map(cat => ({
    ...cat,
    count: allProjects.filter(p => p.categorySlug === cat.value).length
  }))

  // Trạng thái dự án
  const statusesWithCount = [
    { value: 'completed', label: 'Hoàn thành', count: allProjects.filter(p => p.statusRaw === 'completed').length },
    { value: 'in-progress', label: 'Đang triển khai', count: allProjects.filter(p => p.statusRaw === 'in-progress').length }
  ]

  const activeFilterCount = (selectedCategories.length > 0 ? 1 : 0) + (selectedStatuses.length > 0 ? 1 : 0)
  const hasActiveFilters = Boolean(searchTerm.trim()) || selectedCategories.length > 0 || selectedStatuses.length > 0

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategories, selectedStatuses])

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
    const projectsSection = document.getElementById('projects-grid-section')
    projectsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedCategories([])
    setSelectedStatuses([])
  }

  const handleToggleCategory = (value: string) => {
    setSelectedCategories(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  const handleToggleStatus = (value: string) => {
    setSelectedStatuses(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  if (isLoading) {
    return <ProjectsListPageSkeleton />
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, px: { xs: 2, sm: 3 } }}>
        <Alert severity="error">
          Lỗi khi tải danh sách dự án: {error?.message || 'Không thể tải dữ liệu'}
        </Alert>
      </Container>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: BRAND_COLORS.neutral.background, overflowX: 'hidden', width: '100%', pb: 10 }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, pt: { xs: 2.5, md: 4 } }}>
        {/* Thanh điều khiển: Bên trái đếm số lượng, bên phải thu gọn Ô tìm kiếm + Nút Bộ lọc */}
        <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 relative">
          {/* Thông tin số lượng */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
            <span>
              Hiển thị <strong className="text-slate-900 font-semibold">{currentProjects.length}</strong> trong tổng số{' '}
              <strong className="text-slate-900 font-semibold">{filteredProjects.length}</strong> dự án
            </span>
          </div>

          {/* Cụm Tìm kiếm + Nút Bộ lọc thu gọn ở góc bên phải (Cố định chiều ngang đồng nhất với Box lọc) */}
          <div className="relative w-full sm:w-[400px]" ref={filterDropdownRef}>
            {/* Hàng trên: Input tìm kiếm (flex-1) + Nút bộ lọc */}
            <div className="flex items-center gap-2 w-full">
              <div className="relative flex-1 min-w-0">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  sx={{ fontSize: 18 }}
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm dự án..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-9.5 pl-9 pr-8 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-white hover:bg-slate-50 focus:bg-white rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none shadow-2xs"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Xóa tìm kiếm"
                  >
                    <Close sx={{ fontSize: 14 }} />
                  </button>
                )}
              </div>

              {/* Nút Bộ lọc gọn gàng */}
              <button
                type="button"
                onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                className={`h-9.5 px-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shadow-2xs shrink-0 ${
                  isFilterExpanded || activeFilterCount > 0
                    ? 'bg-cyan-50 text-cyan-800 border-cyan-400 font-semibold'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <Tune sx={{ fontSize: 16 }} className={isFilterExpanded || activeFilterCount > 0 ? 'text-cyan-600' : 'text-slate-500'} />
                <span>Bộ lọc</span>
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-cyan-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {activeFilterCount}
                  </span>
                )}
                <KeyboardArrowDown
                  sx={{ fontSize: 16 }}
                  className={`text-slate-400 transition-transform duration-200 shrink-0 ${
                    isFilterExpanded ? 'rotate-180 text-cyan-600' : ''
                  }`}
                />
              </button>
            </div>

            {/* Popup Bộ lọc thả xuống góc bên phải: Chiều ngang bằng chính xác 100% với hàng trên */}
            {isFilterExpanded && (
              <div className="absolute left-0 right-0 top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50">
                {/* Header popup */}
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-slate-800">
                    <Tune sx={{ fontSize: 16 }} className="text-cyan-600" />
                    <span>Bộ lọc chi tiết</span>
                  </div>
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="text-xs text-rose-600 hover:text-rose-700 font-medium cursor-pointer"
                    >
                      Đặt lại
                    </button>
                  )}
                </div>

                {/* Phân loại dự án */}
                <div className="mb-3.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      <Category sx={{ fontSize: 13 }} className="text-cyan-600" />
                      Phân loại
                    </span>
                    {selectedCategories.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setSelectedCategories([])}
                        className="text-[11px] text-cyan-600 hover:text-cyan-800 font-medium cursor-pointer"
                      >
                        Bỏ chọn ({selectedCategories.length})
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {categoriesWithCount.map((cat) => {
                      const isSelected = selectedCategories.includes(cat.value)
                      return (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => handleToggleCategory(cat.value)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-600 text-white shadow-2xs font-semibold'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isSelected && <CheckCircleOutline sx={{ fontSize: 12 }} />}
                          <span>{cat.label}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                              isSelected
                                ? 'bg-cyan-700 text-cyan-100'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {cat.count}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Trạng thái dự án */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      <Assignment sx={{ fontSize: 13 }} className="text-cyan-600" />
                      Trạng thái
                    </span>
                    {selectedStatuses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setSelectedStatuses([])}
                        className="text-[11px] text-cyan-600 hover:text-cyan-800 font-medium cursor-pointer"
                      >
                        Bỏ chọn ({selectedStatuses.length})
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {statusesWithCount.map((st) => {
                      const isSelected = selectedStatuses.includes(st.value)
                      return (
                        <button
                          key={st.value}
                          type="button"
                          onClick={() => handleToggleStatus(st.value)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-600 text-white shadow-2xs font-semibold'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isSelected && <CheckCircleOutline sx={{ fontSize: 12 }} />}
                          <span>{st.label}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                              isSelected
                                ? 'bg-cyan-700 text-cyan-100'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {st.count}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dải Chips hiển thị các điều kiện đang lọc (nếu có) */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-1.5 mb-5 pt-1">
            <span className="text-xs text-slate-400 font-medium mr-1">Đang chọn:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-slate-100 text-slate-800 border border-slate-200">
                <span>&quot;{searchTerm}&quot;</span>
                <button onClick={() => setSearchTerm('')} className="hover:text-red-500 cursor-pointer">
                  <Close sx={{ fontSize: 12 }} />
                </button>
              </span>
            )}
            {selectedCategories.map((catSlug) => {
              const cat = categoriesWithCount.find(c => c.value === catSlug)
              return (
                <span
                  key={catSlug}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-cyan-50 text-cyan-800 border border-cyan-200 font-medium"
                >
                  <span>{cat?.label || catSlug}</span>
                  <button
                    onClick={() => handleToggleCategory(catSlug)}
                    className="hover:text-red-500 cursor-pointer"
                  >
                    <Close sx={{ fontSize: 12 }} />
                  </button>
                </span>
              )
            })}
            {selectedStatuses.map((stVal) => {
              const st = statusesWithCount.find(s => s.value === stVal)
              return (
                <span
                  key={stVal}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium"
                >
                  <span>{st?.label || stVal}</span>
                  <button
                    onClick={() => handleToggleStatus(stVal)}
                    className="hover:text-red-500 cursor-pointer"
                  >
                    <Close sx={{ fontSize: 12 }} />
                  </button>
                </span>
              )
            })}
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-rose-600 hover:text-rose-700 hover:underline font-medium ml-1 cursor-pointer"
            >
              Xóa tất cả
            </button>
          </div>
        )}

        {/* Danh sách dự án */}
        <section id="projects-grid-section">
          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-6 shadow-2xs">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <FolderOpen sx={{ fontSize: 32 }} />
              </div>
              <h3 className="text-slate-800 font-bold text-lg mb-2">
                Không tìm thấy dự án nào phù hợp
              </h3>
              <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                Rất tiếc, không có dự án nào khớp với tiêu chí tìm kiếm hiện tại. Vui lòng thử lại với từ khóa khác hoặc xóa bớt bộ lọc.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium text-sm transition-opacity hover:opacity-90 cursor-pointer shadow-2xs"
                style={{ backgroundColor: BRAND_COLORS.primary.main, color: BRAND_COLORS.primary.contrastText }}
              >
                <RestartAlt sx={{ fontSize: 18 }} />
                <span>Xóa tất cả bộ lọc</span>
              </button>
            </div>
          ) : (
            <>
              {/* Grid 3 cột chuẩn đẹp, không bị tràn chiều ngang */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {currentProjects.map((project) => (
                  <div key={project.id} className="h-full">
                    <Link href={project.url} className="block h-full group">
                      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col cursor-pointer">
                        {/* Ảnh dự án */}
                        <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          {/* Badge phân loại */}
                          {project.category && (
                            <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-900/75 backdrop-blur-2xs text-white z-10 shadow-2xs">
                              {project.category}
                            </span>
                          )}
                          {/* Badge trạng thái */}
                          <span
                            className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-lg z-10 shadow-2xs ${
                              project.statusRaw === 'completed'
                                ? 'bg-emerald-600/90 backdrop-blur-2xs text-white'
                                : 'bg-amber-600/90 backdrop-blur-2xs text-white'
                            }`}
                          >
                            {project.statusRaw === 'completed' ? 'Hoàn thành' : 'Đang triển khai'}
                          </span>
                        </div>

                        {/* Nội dung card */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <h2
                              className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2 line-clamp-2 min-h-[3rem] group-hover:text-cyan-600 transition-colors"
                              title={project.title}
                            >
                              {project.title}
                            </h2>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3">
                              {project.description}
                            </p>
                          </div>

                          <div>
                            {/* Thời gian */}
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3.5">
                              <CalendarToday sx={{ fontSize: 13 }} />
                              <span>{project.statusRaw === 'completed' ? t('home.projects.completedOn') : t('home.projects.startedOn')}: {project.duration}</span>
                            </div>

                            {/* Footer card */}
                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-cyan-700 group-hover:text-cyan-600">
                              <div className="flex items-center gap-1.5">
                                <Build sx={{ fontSize: 14 }} />
                                <span>{project.statusRaw === 'completed' ? t('home.projects.completed') : t('home.projects.inProgress')}</span>
                              </div>
                              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                <span>{t('home.projects.viewDetail')}</span>
                                <ArrowForward sx={{ fontSize: 14 }} />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <Box display="flex" justifyContent="center" mt={4} mb={6}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                    sx={{
                      '& .MuiPaginationItem-root': {
                        fontSize: '0.95rem',
                        fontWeight: 600
                      },
                      '& .Mui-selected': {
                        backgroundColor: BRAND_COLORS.primary.main,
                        color: BRAND_COLORS.primary.contrastText,
                        '&:hover': {
                          backgroundColor: BRAND_COLORS.primary.light
                        }
                      }
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </section>
      </Container>
    </Box>
  )
}
