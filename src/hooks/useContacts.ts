import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ContactService } from '@/services/contactService'
import {
  Contact,
  CreateContactDto,
  CreateContactResponse,
  DeleteContactResponse
} from '@/types/contact'

export const CONTACT_QUERY_KEYS = {
  all: ['contacts'] as const,
  lists: () => [...CONTACT_QUERY_KEYS.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...CONTACT_QUERY_KEYS.lists(), { filters }] as const,
  details: () => [...CONTACT_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...CONTACT_QUERY_KEYS.details(), id] as const
}

export function useCreateContact() {
  const queryClient = useQueryClient()

  return useMutation<CreateContactResponse, Error, CreateContactDto>({
    mutationFn: ContactService.createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTACT_QUERY_KEYS.lists() })
    }
  })
}

export function useContacts() {
  return useQuery<Contact[], Error>({
    queryKey: CONTACT_QUERY_KEYS.lists(),
    queryFn: ContactService.getAllContacts,
    staleTime: 5 * 60 * 1000
  })
}

export function useContact(id: string) {
  return useQuery<Contact, Error>({
    queryKey: CONTACT_QUERY_KEYS.detail(id),
    queryFn: () => ContactService.getContactById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000
  })
}

export function useMarkContactAsRead() {
  const queryClient = useQueryClient()

  return useMutation<Contact, Error, string>({
    mutationFn: ContactService.markAsRead,
    onSuccess: (data, id) => {
      queryClient.setQueryData(CONTACT_QUERY_KEYS.detail(id), data)
      queryClient.invalidateQueries({ queryKey: CONTACT_QUERY_KEYS.lists() })
    }
  })
}

export function useDeleteContact() {
  const queryClient = useQueryClient()

  return useMutation<DeleteContactResponse, Error, string>({
    mutationFn: ContactService.deleteContact,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: CONTACT_QUERY_KEYS.detail(id) })
      queryClient.invalidateQueries({ queryKey: CONTACT_QUERY_KEYS.lists() })
    }
  })
}
