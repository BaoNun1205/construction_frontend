'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HomeOutlined } from '@ant-design/icons'
import Image from 'next/image'
import BrandLogo from '@/components/ui/BrandLogo'
import LoginForm from './component/LoginForm'
import RegisterForm from './component/RegisterForm'

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login')

  useEffect(() => {
    // Listen for custom event to switch to login tab
    const handleSwitchToLogin = () => {
      setActiveTab('login')
    }

    window.addEventListener('switchToLogin', handleSwitchToLogin)
    return () => {
      window.removeEventListener('switchToLogin', handleSwitchToLogin)
    }
  }, [])

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image/Banner */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-gray-600/90 to-gray-800/80 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/banner/auth.jpg"
            alt="Construction site"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <BrandLogo/>

          <div className="space-y-6">
            <h2 className="text-5xl tracking-tight leading-tight">
              Xây dựng tương lai,<br />
              kiến tạo giá trị
            </h2>
            <p className="text-lg text-slate-300 max-w-md">
              Giải pháp thi công toàn diện, hiện đại và chuyên nghiệp cho mọi quy mô công trình.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl mb-1">500+</div>
              <div className="text-sm text-slate-300">Dự án hoàn thành</div>
            </div>
            <div>
              <div className="text-3xl mb-1">15+</div>
              <div className="text-sm text-slate-300">Năm kinh nghiệm</div>
            </div>
            <div>
              <div className="text-3xl mb-1">98%</div>
              <div className="text-sm text-slate-300">Khách hàng hài lòng</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <HomeOutlined className="text-3xl text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Lai Phát</span>
          </div>

          <Card className="p-8 shadow-lg border-gray-200/50 bg-white">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login" className="text-base">
                  Đăng nhập
                </TabsTrigger>
                <TabsTrigger value="register" className="text-base">
                  Đăng ký
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-0">
                <LoginForm />
              </TabsContent>

              <TabsContent value="register" className="mt-0">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </Card>

          <p className="text-center text-sm text-gray-500 mt-6">
            © 2025 Lai Phát Construction. Giải pháp xây dựng chuyên nghiệp.
          </p>
        </div>
      </div>
    </div>
  )
}