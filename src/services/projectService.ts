import api from '@/lib/axios'
import { ApiResponse } from '@/types/api'
import { CreateProjectDto, Project, UpdateProjectDto } from '@/types/project'

export class ProjectService {
  // GET /projects or GET /projects?status=xxx
  static async getProjects(status?: string): Promise<Project[]> {
    const config = { requireAuth: false }
    let res: ApiResponse<Project[]>
    if (status) {
      res = await api.get('/projects', {
        ...config,
        params: { status }
      })
    } else {
      res = await api.get('/projects', config)
    }

    return res.data
  }

  // GET /projects/:id
  static async getProjectById(id: string): Promise<Project> {
    const res: ApiResponse<Project> = await api.get(`/projects/${id}`, {
      requireAuth: false
    })
    return res.data
  }

  // GET /projects/slug/:slug
  static async getProjectBySlug(slug: string): Promise<Project> {
    const res: ApiResponse<Project> = await api.get(`/projects/slug/${slug}`, {
      requireAuth: false
    })
    return res.data
  }

  // POST /projects
  static async createProject(projectData: CreateProjectDto): Promise<Project> {
    return await api.post<Project>('/projects', projectData, {
      requireAuth: true
    })
  }

  // POST /projects/with-media
  static async createProjectWithMedia(
    projectData: CreateProjectDto, 
    files: File[]
  ): Promise<Project> {
    const formData = new FormData()
    
    // Add data project
    Object.entries(projectData).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item)
          })
        } else {
          formData.append(key, value.toString())
        }
      }
    })
    
    // Add files
    files.forEach((file) => {
      formData.append('media', file)
    })

    return await api.post<Project>('/projects/with-media', formData, {
      requireAuth: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  // PUT /projects/:id
  static async updateProject(id: string, projectData: UpdateProjectDto): Promise<Project> {
    return await api.put<Project>(`/projects/${id}`, projectData, {
      requireAuth: true
    })
  }

  // PUT /projects/:id/media
  static async updateProjectWithMedia(
    id: string,
    projectData: UpdateProjectDto, 
    files: File[]
  ): Promise<Project> {
    const formData = new FormData()
    
    // Add data project
    Object.entries(projectData).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item)
          })
        } else {
          formData.append(key, value.toString())
        }
      }
    })
    
    // Add new files
    files.forEach((file) => {
      formData.append('media', file)
    })

    return await api.put<Project>(`/projects/${id}/media`, formData, {
      requireAuth: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  // DELETE /projects/:id
  static async deleteProject(id: string): Promise<void> {
    await api.delete(`/projects/${id}`, {
      requireAuth: true
    })
  }
}

export default ProjectService
