import { apiClient } from '@/lib/axios'
import { ApiResponse } from '@/types/api'
import { DesignTemplate, DesignTemplateFilter } from '@/types/designTemplate'

export class DesignTemplateService {
  private static transformTemplate(item: Record<string, unknown>): DesignTemplate {
    const categoryObj = typeof item.category === 'object' && item.category !== null ? (item.category as Record<string, unknown>) : null
    const categoryCode = (categoryObj?.code as string) || (categoryObj?.slug as string) || (typeof item.category === 'string' ? item.category : '')
    const categoryName = (item.categoryName as string) || (categoryObj?.name as string) || 'Mẫu thiết kế'

    return {
      ...(item as unknown as DesignTemplate),
      id: (item._id as string) || (item.id as string) || (item.code as string),
      category: categoryCode,
      categoryName,
      styleName: (item.styleName as string) || (item.style as string),
      images: Array.isArray(item.images) && item.images.length > 0 ? (item.images as string[]) : [(item.mainImage as string)]
    }
  }

  // Lọc và tải danh sách mẫu thiết kế trực tiếp từ Database qua Backend API
  static async getTemplates(filters?: DesignTemplateFilter): Promise<DesignTemplate[]> {
    try {
      const params: Record<string, string | number> = { status: 'active' }

      if (filters?.search) params.search = filters.search
      if (filters?.categories && filters.categories.length > 0) {
        params.categories = filters.categories.join(',')
      }
      if (filters?.styles && filters.styles.length > 0) {
        params.styles = filters.styles.join(',')
      }
      if (filters?.floorRanges && filters.floorRanges.length > 0) {
        params.floors = filters.floorRanges.join(',')
      }
      if (filters?.sortBy) params.sortBy = filters.sortBy
      if (filters?.page) params.page = filters.page
      if (filters?.limit) params.limit = filters.limit

      const res: ApiResponse<{ items: Record<string, unknown>[]; total: number }> = await apiClient.get(
        '/design-templates',
        {
          requireAuth: false,
          params
        }
      )

      if (res && res.data && Array.isArray(res.data.items)) {
        return res.data.items.map((item) => this.transformTemplate(item))
      }
      return []
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Lỗi khi tải danh sách mẫu thiết kế từ database:', e)
      return []
    }
  }

  // Lấy chi tiết mẫu thiết kế theo slug từ Database
  static async getTemplateBySlug(slug: string): Promise<DesignTemplate | null> {
    try {
      const res: ApiResponse<Record<string, unknown>> = await apiClient.get(`/design-templates/slug/${slug}`, {
        requireAuth: false
      })
      if (res && res.data) {
        return this.transformTemplate(res.data)
      }
      return null
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`Lỗi khi tải chi tiết mẫu thiết kế slug: ${slug}`, e)
      return null
    }
  }

  // Lấy chi tiết theo ID từ Database
  static async getTemplateById(id: string): Promise<DesignTemplate | null> {
    try {
      const res: ApiResponse<Record<string, unknown>> = await apiClient.get(`/design-templates/${id}`, {
        requireAuth: false
      })
      if (res && res.data) {
        return this.transformTemplate(res.data)
      }
      return null
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`Lỗi khi tải chi tiết mẫu thiết kế id: ${id}`, e)
      return null
    }
  }

  // Lấy danh sách mẫu nổi bật từ Database
  static async getFeaturedTemplates(): Promise<DesignTemplate[]> {
    try {
      const res: ApiResponse<Record<string, unknown>[]> = await apiClient.get('/design-templates/featured', {
        requireAuth: false
      })
      if (res && res.data && Array.isArray(res.data)) {
        return res.data.map((item) => this.transformTemplate(item))
      }
      return []
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Lỗi khi tải mẫu thiết kế nổi bật từ database:', e)
      return []
    }
  }

  // Tạo mới mẫu thiết kế vào Database (Admin)
  static async createTemplate(data: Partial<DesignTemplate>): Promise<DesignTemplate> {
    const res: ApiResponse<Record<string, unknown>> = await apiClient.post('/design-templates', data, {
      requireAuth: true
    })
    return this.transformTemplate(res.data)
  }

  // Cập nhật mẫu thiết kế trong Database (Admin)
  static async updateTemplate(id: string, data: Partial<DesignTemplate>): Promise<DesignTemplate> {
    const res: ApiResponse<Record<string, unknown>> = await apiClient.put(`/design-templates/${id}`, data, {
      requireAuth: true
    })
    return this.transformTemplate(res.data)
  }

  // Xóa mẫu thiết kế khỏi Database (Admin)
  static async deleteTemplate(id: string): Promise<void> {
    await apiClient.delete(`/design-templates/${id}`, {
      requireAuth: true
    })
  }
}

export default DesignTemplateService
