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

export default function SwimmingPoolDetailPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())

  const projectData = {
    name: "Thi công trọn gói bể bơi gia đình – Phước Kiến – Nhà Bè",
    workingAreas: ["Bê tông + cốt thép + cốt pha"],
    startDate: "25/12/2024",
    endDate: "Hoàn thành",
    duration: "Đã hoàn thành",
    status: "Hoàn thành",
    description:
      "Thi công trọn gói bể bơi gia đình cao cấp tại Phước Kiến, Nhà Bè. Dự án bao gồm hoàn thiện phần thô và phần hoàn thiện với hệ thống lọc nước hiện đại, đảm bảo chất lượng nước sạch và an toàn cho gia đình.",
    images: [
      "/products/be-boi-gia-dinh.jpg",
      "/products/be-boi-gia-dinh2.jpg",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    workDetails: [
      "Bê tông bịt đầy đảm bảo độ kín và chống thấm tuyệt đối.",
      "Bê tông + cốt thép + cốt pha (Đậy + tường + nắp cống) theo tiêu chuẩn kỹ thuật.",
      "Hoàn thiện phần thô với độ bền cao, chịu được áp lực nước lâu dài.",
      "Hoàn thiện phần hoàn thiện với vật liệu chống thấm chuyên dụng.",
      "Lắp đặt hệ thống lọc nước hiện đại, tự động vận hành.",
      "Ốp lát gạch mosaic cao cấp chống trượt và đẹp mắt.",
      "Kiểm tra hệ thống và bàn giao kỹ thuật vận hành cho gia chủ.",
    ],
    details: {
      contractor: "Công ty Cổ Phần Tư Vấn và Xây Dựng Lai Phát",
      totalArea: "60 m²",
      depth: "1.2m - 1.8m",
      poolType: "Bể bơi gia đình",
      location: "Phước Kiến, Nhà Bè",
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
      <div className="relative bg-gradient-to-br from-blue-50 via-background to-cyan-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/products/be-boi-gia-dinh.jpg')] bg-cover bg-center opacity-5"></div>
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
                  <div className="p-4 bg-blue-100 rounded-2xl mr-4">
                    <LocationOn className="w-7 h-7 text-blue-600" />
                  </div>
                  <Typography variant="h3" className="font-serif text-xl font-bold text-gray-900">
                    Phạm vi thi công
                  </Typography>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {projectData.workingAreas.map((area, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 group"
                    >
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 group-hover:bg-blue-600 transition-colors"></div>
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
                    <div className="p-4 bg-cyan-100 rounded-2xl mr-4">
                      <CalendarToday className="w-7 h-7 text-cyan-600" />
                    </div>
                    <Typography variant="h3" className="font-serif text-xl font-bold text-gray-900">
                      Thời gian thực hiện
                    </Typography>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-cyan-500 rounded-full mr-3"></div>
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
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
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
                        <Typography variant="body1" className="text-blue-600 font-bold text-lg">
                          {projectData.duration}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contractor Section */}
                <div>
                  <div className="flex items-center mb-4">
                    <div className="p-4 bg-orange-100 rounded-2xl mr-4">
                      <People className="w-7 h-7 text-orange-600" />
                    </div>
                    <Typography variant="h3" className="font-serif text-xl font-bold text-gray-900">
                      Nhà thầu
                    </Typography>
                  </div>
                  <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                    <Typography variant="body1" className="text-gray-800 font-semibold text-lg">
                      {projectData.details.contractor}
                    </Typography>
                    <div className="flex items-center mt-3 text-gray-600">
                      <EmojiEvents className="w-4 h-4 mr-2" />
                      <Typography variant="body2" className="text-sm">
                        Chuyên gia về hồ bơi và công trình thủy lợi
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
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-4">
              <CameraAlt className="w-5 h-5 text-blue-600 mr-2" />
              <Typography variant="body2" className="text-blue-700 font-semibold">
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
              Theo dõi quá trình thi công bể bơi gia đình hiện đại
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
                    <div className="p-2 bg-blue-100 rounded-xl mr-4 group-hover:bg-blue-200 transition-colors duration-300">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
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
          <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 rounded-3xl p-12 border border-gray-200">
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
                Liên hệ với chúng tôi để được tư vấn chi tiết về thi công bể bơi gia đình và nhận báo giá tốt nhất
              </Typography>
            </div>
            <button className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-serif font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
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
