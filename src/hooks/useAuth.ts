import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useLogout, useCurrentUser } from '@/services/authService'

// Extended user type for type safety
interface ExtendedUser {
  id?: string
  email?: string
  name?: string
  role?: string
}

/**
 * Hook for admin authentication and authorization
 * Automatically redirects non-admin users to auth page
 */
export const useAdminAuth = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (!session) {
      router.push('/auth')
      return
    }

    const user = session.user as ExtendedUser
    // Check role case-insensitive
    if (user?.role?.toLowerCase() !== 'admin') {
      router.push('/auth')
      return
    }
  }, [session, status, router])

  const user = session?.user as ExtendedUser

  return {
    session,
    status,
    isAdmin: user?.role?.toLowerCase() === 'admin',
    isLoading: status === 'loading',
    user
  }
}

/**
 * General authentication hook
 * Returns authentication state and user info
 */
export const useAuth = () => {
  const { data: session, status } = useSession()

  const user = session?.user as ExtendedUser

  return {
    session,
    status,
    isAuthenticated: !!session,
    isLoading: status === 'loading',
    user,
    isAdmin: user?.role?.toLowerCase() === 'admin'
  }
}

/**
 * Hook for authentication actions with redirect
 * Provides logout functionality with automatic redirect
 */
export const useAuthActions = () => {
  const router = useRouter()
  const logoutMutation = useLogout()

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync()
      router.push('/auth')
    } catch {
      // Error is handled by the mutation
      router.push('/auth') // Still redirect even if logout fails
    }
  }

  return {
    logout,
    isLoggingOut: logoutMutation.isPending
  }
}

/**
 * Hook to get extended user data from backend
 * Only fetches when user is authenticated
 */
export const useUserProfile = () => {
  const { isAuthenticated } = useAuth()

  return useCurrentUser(isAuthenticated)
}