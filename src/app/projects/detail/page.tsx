"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  CalendarToday,
  LocationOn,
  Business,
  CheckCircle,
  Close,
  ChevronRight,
  CameraAlt,
  AttachMoney,
  Layers,
  EmojiEvents,
  AccessTime,
  People,
  Home,
} from "@mui/icons-material"
import { Typography } from "@mui/material"

export default function ProjectDetailPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState(0)
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())

  const projectData = {
    name: "Dự án Shophouse - Tân Trụ - Long An",
    workingAreas: ["Phần móng", "Phần thân", "Phần hoàn thiện ngoài nhà", "Phần hạ tầng kỹ thuật-sân vườn"],
    startDate: "05/01/2022",
    endDate: "10/02/2022",
    duration: "36 ngày",
    status: "Hoàn thành",
    description:
      "Thi công 10 căn liên kề shophouse tại Tân Trụ, Long An. Dự án bao gồm đầy đủ các hạng mục từ móng đến hoàn thiện, tạo nên khu phố thương mại hiện đại và tiện nghi.",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    workDetails: [
      "Thi công kết cấu bê tông cốt thép móng, đầm sàn, cầu thang các tầng.",
      "Thi công xây tường bao tường ngăn các căn hộ.",
      "Thi công trát tường ngoài nhà.",
      "Thi công đắp chỉ mặt tiền.",
      "Thi công hệ thống cấp thoát nước ngoài nhà.",
      "Thi công hệ thống điện hạ tầng.",
      "Thi công nền hạ + bó vỉa sân sàn đường dự án.",
    ],
    details: {
      contractor: "Công ty TNHH Xây Dựng Tân Trụ",
      totalArea: "2,500 m²",
      floors: "3 tầng + 1 lửng",
      units: "10 căn liên kề",
      investment: "15.8 tỷ VNĐ",
      materials: ["Bê tông C30", "Thép CB400-V", "Gạch block AAC", "Sơn ngoại thất Jotun", "Hệ thống điện Schneider"],
      features: [
        "Thiết kế shophouse hiện đại 3 tầng",
        "Hệ thống điện hạ tầng hoàn chỉnh",
        "Hệ thống cấp thoát nước tập trung",
        "Sân vườn và không gian xanh",
        "Vỉa hè và đường nội bộ",
        "Hệ thống an ninh tập trung",
      ],
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
      <div className="relative bg-gradient-to-br from-emerald-50 via-background to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div
            id="hero"
            data-animate
            className={`transition-all duration-1000 ${visibleElements.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full mb-6">
                <CheckCircle className="w-5 h-5 text-emerald-600 mr-2" />
                <Typography variant="body2" className="text-emerald-700 font-semibold">
                  {projectData.status}
                </Typography>
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <Typography
                  variant="h1"
                  className="text-6xl font-bold text-center text-gray-800"
                  sx={{ mb: 2 }} // Thay mb-8
                >
                  {projectData.name}
                </Typography>
                <Typography
                  variant="h6"
                  className="text-center text-gray-600 max-w-4xl mx-auto leading-relaxed"
                  sx={{ mb: 2 }} // Thay mb-8
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
                  <div className="p-4 bg-emerald-100 rounded-2xl mr-4">
                    <LocationOn className="w-7 h-7 text-emerald-600" />
                  </div>
                  <Typography variant="h3" className="font-serif text-xl font-bold text-gray-900">
                    Vị trí thi công
                  </Typography>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projectData.workingAreas.map((area, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-300 group"
                    >
                      <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 group-hover:bg-emerald-600 transition-colors"></div>
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
                    <div className="p-4 bg-blue-100 rounded-2xl mr-4">
                      <CalendarToday className="w-7 h-7 text-blue-600" />
                    </div>
                    <Typography variant="h3" className="font-serif text-xl font-bold text-gray-900">
                      Thời gian thực hiện
                    </Typography>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-6 border border-blue-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
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
                        <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                        <Typography variant="body2" className="text-gray-600 font-medium">
                          Kết thúc
                        </Typography>
                      </div>
                      <Typography variant="body1" className="text-gray-900 font-bold text-lg">
                        {projectData.endDate}
                      </Typography>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <AccessTime className="w-4 h-4 text-gray-500 mr-2" />
                          <Typography variant="body2" className="text-gray-600 font-medium">
                            Thời gian
                          </Typography>
                        </div>
                        <Typography variant="body1" className="text-emerald-600 font-bold text-lg">
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
                        Nhà thầu uy tín với 15+ năm kinh nghiệm
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
            <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full mb-4">
              <CameraAlt className="w-5 h-5 text-emerald-600 mr-2" />
              <Typography variant="body2" className="text-emerald-700 font-semibold">
                Gallery
              </Typography>
            </div>
            <Typography
              variant="h2"
              className="font-serif text-3xl lg:text-4xl font-bold text-foreground"
              sx={{ mb: 1 }} // Thay mb-4
            >
              Hình ảnh dự án
            </Typography>
            <Typography
              variant="body1"
              className="text-muted-foreground text-lg"
              // className="font-bold"
            >
              Khám phá quá trình thi công và kết quả hoàn thiện của 10 căn shophouse
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
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg">
            {/* Tab Navigation */}
            <div className="border-b border-border bg-muted/30">
              <div className="flex">
                <button
                  onClick={() => setActiveTab(0)}
                  className={`flex-1 px-6 py-4 text-left font-serif font-semibold transition-all duration-300 ${
                    activeTab === 0
                      ? "text-emerald-600 bg-background border-b-2 border-emerald-500"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center">
                    <Layers className="w-5 h-5 mr-3" />
                    <Typography variant="body1" className="font-semibold">
                      Chi tiết thi công
                    </Typography>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab(1)}
                  className={`flex-1 px-6 py-4 text-left font-serif font-semibold transition-all duration-300 ${
                    activeTab === 1
                      ? "text-emerald-600 bg-background border-b-2 border-emerald-500"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center">
                    <EmojiEvents className="w-5 h-5 mr-3" />
                    <Typography variant="body1" className="font-semibold">
                      Thông tin kỹ thuật
                    </Typography>
                  </div>
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 0 && (
                <div className="space-y-6">
                  <Typography
                    variant="h3"
                    className="font-serif text-2xl font-bold text-foreground"
                    sx={{ mb: 2 }} // Thay mb-8
                  >
                    Chi tiết công việc thực hiện
                  </Typography>

                  <div className="grid gap-4">
                    {projectData.workDetails.map((detail, index) => (
                      <div
                        key={index}
                        className="flex items-start p-6 bg-muted/30 rounded-2xl border border-border hover:shadow-md transition-all duration-300 group"
                      >
                        <div className="p-2 bg-emerald-100 rounded-xl mr-4 group-hover:bg-emerald-200 transition-colors duration-300">
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        </div>
                        <Typography variant="body1" className="text-muted-foreground leading-relaxed flex-1">
                          {detail}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <Typography
                      variant="h3"
                      className="font-serif text-2xl font-bold text-foreground"
                      sx={{ mb: 2 }} // Thay mb-8
                    >
                      Thông số kỹ thuật
                    </Typography>

                    <div className="space-y-6">
                      <div className="flex items-center p-4 bg-muted/30 rounded-xl border border-border">
                        <div className="p-3 bg-emerald-100 rounded-xl mr-4">
                          <Layers className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <Typography variant="body1" className="font-serif font-semibold text-foreground">
                            Tổng diện tích
                          </Typography>
                          <Typography variant="body1" className="text-muted-foreground text-lg">
                            {projectData.details.totalArea}
                          </Typography>
                        </div>
                      </div>

                      <div className="flex items-center p-4 bg-muted/30 rounded-xl border border-border">
                        <div className="p-3 bg-blue-100 rounded-xl mr-4">
                          <Business className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <Typography variant="body1" className="font-serif font-semibold text-foreground">
                            Quy mô
                          </Typography>
                          <Typography variant="body1" className="text-muted-foreground text-lg">
                            {projectData.details.units}
                          </Typography>
                        </div>
                      </div>

                      <div className="flex items-center p-4 bg-muted/30 rounded-xl border border-border">
                        <div className="p-3 bg-orange-100 rounded-xl mr-4">
                          <Home className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <Typography variant="body1" className="font-serif font-semibold text-foreground">
                            Số tầng
                          </Typography>
                          <Typography variant="body1" className="text-muted-foreground text-lg">
                            {projectData.details.floors}
                          </Typography>
                        </div>
                      </div>

                      <div className="flex items-center p-4 bg-muted/30 rounded-xl border border-border">
                        <div className="p-3 bg-green-100 rounded-xl mr-4">
                          <AttachMoney className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <Typography variant="body1" className="font-serif font-semibold text-foreground">
                            Tổng đầu tư
                          </Typography>
                          <Typography variant="body1" className="text-muted-foreground text-lg font-semibold">
                            {projectData.details.investment}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Typography
                      variant="h3"
                      className="font-serif text-2xl font-bold text-foreground"
                      sx={{ mb: 2 }} // Thay mb-8
                    >
                      Vật liệu & Tiện ích
                    </Typography>

                    <div className="mb-8">
                      <Typography
                        variant="h4"
                        className="font-serif text-lg font-semibold text-foreground"
                        sx={{ mb: 1 }} // Thay mb-4
                      >
                        Vật liệu chính
                      </Typography>
                      <div className="space-y-3">
                        {projectData.details.materials.map((material, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                            <Typography variant="body1" className="text-muted-foreground">
                              {material}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Typography
                        variant="h4"
                        className="font-serif text-lg font-semibold text-foreground"
                        sx={{ mb: 1 }} // Thay mb-4
                      >
                        Tiện ích nổi bật
                      </Typography>
                      <div className="space-y-3">
                        {projectData.details.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                            <Typography variant="body1" className="text-muted-foreground">
                              {feature}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section
          id="cta"
          data-animate
          className={`mt-16 text-center transition-all duration-1000 delay-700 ${visibleElements.has("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="bg-gradient-to-r from-emerald-50 via-blue-50 to-orange-50 rounded-3xl p-12 border border-gray-200">
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
                Liên hệ với chúng tôi để được tư vấn chi tiết về dự án và nhận báo giá tốt nhất
              </Typography>
            </div>
            <button className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-serif font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
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