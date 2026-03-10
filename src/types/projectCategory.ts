export interface ProjectCategory {
  _id: string
  name: string
  slug: string
  description: string
  icon: string
  completedProjects: string
  constructionTypes: string[]
  order: number
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

export interface CreateProjectCategoryDto {
  name: string
  slug?: string
  description?: string
  icon?: string
  completedProjects?: string
  constructionTypes?: string[]
  order?: number
  isActive?: boolean
}

export type UpdateProjectCategoryDto = Partial<CreateProjectCategoryDto>
