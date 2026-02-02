import { apiClient } from '@/lib/axios'
import { ApiResponse } from '@/types/api'
import {
  CreateProjectCategoryDto,
  UpdateProjectCategoryDto,
  ProjectCategory
} from '@/types/projectCategory'

export class ProjectCategoriesService {
  // GET /project-categories
  static async getProjectCategories(): Promise<ProjectCategory[]> {
    const res: ApiResponse<ProjectCategory[]> = await apiClient.get('/project-categories', {
      requireAuth: false
    })
    return res.data
  }

  // GET /project-categories/all-including-inactive
  static async getAllIncludingInactive(): Promise<ProjectCategory[]> {
    const res: ApiResponse<ProjectCategory[]> = await apiClient.get(
      '/project-categories/all-including-inactive',
      { requireAuth: false }
    )
    return res.data
  }

  // GET /project-categories/slug/:slug
  static async getBySlug(slug: string): Promise<ProjectCategory> {
    const res: ApiResponse<ProjectCategory> = await apiClient.get(`/project-categories/slug/${slug}`, {
      requireAuth: false
    })
    return res.data
  }

  // GET /project-categories/:id
  static async getById(id: string): Promise<ProjectCategory> {
    const res: ApiResponse<ProjectCategory> = await apiClient.get(`/project-categories/${id}`, {
      requireAuth: false
    })
    return res.data
  }

  // POST /project-categories
  static async create(data: CreateProjectCategoryDto): Promise<ProjectCategory> {
    const res: ApiResponse<ProjectCategory> = await apiClient.post('/project-categories', data, {
      requireAuth: true
    })
    return res.data
  }

  // PATCH /project-categories/:id
  static async update(id: string, data: UpdateProjectCategoryDto): Promise<ProjectCategory> {
    const res: ApiResponse<ProjectCategory> = await apiClient.patch(`/project-categories/${id}`, data, {
      requireAuth: true
    })
    return res.data
  }

  // PATCH /project-categories/:id/toggle-active
  static async toggleActive(id: string): Promise<ProjectCategory> {
    const res: ApiResponse<ProjectCategory> = await apiClient.patch(
      `/project-categories/${id}/toggle-active`,
      undefined,
      { requireAuth: true }
    )
    return res.data
  }

  // PATCH /project-categories/:id/order
  static async updateOrder(id: string, order: number): Promise<ProjectCategory> {
    const res: ApiResponse<ProjectCategory> = await apiClient.patch(
      `/project-categories/${id}/order`,
      { order },
      { requireAuth: true }
    )
    return res.data
  }

  // DELETE /project-categories/:id
  static async remove(id: string): Promise<void> {
    await apiClient.delete(`/project-categories/${id}`, { requireAuth: true })
  }
}

export default ProjectCategoriesService