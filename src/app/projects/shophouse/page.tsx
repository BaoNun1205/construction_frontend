"use client"

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
} from "@mui/icons-material"
import { Typography } from "@mui/material"

export default function ShophouseDetailPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())

  const projectData = {
    name: "Dự án Shophouse – Tân Trụ, Long An",
    workingAreas: ["Phần móng", "Phần thân", "Hoàn thiện ngoài nhà", "Hạ tầng kỹ thuật - sân vườn"],
    startDate: "05/01/2022",
    endDate: "Hoàn thành",
    duration: "Đã hoàn thành",
    status: "Hoàn thành",
    description:
      "Thi công 10 căn shophouse liền kề phần móng, phần thân, phần hoàn thiện ngoài nhà, phần hạ tầng kỹ thuật - sân vườn. Dự án tạo thành một khu phức hợp thương mại hiện đại và tiện nghi tại Long An.",
    images: [
      "/products/shophouse-tan-tru.jpg",
      "/products/shophouse-tan-tru2.jpg",
      "/products/shophouse-tan-tru3.jpg",
      "/products/shophouse-tan-tru4.jpg",
      "/products/shophouse-tan-tru5.jpg",
      "/products/shophouse-tan-tru6.jpg",
    ],
    workDetails: [
      "Thi công móng bê tông cốt thép chịu lực cho 10 căn shophouse, đảm bảo độ bền vững.",
      "Xây dựng kết cấu chính, tường, sàn, cột dầm theo thiết kế kiến trúc hiện đại.",
      "Ốp lát mặt tiền, thi công hệ thống cửa kính, sơn nước và trang trí ngoại thất.",
      "Thi công hệ thống điện, nước, thoát nước đầy đủ cho từng căn.",
      "Hoàn thiện sân vườn và cảnh quan xung quanh khu shophouse.",
      "Lắp đặt hệ thống hạ tầng kỹ thuật: đường nội bộ, hệ thống chiếu sáng.",
      "Kiểm tra và bàn giao từng căn shophouse theo đúng thiết kế ban đầu.",
    ],
    details: {
      contractor: "Công ty TNHH Xây Dựng Lai Phát",
      totalArea: "1,200 m²",
      shopCount: "10 căn",
      buildingType: "Shophouse thương mại",
      location: "Tân Trụ, Long An",
    },
  }

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
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-50 via-background to-amber-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/products/shophouse-tan-tru.jpg')] bg-cover bg-center opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div
            id="hero"
            data-animate
            className={`transition-all duration-1000 ${visibleElements.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <Typography variant="body2" className="text-green-700 font-semibold">
                  {projectData.status}
                </Typography>
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <Typography
                  variant="h1"
                  className="text-6xl font-bold text-center text-gray-800"
                  sx={{ mb: 2 }}
                >
                  {projectData.name}
                </Typography>
                <Typography
                  variant="h6"
                  className="text-center text-gray-600 max-w-4xl mx-auto leading-relaxed"
                  sx={{ mb: 2 }}
                >
                  {projectData.description}
                </Typography>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Working Areas Card */}
              <div
                className={`bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 transition-all duration-700 delay-200 hover:shadow-xl hover:scale-[1.02] ${visibleElements.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-orange-100 rounded-2xl mr-4">
                    <LocationOn className="w-7 h-7 text-orange-600" />
                  </div>
                  <Typography variant="h3" className="font-serif text-xl font-bold text-gray-900">
                    Phạm vi thi công
                  </Typography>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {projectData.workingAreas.map((area, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-orange-50 hover:border-orange-200 transition-all duration-300 group"
                    >
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-3 group-hover:bg-orange-600 transition-colors"></div>
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
                    <div className="p-4 bg-amber-100 rounded-2xl mr-4">
                      <CalendarToday className="w-7 h-7 text-amber-600" />
                    </div>
                    <Typography variant="h3" className="font-serif text-xl font-bold text-gray-900">
                      Thời gian thực hiện
                    </Typography>
                  </div>
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
                        <Typography variant="body2" className="text-gray-600 font-medium">
                          Bắt đầu
                        </Typography>
                      </div>
                      <Typography variant="body1" className="text-gray-900 font-bold text-lg">
                        {projectData.startDate}
                      </Typography>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                        <Typography variant="body2" className="text-gray-600 font-medium">
                          Trạng thái
                        </Typography>
                      </div>
                      <Typography variant="body1" className="text-gray-900 font-bold text-lg">
                        {projectData.endDate}
                      </Typography>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-gray-500 mr-2" />
                          <Typography variant="body2" className="text-gray-600 font-medium">
                            Tình trạng
                          </Typography>
                        </div>
                        <Typography variant="body1" className="text-orange-600 font-bold text-lg">
                          {projectData.duration}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contractor Section */}
                <div>
                  <div className="flex items-center mb-4">
                    <div className="p-4 bg-green-100 rounded-2xl mr-4">
                      <People className="w-7 h-7 text-green-600" />
                    </div>
                    <Typography variant="h3" className="font-serif text-xl font-bold text-gray-900">
                      Nhà thầu
                    </Typography>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                    <Typography variant="body1" className="text-gray-800 font-semibold text-lg">
                      {projectData.details.contractor}
                    </Typography>
                    <div className="flex items-center mt-3 text-gray-600">
                      <EmojiEvents className="w-4 h-4 mr-2" />
                      <Typography variant="body2" className="text-sm">
                        Chuyên gia về shophouse và công trình thương mại
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Image Gallery */}
        <section
          id="gallery"
          data-animate
          className={`mb-16 transition-all duration-1000 delay-500 ${visibleElements.has("gallery") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full mb-4">
              <CameraAlt className="w-5 h-5 text-orange-600 mr-2" />
              <Typography variant="body2" className="text-orange-700 font-semibold">
                Gallery
              </Typography>
            </div>
            <Typography
              variant="h2"
              className="font-serif text-3xl lg:text-4xl font-bold text-foreground"
              sx={{ mb: 1 }}
            >
              Hình ảnh dự án
            </Typography>
            <Typography
              variant="body1"
              className="text-muted-foreground text-lg"
            >
              Theo dõi quá trình thi công shophouse thương mại hiện đại
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectData.images.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-muted cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative w-full h-64">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Hình ảnh dự án ${index + 1}`}
                    fill
                    className="object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <Typography variant="body2" className="font-semibold">
                      Hình ảnh {index + 1}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
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
                {projectData.workDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="flex items-start p-6 bg-muted/30 rounded-2xl border border-border hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="p-2 bg-orange-100 rounded-xl mr-4 group-hover:bg-orange-200 transition-colors duration-300">
                      <CheckCircle className="w-5 h-5 text-orange-600" />
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

        {/* Call to Action */}
        <section
          id="cta"
          data-animate
          className={`mt-16 text-center transition-all duration-1000 delay-700 ${visibleElements.has("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 rounded-3xl p-12 border border-gray-200">
            <div className="flex flex-col items-center justify-center text-center">
              <Typography
                variant="h3"
                className="font-serif text-3xl font-bold text-foreground"
                sx={{ mb: 1 }}
              >
                Quan tâm đến dự án này?
              </Typography>
              <Typography
                variant="body1"
                className="text-muted-foreground text-lg max-w-2xl mx-auto"
                sx={{ mb: 2 }}
              >
                Liên hệ với chúng tôi để được tư vấn chi tiết về thi công shophouse thương mại và nhận báo giá tốt nhất
              </Typography>
            </div>
            <button className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-serif font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Typography variant="body1" className="font-semibold">
                Yêu cầu thêm thông tin
              </Typography>
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </section>
      </div>

      {/* Image Modal */}
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
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Hình ảnh dự án phóng to"
                fill
                className="object-contain rounded-2xl"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
