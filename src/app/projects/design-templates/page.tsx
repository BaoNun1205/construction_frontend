'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Search,
  Close,
  ArrowForward,
  KeyboardArrowDown,
  CheckCircleOutline,
  Category,
  Palette,
  Stairs,
  Star,
  CheckCircle,
  Phone,
  Tune,
  RestartAlt,
  HomeWork
} from '@mui/icons-material'
import {
  Alert,
  Box,
  Pagination,
  Container,
  IconButton,
  Chip,
  Dialog
} from '@mui/material'
import { useDesignTemplates } from '@/hooks/useDesignTemplates'
import { ProjectsListPageSkeleton } from '@/components/projects/ProjectPageSkeletons'
import { DesignTemplate } from '@/types/designTemplate'
import { CATEGORY_OPTIONS, STYLE_OPTIONS, FLOOR_OPTIONS } from '@/constants/designTemplates'
import { BRAND_COLORS } from '@/constants/colors'

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

export default function DesignTemplatesPage() {
  const { data, isLoading, error } = useDesignTemplates()
  const allTemplates = useMemo(() => (Array.isArray(data) ? data : []), [data])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [selectedFloors, setSelectedFloors] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('featured')
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const templatesPerPage = 6

  // Quick view modal
  const [selectedTemplate, setSelectedTemplate] = useState<DesignTemplate | null>(null)
  const [activeModalImage, setActiveModalImage] = useState<string>('')

  const filterDropdownRef = useRef<HTMLDivElement>(null)

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

  const categoriesWithCount = useMemo(() => {
    return CATEGORY_OPTIONS.map((cat) => ({
      ...cat,
      count: allTemplates.filter((t) => {
        const catKey = typeof t.category === 'object' && t.category ? (t.category.code || t.category.slug) : t.category
        return catKey === cat.value
      }).length
    }))
  }, [allTemplates])

  const stylesWithCount = useMemo(() => {
    return STYLE_OPTIONS.map((style) => ({
      ...style,
      count: allTemplates.filter((t) => t.style === style.value).length
    }))
  }, [allTemplates])

  const floorsWithCount = useMemo(() => {
    return FLOOR_OPTIONS.map((fl) => ({
      ...fl,
      count: allTemplates.filter((t) => {
        if (fl.value === '1-2') return t.floors <= 2
        if (fl.value === '3') return t.floors === 3
        if (fl.value === '4+') return t.floors >= 4
        return true
      }).length
    }))
  }, [allTemplates])

  const filteredTemplates = useMemo(() => {
    let result = allTemplates.filter((template) => {
      const catKey = typeof template.category === 'object' && template.category ? (template.category.code || template.category.slug || '') : String(template.category || '')
      const matchesSearch =
        !searchTerm ||
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (template.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        (template.styleName?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        template.features.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(catKey)

      const matchesStyle =
        selectedStyles.length === 0 || selectedStyles.includes(template.style)

      const matchesFloors =
        selectedFloors.length === 0 ||
        selectedFloors.some((f) => {
          if (f === '1-2') return template.floors <= 2
          if (f === '3') return template.floors === 3
          if (f === '4+') return template.floors >= 4
          return true
        })

      return matchesSearch && matchesCategory && matchesStyle && matchesFloors
    })

    switch (sortBy) {
    case 'area-desc':
      result = [...result].sort((a, b) => b.area - a.area)
      break
    case 'area-asc':
      result = [...result].sort((a, b) => a.area - b.area)
      break
    case 'cost-asc':
      result = [...result].sort((a, b) => a.constructionCostEstimated - b.constructionCostEstimated)
      break
    case 'cost-desc':
      result = [...result].sort((a, b) => b.constructionCostEstimated - a.constructionCostEstimated)
      break
    case 'featured':
    default:
      result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
      break
    }

    return result
  }, [allTemplates, searchTerm, selectedCategories, selectedStyles, selectedFloors, sortBy])

  const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage)
  const startIndex = (currentPage - 1) * templatesPerPage
  const currentTemplates = filteredTemplates.slice(startIndex, startIndex + templatesPerPage)

  const activeFilterCount =
    (selectedCategories.length > 0 ? 1 : 0) +
    (selectedStyles.length > 0 ? 1 : 0) +
    (selectedFloors.length > 0 ? 1 : 0)

  const hasActiveFilters =
    Boolean(searchTerm.trim()) ||
    selectedCategories.length > 0 ||
    selectedStyles.length > 0 ||
    selectedFloors.length > 0

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategories, selectedStyles, selectedFloors, sortBy])

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
    const section = document.getElementById('templates-grid-section')
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedCategories([])
    setSelectedStyles([])
    setSelectedFloors([])
    setSortBy('featured')
  }

  const handleToggleCategory = (value: string) => {
    setSelectedCategories(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  const handleToggleStyle = (value: string) => {
    setSelectedStyles(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  const handleToggleFloor = (value: string) => {
    setSelectedFloors(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  const handleOpenDetailModal = (template: DesignTemplate) => {
    setSelectedTemplate(template)
    setActiveModalImage(template.mainImage)
  }

  const handleCloseDetailModal = () => {
    setSelectedTemplate(null)
  }

  if (isLoading) {
    return <ProjectsListPageSkeleton />
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, px: { xs: 2, sm: 3 } }}>
        <Alert severity="error">
          Lỗi khi tải danh sách mẫu thiết kế: {error?.message || 'Không thể tải dữ liệu'}
        </Alert>
      </Container>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: BRAND_COLORS.neutral.background, overflowX: 'hidden', width: '100%', pb: 10 }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, pt: { xs: 2.5, md: 4 } }}>
        {/* Thanh điều khiển: Bên trái đếm số lượng & sắp xếp, bên phải thu gọn Ô tìm kiếm + Nút Bộ lọc */}
        <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 relative">
          {/* Thông tin số lượng & sắp xếp */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500">
            <span>
              Hiển thị <strong className="text-slate-900 font-semibold">{currentTemplates.length}</strong> trong tổng số{' '}
              <strong className="text-slate-900 font-semibold">{filteredTemplates.length}</strong> mẫu thiết kế
            </span>

            <div className="flex items-center gap-1.5 border-l border-slate-200 pl-3">
              <span className="text-xs text-slate-400">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-8 text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 cursor-pointer text-slate-700 shadow-2xs outline-none"
              >
                <option value="featured">Nổi bật nhất</option>
                <option value="area-desc">Diện tích: Lớn → Nhỏ</option>
                <option value="area-asc">Diện tích: Nhỏ → Lớn</option>
                <option value="cost-asc">Dự toán: Thấp → Cao</option>
                <option value="cost-desc">Dự toán: Cao → Thấp</option>
              </select>
            </div>
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
                  placeholder="Tìm kiếm mẫu thiết kế..."
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

                {/* Phân loại công trình */}
                <div className="mb-3.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      <Category sx={{ fontSize: 13 }} className="text-cyan-600" />
                      Loại công trình
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

                {/* Phong cách kiến trúc */}
                <div className="mb-3.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      <Palette sx={{ fontSize: 13 }} className="text-cyan-600" />
                      Phong cách
                    </span>
                    {selectedStyles.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setSelectedStyles([])}
                        className="text-[11px] text-cyan-600 hover:text-cyan-800 font-medium cursor-pointer"
                      >
                        Bỏ chọn ({selectedStyles.length})
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {stylesWithCount.map((style) => {
                      const isSelected = selectedStyles.includes(style.value)
                      return (
                        <button
                          key={style.value}
                          type="button"
                          onClick={() => handleToggleStyle(style.value)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-600 text-white shadow-2xs font-semibold'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isSelected && <CheckCircleOutline sx={{ fontSize: 12 }} />}
                          <span>{style.label}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                              isSelected
                                ? 'bg-cyan-700 text-cyan-100'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {style.count}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Quy mô số tầng */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      <Stairs sx={{ fontSize: 13 }} className="text-cyan-600" />
                      Số tầng
                    </span>
                    {selectedFloors.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setSelectedFloors([])}
                        className="text-[11px] text-cyan-600 hover:text-cyan-800 font-medium cursor-pointer"
                      >
                        Bỏ chọn ({selectedFloors.length})
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {floorsWithCount.map((fl) => {
                      const isSelected = selectedFloors.includes(fl.value)
                      return (
                        <button
                          key={fl.value}
                          type="button"
                          onClick={() => handleToggleFloor(fl.value)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-600 text-white shadow-2xs font-semibold'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isSelected && <CheckCircleOutline sx={{ fontSize: 12 }} />}
                          <span>{fl.label}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                              isSelected
                                ? 'bg-cyan-700 text-cyan-100'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {fl.count}
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
            {selectedCategories.map((catVal) => {
              const cat = categoriesWithCount.find(c => c.value === catVal)
              return (
                <span
                  key={catVal}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-cyan-50 text-cyan-800 border border-cyan-200 font-medium"
                >
                  <span>{cat?.label || catVal}</span>
                  <button
                    onClick={() => handleToggleCategory(catVal)}
                    className="hover:text-red-500 cursor-pointer"
                  >
                    <Close sx={{ fontSize: 12 }} />
                  </button>
                </span>
              )
            })}
            {selectedStyles.map((styleVal) => {
              const st = stylesWithCount.find(s => s.value === styleVal)
              return (
                <span
                  key={styleVal}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-indigo-50 text-indigo-800 border border-indigo-200 font-medium"
                >
                  <span>{st?.label || styleVal}</span>
                  <button
                    onClick={() => handleToggleStyle(styleVal)}
                    className="hover:text-red-500 cursor-pointer"
                  >
                    <Close sx={{ fontSize: 12 }} />
                  </button>
                </span>
              )
            })}
            {selectedFloors.map((flVal) => {
              const fl = floorsWithCount.find(f => f.value === flVal)
              return (
                <span
                  key={flVal}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium"
                >
                  <span>{fl?.label || flVal}</span>
                  <button
                    onClick={() => handleToggleFloor(flVal)}
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

        {/* Danh sách mẫu thiết kế */}
        <section id="templates-grid-section">
          {filteredTemplates.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-6 shadow-2xs">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <HomeWork sx={{ fontSize: 32 }} />
              </div>
              <h3 className="text-slate-800 font-bold text-lg mb-2">
                Không tìm thấy mẫu thiết kế nào phù hợp
              </h3>
              <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                Rất tiếc, không có mẫu thiết kế nào khớp với tiêu chí tìm kiếm hiện tại. Vui lòng thử lại với từ khóa khác hoặc xóa bớt bộ lọc.
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
                {currentTemplates.map((template) => (
                  <div key={template.id} className="h-full">
                    <div
                      onClick={() => handleOpenDetailModal(template)}
                      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col cursor-pointer"
                    >
                      {/* Ảnh mẫu thiết kế */}
                      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
                        <Image
                          src={template.mainImage}
                          alt={template.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {/* Badge phân loại & phong cách */}
                        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap z-10">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-900/75 backdrop-blur-2xs text-white shadow-2xs">
                            {template.categoryName}
                          </span>
                          <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-cyan-700/80 backdrop-blur-2xs text-white shadow-2xs">
                            {template.styleName}
                          </span>
                        </div>

                        {/* Badge nổi bật */}
                        {template.featured && (
                          <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500 text-white flex items-center gap-1 shadow-2xs z-10">
                            <Star sx={{ fontSize: 13 }} />
                            Hot
                          </span>
                        )}
                      </div>

                      {/* Nội dung card */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-semibold text-cyan-700 mb-1 flex items-center justify-between">
                            <span>Mã: {template.code}</span>
                            {template.facade && (
                              <span className="text-slate-400 font-normal">
                                Mặt tiền: {template.facade}
                              </span>
                            )}
                          </div>

                          <h2
                            className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2 line-clamp-2 min-h-[3rem] group-hover:text-cyan-600 transition-colors"
                            title={template.title}
                          >
                            {template.title}
                          </h2>

                          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3">
                            {template.description}
                          </p>

                          {/* Thông số kỹ thuật nhanh */}
                          <div className="grid grid-cols-4 gap-1 py-2 px-2 bg-slate-50 rounded-xl mb-3.5 border border-slate-100 text-center text-xs">
                            <div>
                              <span className="text-slate-400 block text-[10px]">Diện tích</span>
                              <span className="font-bold text-slate-800">{template.area}m²</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px]">Số tầng</span>
                              <span className="font-bold text-slate-800">{template.floors} tầng</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px]">Phòng ngủ</span>
                              <span className="font-bold text-slate-800">{template.bedrooms} PN</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px]">Vệ sinh</span>
                              <span className="font-bold text-slate-800">{template.bathrooms} WC</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          {/* Footer card */}
                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-cyan-700 group-hover:text-cyan-600">
                            <div>
                              <span className="text-[10px] text-slate-400 block font-normal">Dự toán thi công</span>
                              <span className="text-sm sm:text-base font-bold text-emerald-600">
                                ~{formatCurrency(template.constructionCostEstimated)}
                              </span>
                            </div>
                            <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              <span>Xem chi tiết</span>
                              <ArrowForward sx={{ fontSize: 14 }} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
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

      {/* Quick View Detail Modal */}
      <Dialog
        open={Boolean(selectedTemplate)}
        onClose={handleCloseDetailModal}
        maxWidth="md"
        fullWidth
        scroll="body"
        PaperProps={{
          sx: {
            borderRadius: { xs: 3, md: 4 },
            overflow: 'hidden',
            p: 0
          }
        }}
      >
        {selectedTemplate && (
          <div>
            {/* Modal Header Image */}
            <div className="relative h-60 sm:h-80 md:h-96 w-full bg-slate-900">
              <Image
                src={activeModalImage || selectedTemplate.mainImage}
                alt={selectedTemplate.title}
                fill
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 900px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>

              {/* Close Button */}
              <IconButton
                onClick={handleCloseDetailModal}
                sx={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.8)' }
                }}
              >
                <Close />
              </IconButton>

              {/* Badges on modal image */}
              <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                <Chip
                  label={selectedTemplate.categoryName}
                  color="primary"
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />
                <Chip
                  label={selectedTemplate.styleName}
                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.85)', fontWeight: 'bold' }}
                  size="small"
                />
                <Chip
                  label={`Mã: ${selectedTemplate.code}`}
                  sx={{ bgcolor: 'rgba(0, 0, 0, 0.6)', color: 'white' }}
                  size="small"
                />
              </div>

              {/* Title & subtitle inside image banner */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold leading-tight">
                  {selectedTemplate.title}
                </h2>
              </div>
            </div>

            {/* Thumbnail selection if multiple images */}
            {selectedTemplate.images && selectedTemplate.images.length > 1 && (
              <div className="flex gap-2 p-3 bg-slate-900 overflow-x-auto scrollbar-thin">
                {selectedTemplate.images.map((img, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setActiveModalImage(img)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      (activeModalImage || selectedTemplate.mainImage) === img
                        ? 'border-cyan-400 scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Modal Body */}
            <div className="p-5 sm:p-6 md:p-8 space-y-6">
              {/* Specs Grid */}
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Thông Số Kỹ Thuật Công Trình
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">Diện tích xây dựng</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900">{selectedTemplate.area} m²</span>
                  </div>
                  {selectedTemplate.landArea && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs text-slate-500 block">Diện tích khuôn viên</span>
                      <span className="text-sm sm:text-base font-bold text-slate-900">{selectedTemplate.landArea} m²</span>
                    </div>
                  )}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">Quy mô</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900">{selectedTemplate.floors} tầng</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">Phòng ngủ</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900">{selectedTemplate.bedrooms} phòng</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">Phòng vệ sinh</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900">{selectedTemplate.bathrooms} WC</span>
                  </div>
                  {selectedTemplate.facade && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs text-slate-500 block">Mặt tiền</span>
                      <span className="text-sm sm:text-base font-bold text-slate-900">{selectedTemplate.facade}</span>
                    </div>
                  )}
                  {selectedTemplate.depth && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs text-slate-500 block">Chiều sâu</span>
                      <span className="text-sm sm:text-base font-bold text-slate-900">{selectedTemplate.depth}</span>
                    </div>
                  )}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">Phong cách</span>
                    <span className="text-sm sm:text-base font-bold text-cyan-800">{selectedTemplate.styleName}</span>
                  </div>
                </div>
              </div>

              {/* Cost card */}
              <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border border-cyan-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-cyan-800 font-semibold uppercase tracking-wider block">
                    Chi phí ước tính
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xl sm:text-2xl font-black text-cyan-900">
                      {formatCurrency(selectedTemplate.constructionCostEstimated)}
                    </span>
                    <span className="text-xs text-slate-500">(Dự toán thi công)</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    Hồ sơ thiết kế kỹ thuật kiến trúc: <strong>{formatCurrency(selectedTemplate.designCost)}</strong>
                  </div>
                </div>

                <Link
                  href={`/contact?subject=Tư vấn mẫu thiết kế ${selectedTemplate.code}&message=Tôi muốn được tư vấn chi tiết về mẫu thiết kế ${selectedTemplate.title} (Mã: ${selectedTemplate.code})`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-white font-bold rounded-xl shadow-md transition-all text-xs sm:text-sm whitespace-nowrap hover:opacity-90"
                  style={{ backgroundColor: BRAND_COLORS.primary.main, color: BRAND_COLORS.primary.contrastText }}
                >
                  <Phone sx={{ fontSize: 16 }} style={{ color: BRAND_COLORS.secondary.main }} />
                  <span>Nhận báo giá mẫu này</span>
                </Link>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Ý Tưởng & Giải Pháp Kiến Trúc
                </h4>
                <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                  {selectedTemplate.description}
                </p>
              </div>

              {/* Features & Highlights */}
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Đặc Điểm & Tiện Ích Nổi Bật
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedTemplate.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
                      <CheckCircle sx={{ fontSize: 16, color: BRAND_COLORS.secondary.dark, mt: '2px' }} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact hotline banner */}
              <div className="p-3.5 bg-slate-100 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-600 gap-1">
                <span>
                  Hotline tư vấn kiến trúc sư 24/7: <strong>0937 668 889</strong>
                </span>
                <span className="text-cyan-700 font-semibold">Tư vấn & khảo sát miễn phí</span>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </Box>
  )
}
