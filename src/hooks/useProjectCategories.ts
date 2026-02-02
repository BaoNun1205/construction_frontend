import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ProjectCategoriesService } from '@/services/projectCategoriesService'
import {
  CreateProjectCategoryDto,
  UpdateProjectCategoryDto,
  ProjectCategory
} from '@/types/projectCategory'

// Query Keys
export const projectCategoryKeys = {
  all: () => ['project-categories'] as const,
  lists: () => [...projectCategoryKeys.all(), 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...projectCategoryKeys.lists(), { filters }] as const,
  details: () => [...projectCategoryKeys.all(), 'detail'] as const,
  detail: (id: string) => [...projectCategoryKeys.details(), id] as const,
  slug: (slug: string) => [...projectCategoryKeys.all(), 'slug', slug] as const,
  allIncludingInactive: () => [...projectCategoryKeys.all(), 'all-including-inactive'] as const
}

// Fetch all categories (public)
export function useProjectCategories() {
  return useQuery({
    queryKey: projectCategoryKeys.lists(),
    queryFn: () => ProjectCategoriesService.getProjectCategories(),
    staleTime: 5 * 60 * 1000
  })
}

// Fetch all including inactive (public)
export function useProjectCategoriesIncludingInactive() {
  return useQuery({
    queryKey: projectCategoryKeys.allIncludingInactive(),
    queryFn: () => ProjectCategoriesService.getAllIncludingInactive(),
    staleTime: 5 * 60 * 1000
  })
}

// Fetch category by slug
export function useProjectCategoryBySlug(slug?: string) {
  return useQuery({
    queryKey: slug ? projectCategoryKeys.slug(slug) : projectCategoryKeys.all(),
    queryFn: () => ProjectCategoriesService.getBySlug(slug as string),
    enabled: !!slug
  })
}

// Fetch single category by id
export function useProjectCategoryDetail(id?: string) {
  return useQuery({
    queryKey: id ? projectCategoryKeys.detail(id) : projectCategoryKeys.details(),
    queryFn: () => ProjectCategoriesService.getById(id as string),
    enabled: !!id
  })
}

// Create category
export function useCreateProjectCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProjectCategoryDto) => ProjectCategoriesService.create(data),
    onSuccess: (newCategory) => {
      queryClient.invalidateQueries({ queryKey: projectCategoryKeys.lists() })
      queryClient.setQueryData<ProjectCategory[]>(projectCategoryKeys.lists(), (old) =>
        old ? [newCategory, ...old] : [newCategory]
      )
    },
    onError: (err) => {
      console.error('Error creating project category:', err)
    }
  })
}

// Update category
export function useUpdateProjectCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectCategoryDto }) =>
      ProjectCategoriesService.update(id, data),
    onSuccess: (updated, variables) => {
      const id = (variables as { id: string }).id
      queryClient.setQueryData<ProjectCategory>(projectCategoryKeys.detail(id), updated)
      queryClient.invalidateQueries({ queryKey: projectCategoryKeys.lists() })
    },
    onError: (err) => {
      console.error('Error updating project category:', err)
    }
  })
}

// Toggle active
export function useToggleProjectCategoryActive() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => ProjectCategoriesService.toggleActive(id),
    onSuccess: (updated) => {
      // update detail and list caches
      if (updated && updated._id) {
        queryClient.setQueryData<ProjectCategory>(projectCategoryKeys.detail(updated._id), updated)
      }
      queryClient.invalidateQueries({ queryKey: projectCategoryKeys.lists() })
    },
    onError: (err) => {
      console.error('Error toggling project category active:', err)
    }
  })
}

// Update order
export function useUpdateProjectCategoryOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, order }: { id: string; order: number }) =>
      ProjectCategoriesService.updateOrder(id, order),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: projectCategoryKeys.lists() })
      if (updated && updated._id) {
        queryClient.setQueryData<ProjectCategory>(projectCategoryKeys.detail(updated._id), updated)
      }
    },
    onError: (err) => {
      console.error('Error updating project category order:', err)
    }
  })
}

// Delete category
export function useDeleteProjectCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => ProjectCategoriesService.remove(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: projectCategoryKeys.detail(id as string) })
      queryClient.setQueryData<ProjectCategory[]>(projectCategoryKeys.lists(), (old) =>
        old ? old.filter((c) => c._id !== (id as string)) : []
      )
      queryClient.invalidateQueries({ queryKey: projectCategoryKeys.lists() })
    },
    onError: (err) => {
      console.error('Error deleting project category:', err)
    }
  })
}