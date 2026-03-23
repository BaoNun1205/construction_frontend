import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ProjectService } from '@/services/projectService'
import { CreateProjectDto, Project, UpdateProjectDto } from '@/types/project'

// Query Keys - centralizes cache key management for consistency
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...projectKeys.lists(), { filters }] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
  slug: (slug: string) => [...projectKeys.all, 'slug', slug] as const,
  featured: () => [...projectKeys.all, 'featured'] as const
}

const upsertProjectInList = (projects: Project[] | undefined, updatedProject: Project) => {
  if (!projects) {
    return [updatedProject]
  }

  const hasProject = projects.some((project) => project._id === updatedProject._id)

  if (!hasProject) {
    return [updatedProject, ...projects]
  }

  return projects.map((project) =>
    project._id === updatedProject._id ? updatedProject : project
  )
}

// Fetch all projects or filter by status
export function useProjects(status?: string) {
  return useQuery({
    queryKey: status ? projectKeys.list({ status }) : projectKeys.lists(),
    queryFn: () => ProjectService.getProjects(status),
    staleTime: 5 * 60 * 1000 // cache for 5 minutes
  })
}

// Fetch a single project by id
export function useProjectDetail(id: string) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => ProjectService.getProjectById(id),
    enabled: !!id // only run if id is provided
  })
}

export function useProjectBySlug(slug: string) {
  return useQuery({
    queryKey: projectKeys.slug(slug),
    queryFn: () => ProjectService.getProjectBySlug(slug),
    enabled: !!slug // only run if slug is provided
  })
}

// Fetch featured projects
export function useFeaturedProjects() {
  return useQuery({
    queryKey: projectKeys.featured(),
    queryFn: () => ProjectService.getFeaturedProjects(),
    staleTime: 5 * 60 * 1000 // cache for 5 minutes
  })
}

// Create a new project (without media files)
export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (projectData: CreateProjectDto) => ProjectService.createProject(projectData),
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all })

      queryClient.setQueryData<Project[]>(projectKeys.lists(), (old) => {
        return old ? [newProject, ...old] : [newProject]
      })
    },
    onError: (error) => {
      console.error('Error creating project:', error)
    }
  })
}

// Create a new project with media files
export function useCreateProjectWithMedia() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ projectData, files }: { projectData: CreateProjectDto; files: File[] }) =>
      ProjectService.createProjectWithMedia(projectData, files),
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all })
      queryClient.setQueryData<Project[]>(projectKeys.lists(), (old) => {
        return old ? [newProject, ...old] : [newProject]
      })
    },
    onError: (error) => {
      console.error('Error creating project with media:', error)
    }
  })
}

// Update an existing project (without media files)
export function useUpdateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectDto }) =>
      ProjectService.updateProject(id, data),
    onSuccess: (updatedProject, { id }) => {
      queryClient.setQueryData<Project>(projectKeys.detail(id), updatedProject)
      queryClient.setQueriesData<Project[]>(
        { queryKey: projectKeys.lists() },
        (old) => upsertProjectInList(old, updatedProject)
      )
      queryClient.setQueryData<Project[]>(
        projectKeys.featured(),
        (old) => {
          const nextList = upsertProjectInList(old, updatedProject)
          return nextList.filter((project) => project.isFeatured)
        }
      )
      queryClient.invalidateQueries({ queryKey: projectKeys.all })
    },
    onError: (error) => {
      console.error('Error updating project:', error)
    }
  })
}

// Update an existing project with media files
export function useUpdateProjectWithMedia() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data, files }: {
      id: string;
      data: UpdateProjectDto;
      files: File[]
    }) => ProjectService.updateProjectWithMedia(id, data, files),
    onSuccess: (updatedProject, { id }) => {
      queryClient.setQueryData<Project>(projectKeys.detail(id), updatedProject)
      queryClient.setQueriesData<Project[]>(
        { queryKey: projectKeys.lists() },
        (old) => upsertProjectInList(old, updatedProject)
      )
      queryClient.setQueryData<Project[]>(
        projectKeys.featured(),
        (old) => {
          const nextList = upsertProjectInList(old, updatedProject)
          return nextList.filter((project) => project.isFeatured)
        }
      )
      queryClient.invalidateQueries({ queryKey: projectKeys.all })
    },
    onError: (error) => {
      console.error('Error updating project with media:', error)
    }
  })
}

// Delete a project by id
export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => ProjectService.deleteProject(id),
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: projectKeys.detail(deletedId) })
      queryClient.invalidateQueries({ queryKey: projectKeys.all })

      queryClient.setQueryData<Project[]>(projectKeys.lists(), (old) => {
        return old ? old.filter(project => project._id !== deletedId) : []
      })
    },
    onError: (error) => {
      console.error('Error deleting project:', error)
    }
  })
}
