import { apiClient } from '@/lib/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { signIn, signOut } from 'next-auth/react'
import { ApiResponse } from '@/types/api'

// Types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
}

export interface LoginResponse {
  user: AuthUser
  access_token: string
  refresh_token: string
}

export interface RegisterResponse {
  user: AuthUser
  message: string
}

export class AuthService {
  // POST /auth/login
  static async login(data: LoginRequest): Promise<LoginResponse> {
    const res: ApiResponse<LoginResponse> = await apiClient.post('/auth/login', data, {
      requireAuth: false
    })
    return res.data
  }

  // POST /auth/register
  static async register(data: RegisterRequest): Promise<RegisterResponse> {
    const res: ApiResponse<RegisterResponse> = await apiClient.post('/auth/register', data, {
      requireAuth: false
    })
    return res.data
  }

  // GET /auth/me
  static async getCurrentUser(): Promise<AuthUser> {
    const res: ApiResponse<AuthUser> = await apiClient.get('/auth/me')
    return res.data
  }

  // POST /auth/logout
  static async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
  }

  // POST /auth/refresh
  static async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    const res: ApiResponse<{ access_token: string }> = await apiClient.post('/auth/refresh', {
      refresh_token: refreshToken
    }, {
      requireAuth: false
    })
    return res.data
  }
}

// React Query Keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  currentUser: () => [...authKeys.user(), 'current'] as const
}

// React Query Hooks

/**
 * Hook for user login with NextAuth integration
 */
export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      // Use NextAuth signIn with redirect to handle role-based routing
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: '/auth/redirect' // Redirect to role handler page
      })

      if (result?.error) {
        throw new Error('Email hoặc mật khẩu không đúng!')
      }

      return result
    },
    onSuccess: async () => {
      // Invalidate user data cache
      await queryClient.invalidateQueries({ queryKey: authKeys.user() })
      // NextAuth will handle redirect automatically
    },
    onError: () => {
      // Error is handled by the component
    }
  })
}

/**
 * Hook for user registration
 */
export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => AuthService.register(data),
    onError: () => {
      // Error is handled by the component
    }
  })
}

/**
 * Hook for user logout
 */
export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      // Call backend logout first (interceptor will add token automatically)
      try {
        await AuthService.logout()
      } catch {
        // Backend logout might fail if token is invalid, but that's okay
      }

      // Then sign out client-side (NextAuth)
      await signOut({ redirect: false })
    },
    onSuccess: () => {
      // Clear all queries on logout
      queryClient.clear()
    },
    onError: () => {
      // Error is handled by the component
    }
  })
}

/**
 * Hook to get current user data
 */
export const useCurrentUser = (enabled = true) => {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: () => AuthService.getCurrentUser(),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: unknown) => {
      // Don't retry on 401/403 errors
      const errorResponse = error as { response?: { status?: number } }
      if (errorResponse?.response?.status === 401 || errorResponse?.response?.status === 403) {
        return false
      }
      return failureCount < 3
    }
  })
}

/**
 * Hook to refresh access token
 */
export const useRefreshToken = () => {
  return useMutation({
    mutationFn: (refreshToken: string) => AuthService.refreshToken(refreshToken),
    onError: () => {
      // Error is handled by the component
    }
  })
}