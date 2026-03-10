'use client'

import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { MailOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useRegister } from '@/services/authService'

export default function RegisterForm() {
  const registerMutation = useRegister()

  const onFinish = async (values: { name: string; email: string; password: string; confirmPassword: string }) => {
    try {
      await registerMutation.mutateAsync({
        name: values.name,
        email: values.email,
        password: values.password
      })

      message.success('Đăng ký thành công! Vui lòng đăng nhập.')
      // Switch to login tab - this will be handled by parent component
      setTimeout(() => {
        // Emit custom event to switch tab
        window.dispatchEvent(new CustomEvent('switchToLogin'))
      }, 1000)
    } catch (error: unknown) {
      const errorMessage = (error as { message?: string })?.message || 'Có lỗi xảy ra khi đăng ký!'
      message.error(errorMessage)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Tạo tài khoản mới
        </h2>
        <p className="text-gray-600">
          Tham gia cùng chúng tôi để quản lý dự án hiệu quả
        </p>
      </div>

      <Form
        name="register"
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
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu!' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Nhập mật khẩu"
            className="rounded-lg h-12 border-gray-200 hover:border-blue-400 focus:border-blue-500"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={<span className="text-gray-700 font-medium">Xác nhận mật khẩu</span>}
          dependencies={['password']}
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'))
              }
            })
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Nhập lại mật khẩu"
            className="rounded-lg h-12 border-gray-200 hover:border-blue-400 focus:border-blue-500"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            loading={registerMutation.isPending}
            className="w-full h-12 rounded-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 border-0 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {registerMutation.isPending ? 'Đang đăng ký...' : 'Đăng ký'}
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center text-xs text-gray-500">
        Bằng việc đăng ký, bạn đồng ý với{' '}
        <a href="#" className="text-blue-600 hover:text-blue-800">
          Điều khoản sử dụng
        </a>{' '}
        và{' '}
        <a href="#" className="text-blue-600 hover:text-blue-800">
          Chính sách bảo mật
        </a>{' '}
        của chúng tôi.
      </div>
    </div>
  )
}