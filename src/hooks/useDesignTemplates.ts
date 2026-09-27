import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { DesignTemplateService } from '@/services/designTemplateService'
import { TemplateCategoriesService } from '@/services/templateCategoriesService'
import { DesignTemplate, DesignTemplateFilter, TemplateCategory } from '@/types/designTemplate'

export const designTemplateKeys = {
  all: ['design-templates'] as const,
  lists: () => [...designTemplateKeys.all, 'list'] as const,
  list: (filters?: DesignTemplateFilter) => [...designTemplateKeys.lists(), { filters }] as const,
  detail: (slugOrId: string) => [...designTemplateKeys.all, 'detail', slugOrId] as const,
  featured: () => [...designTemplateKeys.all, 'featured'] as const,
  categories: () => ['template-categories'] as const
}

// Fetch all templates (with optional filters) from real database
export function useDesignTemplates(filters?: DesignTemplateFilter) {
  return useQuery({
    queryKey: designTemplateKeys.list(filters),
    queryFn: () => DesignTemplateService.getTemplates(filters),
    staleTime: 5 * 60 * 1000
  })
}

// Fetch a single template by slug from real database
export function useDesignTemplateBySlug(slug: string) {
  return useQuery({
    queryKey: designTemplateKeys.detail(slug),
    queryFn: () => DesignTemplateService.getTemplateBySlug(slug),
    enabled: !!slug
  })
}

// Fetch featured templates from real database
export function useFeaturedDesignTemplates() {
  return useQuery({
    queryKey: designTemplateKeys.featured(),
    queryFn: () => DesignTemplateService.getFeaturedTemplates(),
    staleTime: 5 * 60 * 1000
  })
}

// Fetch template categories from real database
export function useTemplateCategories() {
  return useQuery({
    queryKey: designTemplateKeys.categories(),
    queryFn: () => TemplateCategoriesService.getTemplateCategories(),
    staleTime: 10 * 60 * 1000
  })
}

// Mutations for Admin
export function useCreateDesignTemplate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<DesignTemplate>) => DesignTemplateService.createTemplate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: designTemplateKeys.all })
    }
  })
}

export function useUpdateDesignTemplate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<DesignTemplate> }) =>
      DesignTemplateService.updateTemplate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: designTemplateKeys.all })
    }
  })
}

export function useDeleteDesignTemplate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => DesignTemplateService.deleteTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: designTemplateKeys.all })
    }
  })
}
