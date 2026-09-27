export interface TemplateCategory {
  _id?: string
  id?: string
  name: string
  slug: string
  code?: string
  description?: string
  icon?: string
  order?: number
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface DesignTemplate {
  _id?: string
  id: string
  code: string
  slug: string
  title: string
  category: string | TemplateCategory
  categoryName?: string
  style: string
  styleName?: string
  area: number // m² diện tích xây dựng
  landArea?: number // m² diện tích khu đất
  floors: number // số tầng
  bedrooms: number // số phòng ngủ
  bathrooms: number // số phòng vệ sinh
  facade?: string // Mặt tiền (e.g. 6m, 12m)
  depth?: string // Chiều sâu (e.g. 18m, 25m)
  designCost: number // Chi phí thiết kế (VNĐ)
  constructionCostEstimated: number // Chi phí thi công ước tính (VNĐ)
  description: string
  features: string[]
  mainImage: string
  images: string[]
  mediaFolder?: string
  featured: boolean
  status: 'active' | 'draft' | string
  createdAt?: string
  updatedAt?: string
}

export interface DesignTemplateFilter {
  search?: string
  category?: string
  categories?: string[]
  style?: string
  styles?: string[]
  floorRanges?: string[]
  sortBy?: 'featured' | 'area-asc' | 'area-desc' | 'cost-asc' | 'cost-desc' | string
  page?: number
  limit?: number
}
