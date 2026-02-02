'use client'

import React from 'react'
import { Result, Button } from 'antd'
import { SafetyOutlined } from '@ant-design/icons'
import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Result
        status="403"
        title="403"
        subTitle="Xin lỗi, bạn không có quyền truy cập trang này."
        icon={<SafetyOutlined />}
        extra={
          <Link href="/auth">
            <Button type="primary" size="large">
              Đăng nhập lại
            </Button>
          </Link>
        }
      />
    </div>
  )
}