'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AuthRedirectPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (!session) {
      // No session, redirect to auth page
      router.replace('/auth')
      return
    }

    // Check user role and redirect accordingly
    const role = (session?.user as any)?.role as string | undefined
    
    if (role && role.toLowerCase() === 'admin') {
      router.replace('/admin')
    } else {
      router.replace('/')
    }
  }, [session, status, router])

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Đang chuyển hướng...</p>
      </div>
    </div>
  )
}