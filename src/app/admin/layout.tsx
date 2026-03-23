'use client'

import React, { useEffect, useState } from 'react'
import {
  Layout,
  Menu,
  theme,
  Breadcrumb,
  Avatar,
  Dropdown,
  Space,
  Spin,
  Drawer,
  Grid,
  Typography,
  Button
} from 'antd'
import {
  DashboardOutlined,
  ProjectOutlined,
  DesktopOutlined,
  ContactsOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import AdminProvider from '@/components/admin/AdminProvider'
import BrandLogo from '@/components/ui/BrandLogo'
import { useAdminAuth, useAuthActions } from '@/hooks/useAuth'

const { Header, Sider, Content } = Layout
const { useBreakpoint } = Grid
const { Text } = Typography

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
  const screens = useBreakpoint()
  const isDesktop = screens.lg ?? false
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isLoading, isAdmin, user } = useAdminAuth()
  const { logout } = useAuthActions()
  const {
    token: { colorBgContainer, borderRadiusLG, colorBgLayout, colorBorderSecondary }
  } = theme.useToken()

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname, isDesktop])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  const getBreadcrumbItems = () => {
    const pathSegments = pathname?.split('/').filter(Boolean) || []
    const breadcrumbItems = [
      {
        title: <Link href="/admin/dashboard">Admin</Link>
      }
    ]

    if (pathSegments.length > 1) {
      const currentPage = pathSegments[pathSegments.length - 1]
      const pageLabels: Record<string, string> = {
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
      break
    case 'settings':
      break
    }
  }

  const navigationMenu = (
    <>
      <BrandLogo
        sx={{ padding: isDesktop ? '12px 16px' : '18px 20px 14px' }}
        collapsed={isDesktop ? collapsed : false}
      />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={pathname ? [pathname] : []}
        items={menuItems}
        onClick={() => {
          if (!isDesktop) {
            setMobileMenuOpen(false)
          }
        }}
      />
    </>
  )

  return (
    <AdminProvider>
      <Layout style={{ minHeight: '100vh', background: colorBgLayout }}>
        {isDesktop && (
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={240}
            collapsedWidth={88}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
              boxShadow: '8px 0 28px rgba(15, 23, 42, 0.08)'
            }}
          >
            {navigationMenu}
          </Sider>
        )}

        {!isDesktop && (
          <Drawer
            placement="left"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            closable={false}
            width={288}
            styles={{
              body: {
                padding: 0,
                background: '#001529'
              }
            }}
          >
            {navigationMenu}
          </Drawer>
        )}

        <Layout
          style={{
            marginLeft: isDesktop ? (collapsed ? 88 : 240) : 0,
            transition: 'all 0.2s ease'
          }}
        >
          <Header
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 20,
              padding: isDesktop ? '0 24px' : '0 12px',
              height: isDesktop ? 64 : 56,
              background: colorBgContainer,
              borderBottom: `1px solid ${colorBorderSecondary}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Button
              type="text"
              icon={
                isDesktop
                  ? (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />)
                  : <MenuOutlined />
              }
              onClick={() => {
                if (isDesktop) {
                  setCollapsed((prev) => !prev)
                } else {
                  setMobileMenuOpen(true)
                }
              }}
              style={{ fontSize: 18 }}
            />

            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleUserMenuClick
              }}
              placement="bottomRight"
            >
              <Space size={8} style={{ cursor: 'pointer' }}>
                <Avatar size="small" icon={<UserOutlined />} />
                {isDesktop && <Text>{user?.name || 'Admin'}</Text>}
              </Space>
            </Dropdown>
          </Header>

          <Content
            style={{
              margin: isDesktop ? '24px 16px 0' : '12px 10px 0',
              overflow: 'initial'
            }}
          >
            {isDesktop && (
              <Breadcrumb
                style={{ margin: '0 0 16px' }}
                items={getBreadcrumbItems()}
              />
            )}

            <div
              style={{
                padding: isDesktop ? 24 : 14,
                minHeight: isDesktop ? 360 : 'calc(100vh - 88px)',
                background: colorBgContainer,
                borderRadius: isDesktop ? borderRadiusLG : 18
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
