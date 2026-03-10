'use client'

import React from 'react'
import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'
import AntdRegistry from '@/components/AntdRegistry'

interface AdminProviderProps {
  children: React.ReactNode
}

export default function AdminProvider({ children }: AdminProviderProps) {
  return (
    <AntdRegistry>
      <ConfigProvider
        locale={viVN}
        theme={{
          token: {
            colorPrimary: '#1677ff',
            borderRadius: 6,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  )
}