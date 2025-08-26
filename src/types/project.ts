import { ProjectCategory } from "./projectCategory"

export interface Project {
  _id: string
  slug: string
  title: string
  workingScope: string[]
  startDate: string
  endDate: string
  mainImage: string
  media: string[]
  details: string[]
  status: 'completed' | 'in-progress'
  description: string
  category: ProjectCategory
  createdAt?: string
  updatedAt?: string
}

export interface CreateProjectDto {
  title: string
  workingScope: string[]
  startDate: string
  endDate: string
  mainImage?: string
  media?: string[]
  details: string[]
  status: 'completed' | 'in-progress'
  description: string
  category: string
}

export interface UpdateProjectDto {
  title?: string
  workingScope?: string[]
  startDate?: string
  endDate?: string
  mainImage?: string
  media?: string[]
  details?: string[]
  status?: 'completed' | 'in-progress'
  description?: string
  category?: string
}