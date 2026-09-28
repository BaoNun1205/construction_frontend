'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Search,
  Close,
  Phone,
  CheckCircle,
  Star,
  ShoppingCart,
  LocalShipping,
  VerifiedUser,
  Build,
  Engineering,
  Construction,
  RestartAlt,
  ArrowForward,
  Inventory2,
  SupportAgent,
  Check,
  ChevronRight,
  FilterList
} from '@mui/icons-material'
import {
  Box,
  Container,
  Dialog,
  IconButton,
  Pagination
} from '@mui/material'
import { BRAND_COLORS } from '@/constants/colors'
import { CONTACT } from '@/constants/contact'

interface Product {
  id: string
  name: string
  categoryId: string
  categoryName: string
  specs: string
  price: string
  unit: string
  image: string
  inStock: boolean
  featured?: boolean
  rating: number
  reviewsCount: number
  brand: string
  standards?: string
  description: string
  highlights: string[]
}

const STORE_CATEGORIES = [
  { id: 'all', name: 'Tất cả sản phẩm' },
  { id: 'vat-lieu-tho', name: 'Vật liệu thô' },
  { id: 'vat-lieu-hoan-thien', name: 'Vật liệu hoàn thiện' },
  { id: 'thiet-bi-may-moc', name: 'Thiết bị & Máy móc' },
  { id: 'dung-cu-thi-cong', name: 'Dụng cụ thi công' }
]

const PRODUCTS: Product[] = [
  {
    id: 'sp-01',
    name: 'Xi Măng Nghi Sơn PCB40 Đa Dụng',
    categoryId: 'vat-lieu-tho',
    categoryName: 'Vật liệu thô',
    specs: 'Bao 50kg ± 0.5kg',
    price: '92.000 đ',
    unit: '/ bao',
    image: '/products/cement.jpg',
    inStock: true,
    featured: true,
    rating: 5,
    reviewsCount: 48,
    brand: 'Nghi Sơn (Titan Corp)',
    standards: 'TCVN 6260:2009',
    description: 'Xi măng Poóc lăng hỗn hợp chất lượng cao, độ dẻo tốt, cường độ nén cao sau 28 ngày, thích hợp cho mọi kết cấu bê tông móng, dầm, cột và xây tô.',
    highlights: ['Cường độ chịu nén cao bền vững', 'Thời gian đông kết chuẩn kỹ thuật', 'Chống thấm nước và nứt nẻ công trình']
  },
  {
    id: 'sp-02',
    name: 'Thép Xây Dựng Hòa Phát CB300/CB400',
    categoryId: 'vat-lieu-tho',
    categoryName: 'Vật liệu thô',
    specs: 'Thép vằn D10, D12, D16, D18',
    price: '16.500 đ',
    unit: '/ kg',
    image: '/products/steel.jpg',
    inStock: true,
    featured: true,
    rating: 5,
    reviewsCount: 62,
    brand: 'Tập Đoàn Hòa Phát',
    standards: 'TCVN 1651-2:2018 / JIS G3112',
    description: 'Thép cốt bê tông cán nóng chính hãng Hòa Phát, độ uốn dẻo và giới hạn chảy vượt trội, cam kết đủ barem và chứng chỉ xuất xưởng CO/CQ.',
    highlights: ['Chính hãng 100% có logo Hòa Phát dập nổi', 'Độ bền kéo và chịu lực rung chấn cao', 'Giao hàng tận chân công trình']
  },
  {
    id: 'sp-03',
    name: 'Gạch Đỏ Tuynel 4 Lỗ Bình Dương',
    categoryId: 'vat-lieu-tho',
    categoryName: 'Vật liệu thô',
    specs: '80 x 80 x 180 mm',
    price: '1.250 đ',
    unit: '/ viên',
    image: '/products/brick.jpg',
    inStock: true,
    rating: 4.8,
    reviewsCount: 39,
    brand: 'Tuynel Bình Dương',
    standards: 'TCVN 1450:2009',
    description: 'Gạch đất sét nung công nghệ lò tuynel hiện đại, màu sắc đỏ tươi đồng đều, gõ tiếng vang đanh, độ hút nước chuẩn giúp tường xây chắc chắn.',
    highlights: ['Khả năng cách âm, cách nhiệt tự nhiên', 'Độ vuông vức cao, tiết kiệm vữa xây', 'Không rêu mốc, chống ẩm mốc']
  },
  {
    id: 'sp-04',
    name: 'Sơn Nước MasterCoat Premium Ngoại Thất',
    categoryId: 'vat-lieu-hoan-thien',
    categoryName: 'Vật liệu hoàn thiện',
    specs: 'Thùng 18 Lít',
    price: '1.850.000 đ',
    unit: '/ thùng',
    image: '/products/paint.jpg',
    inStock: true,
    featured: true,
    rating: 5,
    reviewsCount: 31,
    brand: 'MasterCoat',
    standards: 'ASTM D2486 / ISO 9001',
    description: 'Dòng sơn nước Acrylic cao cấp bảo vệ bề mặt tường ngoại thất chống lại tia UV, mưa nắng khắc nghiệt, chống bám bụi và kháng kiềm tối đa.',
    highlights: ['Màng sơn co giãn che lấp khe nứt nhỏ', 'Bảo vệ màu sắc tươi sáng trên 8 năm', 'Kháng rong rêu và nấm mốc cực tốt']
  },
  {
    id: 'sp-05',
    name: 'Keo Dán Gạch & Vữa Chống Thấm Forte C2TE',
    categoryId: 'vat-lieu-hoan-thien',
    categoryName: 'Vật liệu hoàn thiện',
    specs: 'Bao 25kg',
    price: '235.000 đ',
    unit: '/ bao',
    image: '/products/adhesive.jpg',
    inStock: true,
    rating: 4.9,
    reviewsCount: 27,
    brand: 'Forte Cement',
    standards: 'ISO 13007 C2TE',
    description: 'Keo ốp lát gạch đá kích thước lớn chuyên dụng hồ bơi, nhà tắm và sân thượng. Độ bám dính cực cao, không trượt gạch, chống thấm nước hoàn hảo.',
    highlights: ['Bám dính siêu cường chống bong tróc', 'Thích hợp ốp gạch khổ lớn 80x80, 60x120', 'Thi công nhanh chóng, dễ khuấy trộn']
  },
  {
    id: 'sp-06',
    name: 'Máy Trộn Bê Tông Quả Lê 350L Động Cơ 2.2kW',
    categoryId: 'thiet-bi-may-moc',
    categoryName: 'Thiết bị & Máy móc',
    specs: 'Dung tích cối 350L - 1/2 bao',
    price: '14.800.000 đ',
    unit: '/ chiếc',
    image: '/products/mixer.jpg',
    inStock: true,
    rating: 5,
    reviewsCount: 19,
    brand: 'Makute Heavy Duty',
    standards: 'Tiêu chuẩn an toàn thiết bị xây dựng',
    description: 'Máy trộn bê tông cối nghiêng chạy điện 220V/380V công suất 2.2kW dây đồng 100%, khung thép dày chịu tải cao, bánh xe cao su di chuyển cơ động.',
    highlights: ['Trộn đều nhanh 3-5 phút/mẻ', 'Khung gầm sắt U gia cố chống rung lắc', 'Động cơ lõi đồng bảo hành 12 tháng']
  },
  {
    id: 'sp-07',
    name: 'Máy Cắt Sắt Bàn Thủy Lực Cầm Tay RC-25',
    categoryId: 'dung-cu-thi-cong',
    categoryName: 'Dụng cụ thi công',
    specs: 'Cắt thép phi 6mm - 25mm',
    price: '7.600.000 đ',
    unit: '/ bộ',
    image: '/products/mixer.jpg',
    inStock: true,
    rating: 4.9,
    reviewsCount: 15,
    brand: 'Ogallala Tech',
    standards: 'CE / RoHS Certified',
    description: 'Thiết bị cắt sắt thủy lực tốc độ cao chỉ 3.5 giây/nhát cắt, không phát tia lửa điện, an toàn tuyệt đối cho thợ thi công tại công trình nhà phố.',
    highlights: ['Tốc độ cắt nhanh 3.5s an toàn', 'Lưỡi cắt hợp kim vonfram tôi cao tần', 'Trọng lượng nhẹ dễ mang lên giàn giáo']
  },
  {
    id: 'sp-08',
    name: 'Cát Vàng Bê Tông Sông Lô Sàng Tuyển',
    categoryId: 'vat-lieu-tho',
    categoryName: 'Vật liệu thô',
    specs: 'Hạt to modun 2.2 - 2.8',
    price: '380.000 đ',
    unit: '/ m³',
    image: '/products/cement.jpg',
    inStock: true,
    rating: 4.8,
    reviewsCount: 22,
    brand: 'Lai Phát Vật Tư',
    standards: 'TCVN 7570:2006',
    description: 'Cát vàng khai thác tự nhiên được rửa sạch tạp chất sét và hữu cơ, chuyên dùng đổ bê tông móng, sàn, dầm đảm bảo mác bê tông tối ưu.',
    highlights: ['Đã qua sàng rửa loại bỏ tạp chất', 'Cỡ hạt đều, tăng độ nén bê tông', 'Vận chuyển xe ben từ 3m³ đến 15m³']
  },
  {
    id: 'sp-09',
    name: 'Đá Xây Dựng 1x2 Xanh Hóa An',
    categoryId: 'vat-lieu-tho',
    categoryName: 'Vật liệu thô',
    specs: 'Quy cách hạt 10x20mm',
    price: '340.000 đ',
    unit: '/ m³',
    image: '/products/brick.jpg',
    inStock: true,
    rating: 4.8,
    reviewsCount: 18,
    brand: 'Đá Hóa An Đồng Nai',
    standards: 'TCVN 7570:2006',
    description: 'Đá 1x2 khai thác từ mỏ đá xanh tự nhiên, hạt khối lập phương đều đặn, cường độ nén và độ bám dính xi măng cực tốt chuyên dùng đổ bê tông tươi và bê tông móng.',
    highlights: ['Đá xanh hạt đều không lẫn tạp chất', 'Cường độ chịu nén mác cao', 'Cung cấp xe ben từ 3m³ đến 15m³']
  },
  {
    id: 'sp-10',
    name: 'Sơn Lót Kháng Kiềm MasterCoat Ngoại Thất',
    categoryId: 'vat-lieu-hoan-thien',
    categoryName: 'Vật liệu hoàn thiện',
    specs: 'Thùng 18 Lít',
    price: '1.320.000 đ',
    unit: '/ thùng',
    image: '/products/paint.jpg',
    inStock: true,
    rating: 4.9,
    reviewsCount: 24,
    brand: 'MasterCoat Premium',
    standards: 'TCVN 8652:2012',
    description: 'Sơn lót chuyên dụng chống kiềm hóa và muối hóa cho tường mới xây, giúp lớp sơn phủ bám chắc và lên màu chuẩn xác, ngăn ngừa ố vàng loang màu.',
    highlights: ['Kháng kiềm, kháng muối tối đa', 'Tăng cường độ bám dính sơn phủ', 'Độ phủ cao tiết kiệm chi phí']
  },
  {
    id: 'sp-11',
    name: 'Bột Bả Trét Tường Cao Cấp Forte Skimcoat',
    categoryId: 'vat-lieu-hoan-thien',
    categoryName: 'Vật liệu hoàn thiện',
    specs: 'Bao 40kg',
    price: '165.000 đ',
    unit: '/ bao',
    image: '/products/adhesive.jpg',
    inStock: true,
    rating: 4.7,
    reviewsCount: 33,
    brand: 'Forte Skimcoat',
    standards: 'TCVN 7239:2014',
    description: 'Bột bả dẻo mịn tạo bề mặt phẳng nhẵn mịn màng cho tường nội ngoại thất trước khi sơn phủ, độ bám dính cao, không nứt chân chim khi khô.',
    highlights: ['Bột dẻo mịn, xả nhám nhẹ tay', 'Không nứt nẻ, che phủ lỗ bọt khí', 'Tiết kiệm lượng sơn lót và sơn phủ']
  },
  {
    id: 'sp-12',
    name: 'Máy Đầm Cóc Chạy Xăng Honda GX160',
    categoryId: 'thiet-bi-may-moc',
    categoryName: 'Thiết bị & Máy móc',
    specs: 'Động cơ xăng 4 thì 5.5HP',
    price: '9.800.000 đ',
    unit: '/ chiếc',
    image: '/products/mixer.jpg',
    inStock: true,
    featured: true,
    rating: 5,
    reviewsCount: 16,
    brand: 'Honda Genuine Power',
    standards: 'Tiêu chuẩn kiểm định máy xây dựng',
    description: 'Máy đầm cóc chuyên dụng nén chặt đất, cát, nền móng công trình nhà xưởng, đường ống. Lực đầm mạnh 14kN, vận hành bền bỉ tiết kiệm nhiên liệu.',
    highlights: ['Lực đầm 14kN nén chặt móng sâu', 'Động cơ Honda GX160 tiết kiệm xăng', 'Bảo hành chính hãng 12 tháng']
  },
  {
    id: 'sp-13',
    name: 'Giàn Giáo Khung Chữ H Mạ Kẽm 1.7m',
    categoryId: 'thiet-bi-may-moc',
    categoryName: 'Thiết bị & Máy móc',
    specs: 'Khung 1.7m x 1.25m dày 2mm',
    price: '580.000 đ',
    unit: '/ bộ',
    image: '/products/steel.jpg',
    inStock: true,
    rating: 4.9,
    reviewsCount: 28,
    brand: 'Lai Phát Steel Scaffold',
    standards: 'TCVN 6052:1995',
    description: 'Hệ giàn giáo khung nhúng kẽm nóng chống oxy hóa, ống thép dày chịu tải trọng lớn, chốt nêm chắc chắn đảm bảo an toàn tuyệt đối cho công nhân thi công trên cao.',
    highlights: ['Mạ kẽm chống rỉ sét ngoài trời', 'Khả năng chịu tải trọng thử nghiệm 4000kg', 'Khóa chéo linh hoạt, lắp dựng nhanh']
  },
  {
    id: 'sp-14',
    name: 'Máy Bắn Cốt Laser 12 Tia Xanh Siêu Sáng',
    categoryId: 'dung-cu-thi-cong',
    categoryName: 'Dụng cụ thi công',
    specs: 'Tia xanh 3D 360 độ - Pin 4800mAh',
    price: '1.450.000 đ',
    unit: '/ bộ',
    image: '/products/mixer.jpg',
    inStock: true,
    rating: 4.9,
    reviewsCount: 42,
    brand: 'Laisai Precision',
    standards: 'Class II Laser Safety',
    description: 'Máy cân mực laser 12 tia xanh bước sóng 532nm nhìn rõ ngoài trời nắng, tính năng tự cân bằng độ nghiêng, phục vụ ốp lát gạch, trần thạch cao, đóng vách.',
    highlights: ['Tia xanh siêu nét ngoài trời bán kính 30m', 'Tự động cân bằng và báo chuông khi lệch', 'Tặng kèm chân nhôm 1.2m và 2 pin sạc']
  },
  {
    id: 'sp-15',
    name: 'Máy Thủy Bình Tự Động Sokkia B40A',
    categoryId: 'dung-cu-thi-cong',
    categoryName: 'Dụng cụ thi công',
    specs: 'Độ phóng đại 24X - Độ chính xác 2mm',
    price: '4.200.000 đ',
    unit: '/ bộ',
    image: '/products/mixer.jpg',
    inStock: true,
    rating: 5,
    reviewsCount: 11,
    brand: 'Sokkia Topcon Japan',
    standards: 'IPX6 Chống nước chống bụi',
    description: 'Thiết bị đo trắc địa công trình chuyên nghiệp xác định cao độ móng, sàn, tim cốt chuẩn xác 100%, lăng kính quang học sắc nét, giảm thiểu tối đa sai số thi công.',
    highlights: ['Độ phóng đại 24X bù trừ tự động nhanh', 'Tiêu chuẩn chống nước IPX6 siêu bền', 'Kèm chân máy nhôm và mia nhôm 5m rút']
  },
  {
    id: 'sp-16',
    name: 'Thước Cuộn Thép Chống Gỉ Bọc Cao Su 50m',
    categoryId: 'dung-cu-thi-cong',
    categoryName: 'Dụng cụ thi công',
    specs: 'Bản rộng 13mm - Chiều dài 50m',
    price: '280.000 đ',
    unit: '/ cái',
    image: '/products/steel.jpg',
    inStock: true,
    rating: 4.8,
    reviewsCount: 35,
    brand: 'Stanley Works',
    standards: 'Class II Accuracy Metric',
    description: 'Thước dây thép sợi bọc nylon chống mài mòn, vỏ bọc cao su chịu va đập khi rơi từ tầng cao, tay quay thu dây êm ái, vạch chia milimet rõ ràng chính xác.',
    highlights: ['Lưỡi thước thép bọc nylon chống gỉ', 'Vỏ ABS bọc cao su chống sốc va đập', 'Cơ cấu thu dây trợ lực 3:1 nhanh chóng']
  }
]

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('featured')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 8

  // Tự động về trang 1 khi thay đổi bộ lọc hoặc tìm kiếm
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchQuery, sortBy])

  // Danh sách đã lọc theo danh mục & tìm kiếm
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.categoryId === selectedCategory
      const matchSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.specs.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        const pA = parseFloat(a.price.replace(/[^\d]/g, '')) || 0
        const pB = parseFloat(b.price.replace(/[^\d]/g, '')) || 0
        return pA - pB
      }
      if (sortBy === 'price-high') {
        const pA = parseFloat(a.price.replace(/[^\d]/g, '')) || 0
        const pB = parseFloat(b.price.replace(/[^\d]/g, '')) || 0
        return pB - pA
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating
      }
      // 'featured'
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    })
  }, [selectedCategory, searchQuery, sortBy])

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredProducts, currentPage, itemsPerPage])

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
    const el = document.getElementById('store-products-anchor')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Đếm số lượng sản phẩm mỗi danh mục
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: PRODUCTS.length }
    PRODUCTS.forEach((p) => {
      counts[p.categoryId] = (counts[p.categoryId] || 0) + 1
    })
    return counts
  }, [])

  return (
    <Box className="min-h-screen bg-slate-50/60 pb-16">
      {/* 1. DẢI DANH MỤC NGANG CO GIÃN NHỎ GỌN TRÊN MOBILE / TABLET */}
      <div className="bg-white border-b border-slate-200/80 shadow-2xs lg:hidden sticky top-0 z-20">
        <Container maxWidth="xl">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none">
            {STORE_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: BRAND_COLORS.primary.main,
                          color: BRAND_COLORS.primary.contrastText
                        }
                      : {}
                  }
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {categoryCounts[cat.id] || 0}
                  </span>
                </button>
              )
            })}
          </div>
        </Container>
      </div>

      {/* 3. BỐ CỤC CHÍNH DẠNG E-COMMERCE: DANH MỤC TRÁI + SẢN PHẨM PHẢI */}
      <Container maxWidth="xl" className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* CỘT DANH MỤC BÊN TRÁI (NHỎ GỌN, CHUẨN TRANG MUA SẮM) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-4 sticky top-6">
            {/* Box danh mục sản phẩm */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 pb-3 mb-2 border-b border-slate-100">
                <FilterList sx={{ fontSize: 18, color: BRAND_COLORS.secondary.dark }} />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Danh mục sản phẩm
                </h2>
              </div>

              <div className="space-y-1">
                {STORE_CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'shadow-xs font-bold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                      style={
                        isActive
                          ? {
                              backgroundColor: BRAND_COLORS.primary.main,
                              color: BRAND_COLORS.primary.contrastText
                            }
                      : {}
                    }
                    >
                      <span className="truncate">{cat.name}</span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {categoryCounts[cat.id] || 0}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Cam kết cửa hàng */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <CheckCircle sx={{ fontSize: 14, color: BRAND_COLORS.status.success }} />
                  <span>100% Chính hãng có CO/CQ</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <LocalShipping sx={{ fontSize: 14, color: BRAND_COLORS.secondary.dark }} />
                  <span>Giao nhanh tận công trình</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <VerifiedUser sx={{ fontSize: 14, color: BRAND_COLORS.primary.light }} />
                  <span>Hỗ trợ xuất hóa đơn VAT</span>
                </div>
              </div>
            </div>

            {/* Hotline hỗ trợ sỉ / công trình */}
            <div
              className="rounded-2xl p-4.5 border shadow-2xs relative overflow-hidden"
              style={{
                backgroundColor: BRAND_COLORS.primary.main,
                color: BRAND_COLORS.primary.contrastText,
                borderColor: `${BRAND_COLORS.secondary.main}33`
              }}
            >
              <div
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider mb-1"
                style={{ color: BRAND_COLORS.secondary.main }}
              >
                <SupportAgent sx={{ fontSize: 15 }} />
                <span>Báo giá dự toán & Sỉ</span>
              </div>
              <h3 className="text-xs font-bold text-white mb-1.5">
                Cần báo giá số lượng lớn cho công trình?
              </h3>
              <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                Kỹ sư vật tư Lai Phát hỗ trợ bóc tách khối lượng và gửi bảng giá chiết khấu tốt nhất.
              </p>
              <a
                href={`tel:${CONTACT.PHONE.replace(/\s+/g, '')}`}
                className="w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-opacity hover:opacity-90 shadow-sm"
                style={{
                  backgroundColor: BRAND_COLORS.secondary.main,
                  color: BRAND_COLORS.primary.main
                }}
              >
                <Phone sx={{ fontSize: 14 }} />
                <span>Gọi kỹ sư: {CONTACT.PHONE}</span>
              </a>
            </div>
          </aside>

          {/* CỘT SẢN PHẨM BÊN PHẢI (GRID COMPACT CHUẨN THƯƠNG MẠI ĐIỆN TỬ) */}
          <main className="lg:col-span-9 space-y-4">
            {/* Thanh tìm kiếm & Sắp xếp */}
            <div className="bg-white rounded-xl p-2.5 sm:px-4 sm:py-2.5 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              {/* Ô tìm kiếm nhanh */}
              <div className="relative flex-1 max-w-md">
                <Search
                  sx={{ fontSize: 18 }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Tìm theo tên vật tư, chủng loại, quy cách..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-7 py-1.5 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-sky-500 rounded-lg outline-hidden transition-all text-slate-800 placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <Close sx={{ fontSize: 15 }} />
                  </button>
                )}
              </div>

              {/* Phần thông tin kết quả & Sắp xếp */}
              <div className="flex items-center justify-between sm:justify-end gap-3 text-xs shrink-0">
                <span className="text-slate-500 font-medium whitespace-nowrap">
                  Tìm thấy <strong className="text-slate-800">{filteredProducts.length}</strong> sản phẩm
                </span>

                {/* Sắp xếp */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 hidden md:inline">Sắp xếp:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium outline-hidden cursor-pointer hover:border-slate-300"
                  >
                    <option value="featured">Nổi bật nhất</option>
                    <option value="price-low">Giá: Thấp đến Cao</option>
                    <option value="price-high">Giá: Cao đến Thấp</option>
                    <option value="rating">Đánh giá tốt nhất</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tag danh mục đang chọn nếu khác 'all' */}
            {selectedCategory !== 'all' && (
              <div className="flex items-center gap-2 text-xs pt-0.5">
                <span className="text-slate-400">Đang lọc danh mục:</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 text-xs font-semibold">
                  <span>{STORE_CATEGORIES.find((c) => c.id === selectedCategory)?.name}</span>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="hover:text-red-500 cursor-pointer ml-0.5"
                  >
                    <Close sx={{ fontSize: 13 }} />
                  </button>
                </span>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-xs text-slate-400 hover:text-red-500 hover:underline cursor-pointer"
                >
                  Xóa lọc
                </button>
              </div>
            )}

            {/* Danh sách lưới sản phẩm */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-2xs">
                <Inventory2 sx={{ fontSize: 40 }} className="text-slate-300 mb-3 mx-auto" />
                <h3 className="text-sm font-bold text-slate-800 mb-1">
                  Không tìm thấy sản phẩm phù hợp
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Vui lòng thử lại với từ khóa khác hoặc xóa bộ lọc danh mục.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setSearchQuery('')
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white cursor-pointer shadow-2xs hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: BRAND_COLORS.primary.main, color: BRAND_COLORS.primary.contrastText }}
                >
                  <RestartAlt sx={{ fontSize: 14 }} />
                  <span>Xem tất cả sản phẩm</span>
                </button>
              </div>
            ) : (
              <>
                <div id="store-products-anchor" className="scroll-mt-6" />
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {paginatedProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className="group bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all duration-200 flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        {/* Ảnh sản phẩm vuông tỷ lệ 1:1 chuẩn trang mua hàng */}
                        <div className="relative aspect-square w-full overflow-hidden bg-slate-50 p-2 border-b border-slate-100 flex items-center justify-center">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          />
                          {/* Huy hiệu nhỏ gọn */}
                          {product.featured && (
                            <span
                              className="absolute top-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded-md text-white shadow-2xs z-10"
                              style={{ backgroundColor: BRAND_COLORS.primary.main }}
                            >
                              Hot
                            </span>
                          )}
                          <span className="absolute top-2 right-2 text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/90 z-10">
                            Sẵn kho
                          </span>
                        </div>

                        {/* Thông tin sản phẩm */}
                        <div className="p-3">
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-0.5 truncate">
                            {product.brand}
                          </span>

                          <h2
                            className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-sky-600 transition-colors mb-1.5 min-h-[2.4rem]"
                            title={product.name}
                          >
                            {product.name}
                          </h2>

                          <div className="inline-block px-1.5 py-0.5 rounded-sm bg-slate-100 text-[10px] font-medium text-slate-600 mb-2 truncate max-w-full">
                            {product.specs}
                          </div>

                          {/* Đánh giá sao */}
                          <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-2">
                            <div className="flex items-center text-amber-500">
                              <Star sx={{ fontSize: 13 }} />
                              <span className="font-bold text-slate-700 ml-0.5">{product.rating}</span>
                            </div>
                            <span>({product.reviewsCount})</span>
                          </div>
                        </div>
                      </div>

                      {/* Giá & Nút hành động */}
                      <div className="p-3 pt-0 border-t border-slate-100/80">
                        <div className="flex items-baseline gap-1 my-1.5">
                          <span className="text-xs sm:text-sm font-black text-rose-600">
                            {product.price}
                          </span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {product.unit}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedProduct(product)
                          }}
                          className="w-full py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all shadow-2xs hover:opacity-90 cursor-pointer"
                          style={{
                            backgroundColor: BRAND_COLORS.primary.main,
                            color: BRAND_COLORS.primary.contrastText
                          }}
                        >
                          <ShoppingCart sx={{ fontSize: 13 }} />
                          <span>Báo giá / Mua</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Phân trang */}
                {totalPages > 1 && (
                  <Box display="flex" justifyContent="center" pt={4} pb={2}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      size="medium"
                      showFirstButton
                      showLastButton
                      sx={{
                        '& .MuiPaginationItem-root': {
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          borderRadius: '8px',
                          color: BRAND_COLORS.neutral.textPrimary,
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            backgroundColor: `${BRAND_COLORS.secondary.dark} !important`,
                            color: '#ffffff !important',
                            '& .MuiPaginationItem-icon, & svg': {
                              color: '#ffffff !important',
                              fill: '#ffffff !important'
                            }
                          }
                        },
                        '& .Mui-selected': {
                          backgroundColor: `${BRAND_COLORS.primary.main} !important`,
                          color: `${BRAND_COLORS.primary.contrastText} !important`,
                          '&:hover': {
                            backgroundColor: `${BRAND_COLORS.primary.light} !important`,
                            color: '#ffffff !important'
                          }
                        }
                      }}
                    />
                  </Box>
                )}
              </>
            )}
          </main>
        </div>
      </Container>

      {/* 4. MODAL CHI TIẾT & ĐẶT BÁO GIÁ NHANH */}
      <Dialog
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            overflow: 'hidden'
          }
        }}
      >
        {selectedProduct && (
          <div className="bg-white">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Chi tiết sản phẩm & Đặt hàng
              </span>
              <IconButton size="small" onClick={() => setSelectedProduct(null)}>
                <Close sx={{ fontSize: 20 }} />
              </IconButton>
            </div>

            <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Ảnh to bên trái */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 p-4 flex items-center justify-center">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-contain p-4"
                    sizes="360px"
                  />
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <CheckCircle sx={{ fontSize: 15 }} />
                  <span>Sản phẩm có sẵn - Giao trong ngày</span>
                </div>
              </div>

              {/* Thông số kỹ thuật & Đặt hàng bên phải */}
              <div className="md:col-span-7 space-y-3.5">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {selectedProduct.brand} • {selectedProduct.categoryName}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mt-0.5">
                    {selectedProduct.name}
                  </h3>
                </div>

                {/* Giá bán niêm yết */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/90 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Đơn giá tham khảo</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg sm:text-xl font-black text-rose-600">
                        {selectedProduct.price}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {selectedProduct.unit}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium text-right">
                    Giá sỉ công trình: <strong className="text-sky-700">Chiết khấu cao</strong>
                  </span>
                </div>

                {/* Quy cách & Tiêu chuẩn */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Quy cách đóng gói</span>
                    <span className="font-bold text-slate-800">{selectedProduct.specs}</span>
                  </div>
                  {selectedProduct.standards && (
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block">Tiêu chuẩn kỹ thuật</span>
                      <span className="font-bold text-slate-800">{selectedProduct.standards}</span>
                    </div>
                  )}
                </div>

                {/* Mô tả chi tiết */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Đặc điểm & Ứng dụng
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Gạch đầu dòng nổi bật */}
                <div className="space-y-1.5">
                  {selectedProduct.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check sx={{ fontSize: 15, color: BRAND_COLORS.secondary.dark }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* 2 nút hành động trực tiếp */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={`tel:${CONTACT.PHONE.replace(/\s+/g, '')}`}
                    className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-opacity hover:opacity-90 shadow-sm"
                    style={{
                      backgroundColor: BRAND_COLORS.primary.main,
                      color: BRAND_COLORS.primary.contrastText
                    }}
                  >
                    <Phone sx={{ fontSize: 16 }} style={{ color: BRAND_COLORS.secondary.main }} />
                    <span>Gọi đặt hàng: {CONTACT.PHONE}</span>
                  </a>

                  <Link
                    href={`/contact?subject=Báo giá vật tư: ${selectedProduct.name}&message=Tôi muốn nhận báo giá khối lượng lớn cho sản phẩm ${selectedProduct.name} (${selectedProduct.specs}). Vui lòng liên hệ lại.`}
                    onClick={() => setSelectedProduct(null)}
                    className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 border transition-colors hover:bg-slate-100 text-slate-800"
                    style={{ borderColor: BRAND_COLORS.secondary.border }}
                  >
                    <span>Yêu cầu báo giá văn bản</span>
                    <ArrowForward sx={{ fontSize: 14 }} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </Box>
  )
}
