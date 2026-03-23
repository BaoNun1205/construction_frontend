import { ProjectCategory } from './projectCategory'

export interface Project {
  _id: string
  slug: string
  title: string
  workingScope: string[]
  startDate: string
  endDate?: string | null
  mainImage: string
  mediaFolder?: string
  media: string[]
  details: string[]
  status: 'completed' | 'in-progress'
  description: string
  isFeatured: boolean
  category: ProjectCategory
  createdAt?: string
  updatedAt?: string
}

export interface CreateProjectDto {
  title: string
  workingScope: string[]
  startDate: string
  endDate?: string | null
  mainImage?: string
  media?: string[]
  mediaFolder?: string
  details: string[]
  status: 'completed' | 'in-progress'
  description: string
  isFeatured?: boolean
  category: string
  deletedMedia?: string[]
}

export type UpdateProjectDto = Partial<CreateProjectDto>
