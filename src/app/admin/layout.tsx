'use client'

import React from 'react'
import { Layout, Menu, theme, Breadcrumb, Avatar, Dropdown, Space, Spin } from 'antd'
import {
  DashboardOutlined,
  ProjectOutlined,
  DesktopOutlined,
  ContactsOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import AdminProvider from '@/components/admin/AdminProvider'
import BrandLogo from '@/components/ui/BrandLogo'
import { useAdminAuth, useAuthActions } from '@/hooks/useAuth'

const { Header, Sider, Content } = Layout

const menuItems = [
  {
    key: '/admin/dashboard',
    icon: <DashboardOutlined />,
    label: <Link href="/admin/dashboard">Trang chủ</Link>
  },
  {
    key: '/admin/projects',
    icon: <ProjectOutlined />,
    label: <Link href="/admin/projects">Quản lý dự án</Link>
  },
  {
    key: '/admin/design-templates',
    icon: <DesktopOutlined />,
    label: <Link href="/admin/design-templates">Mẫu thiết kế</Link>
  },
  {
    key: '/admin/contacts',
    icon: <ContactsOutlined />,
    label: <Link href="/admin/contacts">Liên lạc khách hàng</Link>
  }
]

const userMenuItems = [
  {
    key: 'profile',
    icon: <UserOutlined />,
    label: 'Thông tin cá nhân'
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Cài đặt'
  },
  {
    type: 'divider' as const
  },
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: 'Đăng xuất',
    danger: true
  }
]

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { isLoading, isAdmin, user } = useAdminAuth()
  const { logout } = useAuthActions()
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }

  // If not admin, the useAdminAuth hook will redirect
  if (!isAdmin) {
    return null
  }

  // Get breadcrumb items based on current path
  const getBreadcrumbItems = () => {
    const pathSegments = pathname?.split('/').filter(Boolean) || []
    const breadcrumbItems = [
      {
        title: <Link href="/admin/dashboard">Admin</Link>
      }
    ]

    if (pathSegments.length > 1) {
      const currentPage = pathSegments[pathSegments.length - 1]
      const pageLabels: { [key: string]: string } = {
        dashboard: 'Trang chủ',
        projects: 'Quản lý dự án',
        'design-templates': 'Mẫu thiết kế',
        contacts: 'Liên lạc khách hàng'
      }

      breadcrumbItems.push({
        title: <span>{pageLabels[currentPage] || currentPage}</span>
      })
    }

    return breadcrumbItems
  }

  const handleUserMenuClick = ({ key }: { key: string }) => {
    switch (key) {
    case 'logout':
      logout()
      break
    case 'profile':
      // Handle profile navigation
      break
    case 'settings':
      // Handle settings navigation
      break
    }
  }

  return (
    <AdminProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={240}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0
          }}
        >
          <BrandLogo sx={{ padding: '12px 16px' }} collapsed={collapsed} />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={pathname ? [pathname] : []}
            items={menuItems}
          />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 240, transition: 'all 0.2s' }}>
          <Header
            style={{
              padding: '0 24px',
              background: colorBgContainer,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {collapsed ? (
                <MenuUnfoldOutlined
                  className="trigger"
                  onClick={() => setCollapsed(!collapsed)}
                  style={{ fontSize: '18px', cursor: 'pointer' }}
                />
              ) : (
                <MenuFoldOutlined
                  className="trigger"
                  onClick={() => setCollapsed(!collapsed)}
                  style={{ fontSize: '18px', cursor: 'pointer' }}
                />
              )}
            </div>

            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleUserMenuClick
              }}
              placement="bottomRight"
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar size="small" icon={<UserOutlined />} />
                <span>{user?.name || 'Admin'}</span>
              </Space>
            </Dropdown>
          </Header>

          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Breadcrumb
              style={{ margin: '16px 0' }}
              items={getBreadcrumbItems()}
            />
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </AdminProvider>
  )
}