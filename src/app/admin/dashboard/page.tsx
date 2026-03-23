'use client'

import React, { useMemo } from 'react'
import {
  Alert,
  Avatar,
  Card,
  Col,
  Empty,
  List,
  Progress,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
  theme
} from 'antd'
import {
  AppstoreOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ContactsOutlined,
  MailOutlined,
  ProjectOutlined,
  StarOutlined
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { useProjects } from '@/hooks/useProjects'
import { useContacts } from '@/hooks/useContacts'
import { useProjectCategoriesIncludingInactive } from '@/hooks/useProjectCategories'
import type { Contact } from '@/types/contact'
import type { Project } from '@/types/project'

const { Title, Text } = Typography

const formatDateTime = (value?: string | null) => {
  if (!value) {
    return '--'
  }

  return dayjs(value).format('DD/MM/YYYY HH:mm')
}

const getProjectReferenceDate = (project: Project) =>
  project.updatedAt || project.createdAt || project.startDate

const getStatusMeta = (status: Project['status']) => {
  if (status === 'completed') {
    return {
      color: 'success',
      icon: <CheckCircleOutlined />,
      label: 'Hoàn thành'
    }
  }

  return {
    color: 'processing',
    icon: <ClockCircleOutlined />,
    label: 'Đang thực hiện'
  }
}

export default function DashboardPage() {
  const { token } = theme.useToken()
  const { data: projects = [], isLoading: projectsLoading, error: projectsError } = useProjects()
  const { data: contacts = [], isLoading: contactsLoading, error: contactsError } = useContacts()
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError
  } = useProjectCategoriesIncludingInactive()

  const summary = useMemo(() => {
    const now = dayjs()
    const totalProjects = projects.length
    const completedProjects = projects.filter((project) => project.status === 'completed').length
    const inProgressProjects = projects.filter((project) => project.status === 'in-progress').length
    const featuredProjects = projects.filter((project) => project.isFeatured).length
    const totalContacts = contacts.length
    const unreadContacts = contacts.filter((contact) => !contact.isRead).length
    const activeCategories = categories.filter((category) => category.isActive).length
    const inactiveCategories = Math.max(categories.length - activeCategories, 0)
    const projectsThisMonth = projects.filter((project) =>
      dayjs(project.createdAt || project.startDate).isSame(now, 'month')
    ).length
    const contactsThisMonth = contacts.filter((contact) =>
      dayjs(contact.createdAt).isSame(now, 'month')
    ).length
    const completionRate = totalProjects > 0
      ? Math.round((completedProjects / totalProjects) * 100)
      : 0
    const unreadRate = totalContacts > 0
      ? Math.round((unreadContacts / totalContacts) * 100)
      : 0
    const featuredRate = totalProjects > 0
      ? Math.round((featuredProjects / totalProjects) * 100)
      : 0

    const topCategories = categories
      .map((category) => {
        const count = projects.filter((project) => project.category?._id === category._id).length

        return {
          ...category,
          count,
          share: totalProjects > 0 ? Math.round((count / totalProjects) * 100) : 0
        }
      })
      .sort((a, b) => {
        if (b.count !== a.count) {
          return b.count - a.count
        }

        return a.name.localeCompare(b.name, 'vi')
      })
      .slice(0, 5)

    const recentProjects = [...projects]
      .sort(
        (a, b) =>
          dayjs(getProjectReferenceDate(b)).valueOf() -
          dayjs(getProjectReferenceDate(a)).valueOf()
      )
      .slice(0, 6)

    const recentContacts = [...contacts]
      .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
      .slice(0, 5)

    return {
      totalProjects,
      completedProjects,
      inProgressProjects,
      featuredProjects,
      totalContacts,
      unreadContacts,
      activeCategories,
      inactiveCategories,
      projectsThisMonth,
      contactsThisMonth,
      completionRate,
      unreadRate,
      featuredRate,
      topCategories,
      recentProjects,
      recentContacts
    }
  }, [categories, contacts, projects])

  const statCards = [
    {
      key: 'projects',
      title: 'Tổng dự án',
      value: summary.totalProjects,
      suffix: 'dự án',
      accent: '#2563eb',
      description: `${summary.projectsThisMonth} dự án mới trong tháng`,
      icon: <ProjectOutlined />
    },
    {
      key: 'completed',
      title: 'Hoàn thành',
      value: summary.completedProjects,
      suffix: 'dự án',
      accent: '#16a34a',
      description: `Tỷ lệ hoàn thành ${summary.completionRate}%`,
      icon: <CheckCircleOutlined />
    },
    {
      key: 'contacts',
      title: 'Liên hệ mới',
      value: summary.totalContacts,
      suffix: 'liên hệ',
      accent: '#7c3aed',
      description: `${summary.unreadContacts} liên hệ chưa đọc`,
      icon: <ContactsOutlined />
    },
    {
      key: 'featured',
      title: 'Dự án nổi bật',
      value: summary.featuredProjects,
      suffix: 'dự án',
      accent: '#f59e0b',
      description: `${summary.featuredRate}% tổng số dự án`,
      icon: <StarOutlined />
    }
  ]

  const projectColumns: ColumnsType<Project> = [
    {
      title: 'Dự án',
      dataIndex: 'title',
      key: 'title',
      render: (_: string, record) => (
        <Space direction="vertical" size={2}>
          <Space size={8} wrap>
            <Text strong>{record.title}</Text>
            {record.isFeatured && <Tag color="gold">Nổi bật</Tag>}
          </Space>
          <Text type="secondary">
            {record.category?.name || 'Chưa có danh mục'}
          </Text>
        </Space>
      )
    },
    {
      title: 'Trạng thái',
      key: 'status',
      width: 150,
      render: (_: unknown, record) => {
        const statusMeta = getStatusMeta(record.status)

        return (
          <Tag color={statusMeta.color} icon={statusMeta.icon}>
            {statusMeta.label}
          </Tag>
        )
      }
    },
    {
      title: 'Ngày dự án',
      key: 'timeline',
      width: 180,
      render: (_: unknown, record) => (
        <Space direction="vertical" size={0}>
          <Text>{dayjs(record.startDate).format('DD/MM/YYYY')}</Text>
          <Text type="secondary">
            {record.endDate ? dayjs(record.endDate).format('DD/MM/YYYY') : 'Chưa có ngày kết thúc'}
          </Text>
        </Space>
      )
    },
    {
      title: 'Cập nhật',
      key: 'updatedAt',
      width: 170,
      render: (_: unknown, record) => (
        <Text type="secondary">{formatDateTime(getProjectReferenceDate(record))}</Text>
      )
    }
  ]

  const dataErrorSections = [
    projectsError ? 'dự án' : null,
    contactsError ? 'liên hệ' : null,
    categoriesError ? 'danh mục' : null
  ].filter(Boolean) as string[]

  const isHeroLoading =
    (projectsLoading && projects.length === 0) ||
    (contactsLoading && contacts.length === 0) ||
    (categoriesLoading && categories.length === 0)

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      {dataErrorSections.length > 0 && (
        <Alert
          type="warning"
          showIcon
          message="Một phần dữ liệu chưa tải được"
          description={`Dashboard vẫn đang hiển thị dữ liệu khả dụng. Các phần đang lỗi: ${dataErrorSections.join(', ')}.`}
        />
      )}

      <Card
        bordered={false}
        loading={isHeroLoading}
        styles={{
          body: {
            padding: 28
          }
        }}
        style={{
          borderRadius: 28,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 52%, #38bdf8 100%)',
          boxShadow: '0 24px 60px rgba(15, 23, 42, 0.16)'
        }}
      >
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} lg={15}>
            <Space direction="vertical" size={10}>
              <Tag
                color="rgba(255,255,255,0.16)"
                style={{
                  borderRadius: 999,
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.22)',
                  paddingInline: 12,
                  paddingBlock: 4,
                  width: 'fit-content'
                }}
              >
                Tổng quan vận hành
              </Tag>
              <Title level={2} style={{ margin: 0, color: 'white' }}>
                Dashboard quản trị hệ thống
              </Title>
              <Text
                style={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: 16,
                  lineHeight: 1.75
                }}
              >
                Theo dõi nhanh dự án, liên hệ khách hàng và danh mục đang vận hành để nắm tình hình quản trị mỗi ngày.
              </Text>
              <Space size={12} wrap>
                <Tag color="rgba(255,255,255,0.14)" style={{ color: 'white', borderRadius: 999, paddingInline: 12, paddingBlock: 4 }}>
                  {summary.projectsThisMonth} dự án mới tháng này
                </Tag>
                <Tag color="rgba(255,255,255,0.14)" style={{ color: 'white', borderRadius: 999, paddingInline: 12, paddingBlock: 4 }}>
                  {summary.contactsThisMonth} liên hệ mới tháng này
                </Tag>
                <Tag color="rgba(255,255,255,0.14)" style={{ color: 'white', borderRadius: 999, paddingInline: 12, paddingBlock: 4 }}>
                  {summary.activeCategories} danh mục đang hoạt động
                </Tag>
              </Space>
            </Space>
          </Col>

          <Col xs={24} lg={9}>
            <Row gutter={[12, 12]}>
              <Col xs={12}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 20,
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(16px)',
                    color: 'white'
                  }}
                  styles={{ body: { padding: 20 } }}
                >
                  <Statistic
                    title={<span style={{ color: 'rgba(255,255,255,0.72)' }}>Hoàn thành</span>}
                    value={summary.completionRate}
                    suffix="%"
                    valueStyle={{ color: 'white' }}
                    prefix={<CheckCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={12}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 20,
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(16px)',
                    color: 'white'
                  }}
                  styles={{ body: { padding: 20 } }}
                >
                  <Statistic
                    title={<span style={{ color: 'rgba(255,255,255,0.72)' }}>Chưa đọc</span>}
                    value={summary.unreadContacts}
                    suffix="liên hệ"
                    valueStyle={{ color: 'white' }}
                    prefix={<MailOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 20,
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(16px)',
                    color: 'white'
                  }}
                  styles={{ body: { padding: 20 } }}
                >
                  <Space direction="vertical" size={10} style={{ width: '100%' }}>
                    <Text style={{ color: 'rgba(255,255,255,0.72)' }}>
                      Phân bổ trạng thái dự án
                    </Text>
                    <Progress
                      percent={summary.completionRate}
                      showInfo={false}
                      strokeColor="#86efac"
                      trailColor="rgba(255,255,255,0.14)"
                    />
                    <Row gutter={[12, 8]}>
                      <Col span={12}>
                        <Text style={{ color: 'white' }}>
                          {summary.completedProjects} hoàn thành
                        </Text>
                      </Col>
                      <Col span={12}>
                        <Text style={{ color: 'white' }}>
                          {summary.inProgressProjects} đang thực hiện
                        </Text>
                      </Col>
                    </Row>
                  </Space>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        {statCards.map((card) => (
          <Col xs={24} sm={12} xl={6} key={card.key}>
            <Card
              bordered={false}
              loading={isHeroLoading}
              style={{
                borderRadius: 22,
                boxShadow: '0 14px 34px rgba(15, 23, 42, 0.06)',
                height: '100%'
              }}
              styles={{ body: { padding: 22 } }}
            >
              <Space direction="vertical" size={14} style={{ width: '100%' }}>
                <Avatar
                  size={52}
                  icon={card.icon}
                  style={{
                    backgroundColor: `${card.accent}18`,
                    color: card.accent
                  }}
                />
                <Space direction="vertical" size={4}>
                  <Text type="secondary">{card.title}</Text>
                  <Title level={3} style={{ margin: 0 }}>
                    {card.value.toLocaleString('vi-VN')} <Text type="secondary">{card.suffix}</Text>
                  </Title>
                </Space>
                <Text style={{ color: token.colorTextDescription }}>
                  {card.description}
                </Text>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={8}>
          <Card
            bordered={false}
            loading={projectsLoading && projects.length === 0}
            title="Hiệu suất dự án"
            style={{ borderRadius: 22, height: '100%' }}
            styles={{ body: { padding: 24 } }}
          >
            <Row gutter={[20, 20]} align="middle">
              <Col xs={24} sm={10} xl={24} xxl={10}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Progress
                    type="circle"
                    percent={summary.completionRate}
                    size={150}
                    strokeColor={{
                      '0%': '#38bdf8',
                      '100%': '#2563eb'
                    }}
                    trailColor="#e2e8f0"
                  />
                </div>
              </Col>
              <Col xs={24} sm={14} xl={24} xxl={14}>
                <Space direction="vertical" size={14} style={{ width: '100%' }}>
                  <div>
                    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                      <Text>Hoàn thành</Text>
                      <Text strong>{summary.completedProjects}</Text>
                    </Space>
                    <Progress
                      percent={summary.totalProjects ? Math.round((summary.completedProjects / summary.totalProjects) * 100) : 0}
                      showInfo={false}
                      strokeColor="#22c55e"
                    />
                  </div>
                  <div>
                    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                      <Text>Đang thực hiện</Text>
                      <Text strong>{summary.inProgressProjects}</Text>
                    </Space>
                    <Progress
                      percent={summary.totalProjects ? Math.round((summary.inProgressProjects / summary.totalProjects) * 100) : 0}
                      showInfo={false}
                      strokeColor="#3b82f6"
                    />
                  </div>
                  <div>
                    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                      <Text>Nổi bật</Text>
                      <Text strong>{summary.featuredProjects}</Text>
                    </Space>
                    <Progress
                      percent={summary.featuredRate}
                      showInfo={false}
                      strokeColor="#f59e0b"
                    />
                  </div>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} xl={8}>
          <Card
            bordered={false}
            loading={contactsLoading && contacts.length === 0}
            title="Tín hiệu liên hệ"
            style={{ borderRadius: 22, height: '100%' }}
            styles={{ body: { padding: 24 } }}
          >
            <Space direction="vertical" size={18} style={{ width: '100%' }}>
              <div
                style={{
                  borderRadius: 18,
                  padding: 18,
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(59,130,246,0.12) 100%)'
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Statistic
                      title="Tổng liên hệ"
                      value={summary.totalContacts}
                      prefix={<ContactsOutlined />}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Chưa đọc"
                      value={summary.unreadContacts}
                      prefix={<MailOutlined />}
                    />
                  </Col>
                </Row>
              </div>

              <div>
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Text>Tỷ lệ liên hệ chưa đọc</Text>
                  <Text strong>{summary.unreadRate}%</Text>
                </Space>
                <Progress
                  percent={summary.unreadRate}
                  showInfo={false}
                  strokeColor="#7c3aed"
                />
              </div>

              <div>
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Text>Liên hệ mới trong tháng</Text>
                  <Text strong>{summary.contactsThisMonth}</Text>
                </Space>
                <Progress
                  percent={summary.totalContacts ? Math.round((summary.contactsThisMonth / summary.totalContacts) * 100) : 0}
                  showInfo={false}
                  strokeColor="#2563eb"
                />
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} xl={8}>
          <Card
            bordered={false}
            loading={categoriesLoading && categories.length === 0}
            title="Danh mục nổi bật"
            style={{ borderRadius: 22, height: '100%' }}
            styles={{ body: { padding: 24 } }}
          >
            {summary.topCategories.length > 0 ? (
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                {summary.topCategories.map((category) => (
                  <div key={category._id}>
                    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                      <Space size={8}>
                        <Text strong>{category.name}</Text>
                        {!category.isActive && <Tag>Ẩn</Tag>}
                      </Space>
                      <Text type="secondary">{category.count} dự án</Text>
                    </Space>
                    <Progress
                      percent={category.share}
                      showInfo={false}
                      strokeColor={category.isActive ? '#2563eb' : '#94a3b8'}
                    />
                  </div>
                ))}

                <Row gutter={[12, 12]}>
                  <Col span={12}>
                    <Statistic
                      title="Đang hoạt động"
                      value={summary.activeCategories}
                      prefix={<AppstoreOutlined />}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Tạm ẩn"
                      value={summary.inactiveCategories}
                      prefix={<AppstoreOutlined />}
                    />
                  </Col>
                </Row>
              </Space>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Chưa có danh mục để thống kê"
              />
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xxl={16}>
          <Card
            bordered={false}
            title="Dự án cập nhật gần đây"
            style={{ borderRadius: 22 }}
            styles={{ body: { padding: 0 } }}
          >
            <Table<Project>
              rowKey={(record) => record._id}
              columns={projectColumns}
              dataSource={summary.recentProjects}
              loading={projectsLoading}
              pagination={false}
              locale={{
                emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có dự án" />
              }}
              scroll={{ x: 760 }}
            />
          </Card>
        </Col>

        <Col xs={24} xxl={8}>
          <Card
            bordered={false}
            title="Liên hệ mới nhất"
            style={{ borderRadius: 22, height: '100%' }}
            styles={{ body: { padding: 12 } }}
          >
            <List<Contact>
              dataSource={summary.recentContacts}
              loading={contactsLoading}
              locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có liên hệ" /> }}
              renderItem={(contact) => (
                <List.Item style={{ paddingInline: 12, paddingBlock: 14 }}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor: contact.isRead ? token.colorFillSecondary : '#ede9fe',
                          color: contact.isRead ? token.colorTextSecondary : '#6d28d9'
                        }}
                      >
                        {contact.name?.trim()?.charAt(0)?.toUpperCase() || 'K'}
                      </Avatar>
                    }
                    title={
                      <Space size={8} wrap>
                        <Text strong>{contact.name}</Text>
                        <Tag color={contact.isRead ? 'default' : 'purple'}>
                          {contact.isRead ? 'Đã đọc' : 'Chưa đọc'}
                        </Tag>
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={2}>
                        <Text type="secondary">{contact.email}</Text>
                        <Text type="secondary">
                          {formatDateTime(contact.createdAt)}
                        </Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </Space>
  )
}
