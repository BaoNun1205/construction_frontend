'use client'

import React from 'react'
import { Button, Space } from 'antd'
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons'
import { useAuth, useAuthActions } from '@/hooks/useAuth'
import Link from 'next/link'

export default function AuthButtons() {
  const { isAuthenticated, user } = useAuth()
  const { logout, isLoggingOut } = useAuthActions()

  if (isAuthenticated) {
    return (
      <Space>
        <span>Xin chào, {user?.name}</span>
        <Button
          type="text"
          onClick={logout}
          loading={isLoggingOut}
          icon={<LoginOutlined />}
        >
          Đăng xuất
        </Button>
      </Space>
    )
  }

  return (
    <Space>
      <Link href="/auth">
        <Button type="text" icon={<LoginOutlined />}>
          Đăng nhập
        </Button>
      </Link>
      <Link href="/auth">
        <Button type="primary" icon={<UserAddOutlined />}>
          Đăng ký
        </Button>
      </Link>
    </Space>
  )
}