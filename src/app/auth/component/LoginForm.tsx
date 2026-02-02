'use client'

import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { MailOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useLogin } from '@/services/authService'

export default function LoginForm() {
  const loginMutation = useLogin()

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      await loginMutation.mutateAsync(values)
      // NextAuth will handle redirect automatically via callbackUrl
      message.success('Đăng nhập thành công!')
    } catch {
      message.error('Email hoặc mật khẩu không đúng!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Chào mừng trở lại
        </h2>
        <p className="text-gray-600">
          Đăng nhập để tiếp tục quản lý dự án của bạn
        </p>
      </div>

      <Form
        name="login"
        onFinish={onFinish}
        layout="vertical"
        size="large"
        className="space-y-4"
      >
        <Form.Item
          name="email"
          label={<span className="text-gray-700 font-medium">Email</span>}
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-gray-400" />}
            placeholder="example@laiphat.com"
            className="rounded-lg h-12 border-gray-200 hover:border-blue-400 focus:border-blue-500"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={<span className="text-gray-700 font-medium">Mật khẩu</span>}
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Nhập mật khẩu"
            className="rounded-lg h-12 border-gray-200 hover:border-blue-400 focus:border-blue-500"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
              Quên mật khẩu?
            </a>
          </div>
        </div>

        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            loading={loginMutation.isPending}
            className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {loginMutation.isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          hoặc
        </p>
      </div>

      <Button
        size="large"
        className="w-full h-12 rounded-lg border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-medium"
        icon={<span className="text-red-500 mr-2">G</span>}
      >
        Đăng nhập bằng Google
      </Button>
    </div>
  )
}