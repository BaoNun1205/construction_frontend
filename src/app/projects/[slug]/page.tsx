"use client"

import React from "react"
import { useProjectBySlug } from '@/hooks/useProjects'
import { ProjectHelpers } from '@/utils/projectHelpers'
import { useState, useEffect } from "react"
import Image from "next/image"
import {
  CalendarToday,
  LocationOn,
  CheckCircle,
  Close,
  ChevronRight,
  CameraAlt,
  AccessTime,
  People,
  EmojiEvents,
  PlayArrow,
  Schedule,
} from "@mui/icons-material"
import { Typography, CircularProgress, Alert, Box, Container } from "@mui/material"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectDetailPage(props: any) {
  const { slug } = props.params as { slug: string }
  const { data: rawProject, isLoading, isError, error } = useProjectBySlug(slug)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())

  const project = rawProject ? ProjectHelpers.transformForDetailPage(rawProject) : null

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [project])

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Đang tải chi tiết dự án...
        </Typography>
      </Box>
    )
  }

  if (isError) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">
          Lỗi khi tải chi tiết dự án: {error?.message}
        </Alert>
      </Box>
    )
  }

  if (!project) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="info">
          Không tìm thấy dự án.
        </Alert>
      </Box>
    )
  }

  const isCompleted = project.statusRaw === 'completed'
  const statusColor = isCompleted ? 'green' : 'orange'
  const duration = project.duration

  return (
    <Box className="min-h-screen">
      <Container className="py-16 space-y-20"  sx={{ px: 4 }}>
        {/* Hero Section */}
        <div className={`relative overflow-hidden`}>
          <div className="relative max-w-7xl mx-auto">
            <div
              id="hero"
              data-animate
              className={`transition-all duration-1000 ${visibleElements.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="text-center mb-12">
                <div className={`inline-flex items-center px-4 py-2 bg-${statusColor}-100 rounded-full mb-4`}>
                  {isCompleted ? (
                    <CheckCircle className={`w-5 h-5 text-${statusColor}-600 mr-2`} />
                  ) : (
                    <Schedule className={`w-5 h-5 text-${statusColor}-600 mr-2`} />
                  )}
                  <Typography variant="body2" className={`text-${statusColor}-700 font-semibold`}>
                    {project.status}
                  </Typography>
                </div>

                <div className="flex flex-col items-center justify-center text-center">
                  <Typography
                    variant="h1"
                    className="text-6xl font-bold text-center text-gray-800"
                    sx={{ mb: 2 }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    className="text-center text-gray-600 max-w-4xl mx-auto leading-relaxed"
                    sx={{ mb: 2 }}
                  >
                    {project.description}
                  </Typography>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Working Areas Card */}
                <div
                  className={`bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 transition-all duration-700 delay-200 hover:shadow-xl hover:scale-[1.02] ${visibleElements.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  <div className="flex items-center mb-6">
                    <div className={`p-4 bg-${statusColor}-100 rounded-2xl mr-4`}>
                      <LocationOn className={`w-7 h-7 text-${statusColor}-600`} />
                    </div>
                    <Typography variant="h3" className="font-serif text-xl font-bold text-gray-900">
                      Phạm vi thi công
                    </Typography>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {project.workingScope.map((area, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-${statusColor}-50 hover:border-${statusColor}-200 transition-all duration-300 group`}
                      >
                        <div className={`w-3 h-3 bg-${statusColor}-500 rounded-full mr-3 group-hover:bg-${statusColor}-600 transition-colors`}></div>
                        <Typography variant="body2" className="text-gray-700 font-medium text-sm leading-tight">
                          {area}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time & Contractor Card */}
                <div
                  className={`bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 transition-all duration-700 delay-300 hover:shadow-xl hover:scale-[1.02] ${visibleElements.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                  {/* Time Section */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className={`p-4 bg-${statusColor === 'green' ? 'teal' : 'amber'}-100 rounded-2xl mr-4`}>
                        <CalendarToday className={`w-7 h-7 text-${statusColor === 'green' ? 'teal' : 'amber'}-600`} />
                      </div>
                      <Typography variant="h3" className="font-serif text-xl font-bold text-gray-900">
                        Thời gian thực hiện
                      </Typography>
                    </div>
                    <div className={`bg-gradient-to-r from-${statusColor === 'green' ? 'teal' : 'amber'}-50 to-${statusColor}-50 rounded-2xl p-6 border border-${statusColor === 'green' ? 'teal' : 'amber'}-100`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 bg-${statusColor === 'green' ? 'teal' : 'amber'}-500 rounded-full mr-3`}></div>
                          <Typography variant="body2" className="text-gray-600 font-medium">
                            Bắt đầu
                          </Typography>
                        </div>
                        <Typography variant="body1" className="text-gray-900 font-bold text-lg">
                          {project.startDate}
                        </Typography>
                      </div>
                      {project.endDate ? (
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 bg-${statusColor}-500 rounded-full mr-3`}></div>
                            <Typography variant="body2" className="text-gray-600 font-medium">
                              Kết thúc
                            </Typography>
                          </div>
                          <Typography variant="body1" className="text-gray-900 font-bold text-lg">
                            {project.endDate}
                          </Typography>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 bg-orange-500 rounded-full mr-3`}></div>
                            <Typography variant="body2" className="text-gray-600 font-medium">
                              Trạng thái
                            </Typography>
                          </div>
                          <Typography variant="body1" className="text-orange-600 font-bold text-lg">
                            Đang triển khai
                          </Typography>
                        </div>
                      )}
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <AccessTime className="w-4 h-4 text-gray-500 mr-2" />
                            <Typography variant="body2" className="text-gray-600 font-medium">
                              {project.endDate ? 'Thời gian thực hiện' : 'Thời gian đã triển khai'}
                            </Typography>
                          </div>
                          <Typography variant="body1" className={`text-${statusColor}-600 font-bold text-lg`}>
                            {duration}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contractor Section */}
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="p-4 bg-purple-100 rounded-2xl mr-4">
                        <People className="w-7 h-7 text-purple-600" />
                      </div>
                      <Typography variant="h3" className="font-serif text-xl font-bold text-gray-900">
                        Nhà thầu
                      </Typography>
                    </div>
                    <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                      <Typography variant="body1" className="text-gray-800 font-semibold text-lg">
                        Công ty Cổ Phần Tư Vấn và Xây Dựng Lai Phát
                      </Typography>
                      <div className="flex items-center mt-3 text-gray-600">
                        <EmojiEvents className="w-4 h-4 mr-2" />
                        <Typography variant="body2" className="text-sm">
                          Chuyên gia về xây dựng và thi công công trình
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Image Gallery */}
          <section
            id="gallery"
            data-animate
            className={`mb-16 transition-all duration-1000 delay-500 ${visibleElements.has("gallery") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="text-center mb-12">
              <div className={`inline-flex items-center px-4 py-2 bg-${statusColor}-100 rounded-full mb-4`}>
                <CameraAlt className={`w-5 h-5 text-${statusColor}-600 mr-2`} />
                <Typography variant="body2" className={`text-${statusColor}-700 font-semibold`}>
                  Bộ sưu tập
                </Typography>
              </div>
              <Typography
                variant="h2"
                className="font-serif text-3xl lg:text-4xl font-bold text-foreground"
                sx={{ mb: 1 }}
              >
                Hình ảnh và Video dự án
              </Typography>
              <Typography
                variant="body1"
                className="text-muted-foreground text-lg"
              >
                Theo dõi quá trình thực hiện dự án ({project.mediaCounts.images} ảnh, {project.mediaCounts.videos} video)
              </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.media.map((image, index) => {
                const isVideo = image.match(/\.(mp4|webm|mov)$/i)
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl bg-muted cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative w-full h-64">
                      {isVideo ? (
                        <video
                          src={image}
                          className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          onLoadedData={(e) => {
                            const video = e.target as HTMLVideoElement
                            video.currentTime = 1
                          }}
                        />
                      ) : (
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Hình ảnh dự án ${index + 1}`}
                          fill
                          className="object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      )}
                    </div>
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:bg-white group-hover:scale-110 transition-all duration-300`}>
                          <PlayArrow className={`w-8 h-8 text-${statusColor}-600 ml-1`} />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <Typography variant="body2" className="font-semibold">
                          {isVideo ? `Video ${index + 1}` : `Hình ảnh ${index + 1}`}
                        </Typography>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Project Details */}
          <section
            id="details"
            data-animate
            className={`transition-all duration-1000 delay-600 ${visibleElements.has("details") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg p-8">
              <div className="space-y-6">
                <Typography
                  variant="h3"
                  className="font-serif text-2xl font-bold text-foreground"
                  sx={{ mb: 2 }}
                >
                  Chi tiết công việc thực hiện
                </Typography>
                <div className="grid gap-4">
                  {project.details.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-start p-6 bg-muted/30 rounded-2xl border border-border hover:shadow-md transition-all duration-300 group"
                    >
                      <div className={`p-2 bg-${statusColor}-100 rounded-xl mr-4 group-hover:bg-${statusColor}-200 transition-colors duration-300`}>
                        <CheckCircle className={`w-5 h-5 text-${statusColor}-600`} />
                      </div>
                      <Typography variant="body1" className="text-muted-foreground leading-relaxed flex-1">
                        {detail}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Image/Video Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative max-w-6xl max-h-[90vh] w-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-background/80 hover:bg-background text-foreground rounded-full transition-colors duration-200"
              >
                <Close className="w-6 h-6" />
              </button>
              <div className="relative w-full h-[70vh]">
                {selectedImage.match(/\.(mp4|webm|mov)$/i) ? (
                  <video
                    src={selectedImage}
                    className="w-full h-full object-contain rounded-2xl"
                    controls
                    autoPlay
                    loop
                    muted
                  />
                ) : (
                  <Image
                    src={selectedImage || "/placeholder.svg"}
                    alt="Hình ảnh dự án phóng to"
                    fill
                    className="object-contain rounded-2xl"
                    sizes="100vw"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </Box>
  )
}