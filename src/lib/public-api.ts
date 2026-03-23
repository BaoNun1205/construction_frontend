import type { Project } from '@/types/project'
import type { ProjectCategory } from '@/types/projectCategory'

interface ApiEnvelope<T> {
  data?: T
}

const getApiBaseUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000'
  const apiPrefix = process.env.NEXT_PUBLIC_API_PREFIX || '/api/v1'

  return `${apiUrl}${apiPrefix}`
}

async function fetchPublicData<T>(path: string, revalidate = 3600): Promise<T | null> {
  try {
    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      next: { revalidate }
    })

    if (!response.ok) {
      return null
    }

    const json = await response.json() as ApiEnvelope<T>
    return json.data ?? null
  } catch {
    return null
  }
}

export const fetchPublicProjects = (status?: string) =>
  fetchPublicData<Project[]>(status ? `/projects?status=${status}` : '/projects', 1800)

export const fetchPublicProjectBySlug = (slug: string) =>
  fetchPublicData<Project>(`/projects/slug/${slug}`, 1800)

export const fetchPublicProjectCategories = () =>
  fetchPublicData<ProjectCategory[]>('/project-categories', 1800)
