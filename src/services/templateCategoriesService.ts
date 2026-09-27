import { apiClient } from '@/lib/axios'
import { ApiResponse } from '@/types/api'
import { TemplateCategory } from '@/types/designTemplate'

export class TemplateCategoriesService {
  // GET /template-categories
  static async getTemplateCategories(): Promise<TemplateCategory[]> {
    try {
      const res: ApiResponse<TemplateCategory[]> = await apiClient.get('/template-categories', {
        requireAuth: false
      })
      return res.data || []
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Failed to fetch template categories from backend, using fallback', e)
      return []
    }
  }

  // GET /template-categories/all-including-inactive
  static async getAllIncludingInactive(): Promise<TemplateCategory[]> {
    const res: ApiResponse<TemplateCategory[]> = await apiClient.get(
      '/template-categories/all-including-inactive',
      { requireAuth: false }
    )
    return res.data || []
  }

  // GET /template-categories/slug/:slug
  static async getBySlug(slug: string): Promise<TemplateCategory> {
    const res: ApiResponse<TemplateCategory> = await apiClient.get(
      `/template-categories/slug/${slug}`,
      { requireAuth: false }
    )
    return res.data
  }

  // GET /template-categories/:id
  static async getById(id: string): Promise<TemplateCategory> {
    const res: ApiResponse<TemplateCategory> = await apiClient.get(
      `/template-categories/${id}`,
      { requireAuth: false }
    )
    return res.data
  }

  // POST /template-categories
  static async create(data: Partial<TemplateCategory>): Promise<TemplateCategory> {
    const res: ApiResponse<TemplateCategory> = await apiClient.post(
      '/template-categories',
      data,
      { requireAuth: true }
    )
    return res.data
  }

  // PATCH /template-categories/:id
  static async update(id: string, data: Partial<TemplateCategory>): Promise<TemplateCategory> {
    const res: ApiResponse<TemplateCategory> = await apiClient.patch(
      `/template-categories/${id}`,
      data,
      { requireAuth: true }
    )
    return res.data
  }

  // PATCH /template-categories/:id/toggle-active
  static async toggleActive(id: string): Promise<TemplateCategory> {
    const res: ApiResponse<TemplateCategory> = await apiClient.patch(
      `/template-categories/${id}/toggle-active`,
      undefined,
      { requireAuth: true }
    )
    return res.data
  }

  // PATCH /template-categories/:id/order
  static async updateOrder(id: string, order: number): Promise<TemplateCategory> {
    const res: ApiResponse<TemplateCategory> = await apiClient.patch(
      `/template-categories/${id}/order`,
      { order },
      { requireAuth: true }
    )
    return res.data
  }

  // DELETE /template-categories/:id
  static async remove(id: string): Promise<void> {
    await apiClient.delete(`/template-categories/${id}`, { requireAuth: true })
  }
}

export default TemplateCategoriesService
