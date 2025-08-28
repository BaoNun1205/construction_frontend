"use client"

import React, { useState, useEffect, useRef } from "react"
import { useProjects } from '@/hooks/useProjects'
import { ProjectHelpers } from '@/utils/projectHelpers'
import Image from "next/image"
import Link from "next/link"
import {
  Build,
  Search,
  KeyboardArrowDown,
  Close,
  CheckCircleOutline,
  ArrowForward,
  Category,
  Assignment,
} from "@mui/icons-material"
import { Typography, CircularProgress, Alert, Box, Pagination, useTheme, Container } from "@mui/material"

interface MultiSelectProps {
  label: string
  options: { value: string; label: string; count?: number }[]
  selectedValues: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  icon?: React.ReactNode
}

function MultiSelect({ label, options, selectedValues, onChange, placeholder, icon }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleToggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value]
    onChange(newValues)
  }

  const handleRemoveChip = (value: string) => {
    onChange(selectedValues.filter((v) => v !== value))
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
        {icon && <span className="text-white">{icon}</span>}
        {label}
      </label>
      <div
        className="h-14 w-full border border-gray-300 rounded-lg bg-white cursor-pointer hover:border-cyan-400 focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center h-full w-full">
          <div className="flex-1 px-3 overflow-x-auto scrollbar-thin">
            {selectedValues.length === 0 ? (
              <span className="text-gray-500 text-base truncate block">
                {placeholder || `Chọn ${label.toLowerCase()}`}
              </span>
            ) : (
              <div className="flex gap-1 py-1">
                {selectedValues.map((value) => {
                  const option = options.find((opt) => opt.value === value)
                  if (!option) return null // Bỏ qua nếu option không tồn tại
                  return (
                    <div
                      key={value}
                      className="inline-flex items-center gap-1 bg-cyan-100 text-cyan-800 px-2 py-1 rounded-md text-sm font-medium whitespace-nowrap flex-shrink-0"
                    >
                      <span className="truncate max-w-[120px]">{option.label}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveChip(value)
                        }}
                        className="hover:bg-cyan-200 rounded-full p-0.5 transition-colors"
                      >
                        <Close sx={{ fontSize: 14 }} />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          <div className="flex-shrink-0 px-3 border-l border-gray-200">
            <KeyboardArrowDown
              className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
              style={{ fontSize: 20 }}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-[60] overflow-hidden">
          <div className="xs:max-h-60 md:max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {options.map((option) => {
            const isSelected = selectedValues.includes(option.value)
            return (
              <div
                key={option.value}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleToggleOption(option.value)}
              >
                <div
                  className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-colors ${
                    isSelected ? "bg-cyan-600 border-cyan-600" : "border-gray-300 hover:border-cyan-400"
                  }`}
                >
                  {isSelected && <CheckCircleOutline sx={{ fontSize: 12 }} className="text-white" />}
                </div>
                <span className={`flex-1 ${isSelected ? "text-cyan-900 font-medium" : "text-gray-700"}`}>
                  {option.label}
                  {option.count && ` (${option.count})`}
                </span>
              </div>
            )
          })}
          </div>
        </div>
      )}
    </div>
  )
}

const useScrollAnimations = (projects: unknown[]) => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll(
      '.fade-in-on-scroll, .slide-in-left-on-scroll, .slide-in-right-on-scroll, .zoom-in-on-scroll, [data-animate]'
    )

    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [projects])
}

const ProjectTitle = ({ title }: { title: string }) => {
  return (
    <h3
      className="text-xl font-bold text-gray-900 leading-[1.5] mb-3 transition-colors duration-300 group-hover:text-cyan-600"
      style={{
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        minHeight: '60px',
      }}
      title={title.length > 50 ? title : undefined}
    >
      {title}
    </h3>
  )
}

export default function ProjectsPage() {
  const theme = useTheme()
  const { data, isLoading, error } = useProjects()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 6

  const allProjects = (data || []).map(project => ProjectHelpers.transformForHomePage(project))
  useScrollAnimations(allProjects) // Truyền allProjects vào hook

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

  // Tính số lượng dự án cho mỗi category
  const categoriesWithCount = [
    { value: "nha-dan-dung", label: "Nhà dân dụng", count: allProjects.filter(p => p.categorySlug === "nha-dan-dung").length },
    { value: "cong-trinh-thuong-mai", label: "Công trình thương mại", count: allProjects.filter(p => p.categorySlug === "cong-trinh-thuong-mai").length },
    { value: "cong-trinh-cong-nghiep", label: "Công trình công nghiệp", count: allProjects.filter(p => p.categorySlug === "cong-trinh-cong-nghiep").length },
    { value: "ha-tang-ky-thuat", label: "Hạ tầng kỹ thuật", count: allProjects.filter(p => p.categorySlug === "ha-tang-ky-thuat").length },
  ]

  // Tính số lượng dự án cho mỗi status
  const statusesWithCount = [
    { value: "completed", label: "Hoàn thành", count: allProjects.filter(p => p.statusRaw === "completed").length },
    { value: "in-progress", label: "Đang thực hiện", count: allProjects.filter(p => p.statusRaw === "in-progress").length },
  ]

  useEffect(() => {
    setCurrentPage(1) // Reset trang khi bộ lọc thay đổi
  }, [searchTerm, selectedCategories, selectedStatuses])

  useEffect(() => {
    // Thêm event listener cho các nút navigation pagination
    const handlePaginationClick = (event: Event) => {
      const target = event.target as HTMLElement
      // Kiểm tra nếu click vào các nút navigation (Previous, Next, First, Last)
      if (target.closest('.MuiPaginationItem-root') && 
          (target.closest('.MuiPaginationItem-previousNext') || 
           target.closest('.MuiPaginationItem-firstLast'))) {
        setTimeout(() => {
          const projectsSection = document.getElementById('projects-grid-section')
          projectsSection?.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
      }
    }

    document.addEventListener('click', handlePaginationClick)
    return () => document.removeEventListener('click', handlePaginationClick)
  }, [])

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
    const projectsSection = document.getElementById('projects-grid-section')
    projectsSection?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Đang tải danh sách dự án...
        </Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">
          Lỗi khi tải danh sách dự án: {error?.message || 'Không thể tải dữ liệu'}
        </Alert>
      </Box>
    )
  }

  return (
    <Box className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Hero Section */}
      <Box
        sx={{
          color: 'white',
          pt: { xs: 12, md: 20 },
          pb: { xs: 8, md: 8 },
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'url(/banner/banner_home5.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(10, 24, 61, 0.95)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg">
          <div className="relative z-10 text-white fade-in-on-scroll">
            <Typography
              variant="h6"
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              sx={{ color: 'white', marginBottom: '1rem' }}
            >
              Khám phá những dự án đã được triển khai thành công bởi
            </Typography>
            <Typography
              variant="h2"
              className="text-center text-gray-200 mx-auto"
              sx={{ opacity: 0.9 }}
            >
              Công ty Cổ Phần Tư Vấn và Xây Dựng Lai Phát
            </Typography>
          </div>

          <section className="relative pt-12 md:pt-16 z-[100]" data-section="filter-section">
            <div className="relative p-6 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="w-full">
                  <label className="block text-sm font-medium text-white mb-2">Tìm kiếm</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm dự án..."
                      value={searchTerm}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                      className="pl-10 h-14 text-base text-black border border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 w-full rounded-lg px-3 py-2 bg-white hover:border-cyan-400 transition-colors placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <MultiSelect
                    label="Phân loại dự án"
                    options={categoriesWithCount}
                    selectedValues={selectedCategories}
                    onChange={setSelectedCategories}
                    placeholder="Chọn phân loại"
                    icon={<Category sx={{ fontSize: 18 }} />}
                  />
                </div>

                <div className="w-full">
                  <MultiSelect
                    label="Trạng thái dự án"
                    options={statusesWithCount}
                    selectedValues={selectedStatuses}
                    onChange={setSelectedStatuses}
                    placeholder="Chọn trạng thái"
                    icon={<Assignment sx={{ fontSize: 18 }} />}
                  />
                </div>
              </div>

              <div id="projects-grid-section" className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-white">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  Tìm thấy {filteredProjects.length} dự án phù hợp
                </div>

                {(searchTerm || selectedCategories.length > 0 || selectedStatuses.length > 0) && (
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategories([])
                      setSelectedStatuses([])
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white hover:text-gray-200 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200 border border-white/30"
                  >
                    <Close sx={{ fontSize: 16 }} />
                    Xóa bộ lọc
                  </button>
                )}
              </div>
            </div>
        </section>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" className="pt-6 pb-16">

        {/* Projects Grid */}
        <section className="pb-16">
          <div className="my-6">
            <Typography variant="body2" className="text-gray-600">
              Hiển thị {currentProjects.length} trong tổng số {filteredProjects.length} dự án
            </Typography>
          </div>
          <div className="max-w-7xl mx-auto">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16">
                <Typography variant="h6" className="text-gray-500 mb-4">
                  Không tìm thấy dự án nào phù hợp
                </Typography>
                <Typography variant="body1" className="text-gray-400">
                  Vui lòng thử lại với từ khóa hoặc bộ lọc khác
                </Typography>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 mb-12">
                  {currentProjects.map((project, index) => (
                    <div
                      key={project.id}
                      id={`project-${index}`}
                      data-animate
                      className={`transition-all duration-1000 delay-${(index % 6) * 100} ${
                        filteredProjects.includes(project) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                    >
                      <div className="md:hidden">
                        <Link href={project.url} className="block">
                          <div className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full cursor-pointer">
                            <div className="relative h-24 overflow-hidden">
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="50vw"
                              />
                            </div>
                            <div className="p-2">
                              <h3 className="text-xs font-bold text-gray-900 leading-[1.2] mb-1 line-clamp-2 min-h-[1.8rem] transition-colors duration-300 group-hover:text-cyan-600">
                                {project.title}
                              </h3>
                              <p className="text-gray-600 text-[10px] leading-tight line-clamp-2 mb-1">
                                {project.description}
                              </p>
                              <p className="text-gray-500 text-[9px] leading-tight mb-1">
                                {project.statusRaw === 'completed' ? t('home.projects.completedOn') : t('home.projects.startedOn')}: {project.duration}
                              </p>
                              <div className="pt-1 border-t border-gray-100 flex items-center justify-between">
                                <div
                                  className="flex items-center gap-1 transition-colors duration-200"
                                  style={{ color: theme.palette.primary.main }}
                                >
                                  <Build sx={{ fontSize: 10 }} />
                                  <span className="text-[9px] font-medium">
                                    {project.statusRaw === 'completed' ? t('home.projects.completed') : t('home.projects.inProgress')}
                                  </span>
                                </div>
                                <span
                                  className="transition-colors duration-200"
                                  style={{ color: theme.palette.primary.main }}
                                >
                                  <ArrowForward sx={{ fontSize: 10 }} />
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>

                      <div className="hidden md:block">
                        <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                          <div className="relative h-52 overflow-hidden">
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                              sizes="(max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Link
                                href={project.url}
                                className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300"
                              >
                                {t('home.projects.viewDetail')}
                              </Link>
                            </div>
                          </div>
                          <div className="p-6">
                            <ProjectTitle title={project.title} />
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-3">
                              {project.description}
                            </p>
                            <p className="text-gray-500 text-xs font-medium mb-4">
                              {project.statusRaw === 'completed' ? t('home.projects.completedOn') : t('home.projects.startedOn')}: {project.duration}
                            </p>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                              <div
                                className="flex items-center gap-2 transition-colors duration-200"
                                style={{ color: theme.palette.primary.main }}
                              >
                                <Build sx={{ fontSize: 18 }} />
                                <span className="text-sm font-medium">
                                  {project.statusRaw === 'completed' ? t('home.projects.completed') : t('home.projects.inProgress')}
                                </span>
                              </div>
                              <span
                                className="transition-colors duration-200"
                                style={{ color: theme.palette.primary.main }}
                              >
                                <ArrowForward sx={{ fontSize: 20 }} />
                              </span>
                            </div>
                          </div>
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                            <div
                              className="absolute inset-0 rounded-3xl"
                              style={{
                                background: `linear-gradient(to right, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10, ${theme.palette.primary.light}10)`
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <Box display="flex" justifyContent="center" mt={4}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                      showFirstButton
                      showLastButton
                      sx={{
                        "& .MuiPaginationItem-root": {
                          fontSize: "1rem",
                          fontWeight: 500,
                        },
                        "& .Mui-selected": {
                          backgroundColor: "primary.main",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "primary.dark",
                          },
                        },
                      }}
                    />
                  </Box>
                )}
              </>
            )}
          </div>
        </section>
      </Container>
    </Box>
  )
}