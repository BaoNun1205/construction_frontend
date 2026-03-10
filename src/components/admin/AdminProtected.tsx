'use client'

import React from 'react'
import { useAdminAuth } from '@/hooks/useAuth'
import { Spin } from 'antd'

interface AdminProtectedProps {
  children: React.ReactNode
}

export default function AdminProtected({ children }: AdminProtectedProps) {
  const { isLoading, isAdmin } = useAdminAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }

  if (!isAdmin) {
    return null // useAdminAuth will handle redirect
  }

  return <>{children}</>
}