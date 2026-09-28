'use client'

import { useMemo, useState } from 'react'
import {
  App,
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Drawer,
  Empty,
  Grid,
  Input,
  List,
  Pagination,
  Row,
  Segmented,
  Space,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ContactsOutlined,
  DeleteOutlined,
  EyeOutlined,
  MailOutlined,
  MessageOutlined,
  PhoneOutlined,
  HomeOutlined,
  AppstoreOutlined,
  ShopOutlined,
  ExportOutlined,
  FileTextOutlined
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useContacts, useDeleteContact, useMarkContactAsRead } from '@/hooks/useContacts'
import type { Contact } from '@/types/contact'

const { Title, Text, Paragraph } = Typography
const { Search } = Input
const { useBreakpoint } = Grid

const formatDateTime = (value?: string) => {
  if (!value) {
    return '--'
  }

  return dayjs(value).format('DD/MM/YYYY HH:mm')
}

// Hàm tính toán URL chính xác trỏ đến dự án hoặc mẫu thiết kế cụ thể
const getTargetItemUrl = (contact?: Contact | null): string => {
  if (!contact) return '/'
  if (contact.type === 'template') {
    if (contact.targetCode) {
      return `/projects/design-templates?code=${encodeURIComponent(contact.targetCode)}`
    }
    if (contact.targetTitle) {
      return `/projects/design-templates?search=${encodeURIComponent(contact.targetTitle)}`
    }
    return contact.targetUrl || '/projects/design-templates'
  }
  if (contact.type === 'project') {
    if (contact.targetCode) {
      return `/projects/${encodeURIComponent(contact.targetCode)}`
    }
    return contact.targetUrl || '/projects'
  }
  if (contact.type === 'material') {
    if (contact.targetTitle) {
      return `/store?search=${encodeURIComponent(contact.targetTitle)}`
    }
    return contact.targetUrl || '/store'
  }
  return contact.targetUrl || '/'
}

export default function ContactsPage() {
  const screens = useBreakpoint()
  const isMobile = !screens.md
  const { message: messageApi } = App.useApp()
  const { data: contacts = [], isLoading, error } = useContacts()
  const markAsReadMutation = useMarkContactAsRead()
  const deleteContactMutation = useDeleteContact()

  const [searchValue, setSearchValue] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [drawerImgError, setDrawerImgError] = useState(false)
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const [deletingContactId, setDeletingContactId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const summary = useMemo(() => {
    const now = dayjs()
    const totalContacts = contacts.length
    const unreadContacts = contacts.filter((contact) => !contact.isRead).length
    const quoteRequests = contacts.filter(
      (contact) => (contact.type && contact.type !== 'general') || Boolean(contact.targetTitle)
    ).length
    const contactsThisMonth = contacts.filter((contact) =>
      dayjs(contact.createdAt).isSame(now, 'month')
    ).length

    return {
      totalContacts,
      unreadContacts,
      quoteRequests,
      contactsThisMonth
    }
  }, [contacts])

  const filteredContacts = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase()

    return contacts.filter((contact) => {
      // Type filter
      if (typeFilter === 'quote') {
        const isQuote = (contact.type && contact.type !== 'general') || Boolean(contact.targetTitle)
        if (!isQuote) return false
      } else if (typeFilter === 'project') {
        if (contact.type !== 'project') return false
      } else if (typeFilter === 'template') {
        if (contact.type !== 'template') return false
      } else if (typeFilter === 'material') {
        if (contact.type !== 'material') return false
      } else if (typeFilter === 'general') {
        if (contact.type && contact.type !== 'general') return false
      }

      // Keyword search
      if (!keyword) {
        return true
      }

      const searchableText = [
        contact.name,
        contact.email,
        contact.phone || '',
        contact.message,
        contact.subject || '',
        contact.targetTitle || '',
        contact.targetCode || '',
        contact.targetCategory || ''
      ]
        .join(' ')
        .toLowerCase()

      return searchableText.includes(keyword)
    })
  }, [contacts, searchValue, typeFilter])

  const paginatedContacts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredContacts.slice(startIndex, startIndex + pageSize)
  }, [currentPage, filteredContacts, pageSize])

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact)
    setDrawerImgError(false)
    setIsDrawerVisible(true)
  }

  const handleMarkAsRead = async (contact: Contact) => {
    if (contact.isRead) {
      return
    }

    try {
      const updatedContact = await markAsReadMutation.mutateAsync(contact._id)
      messageApi.success('Đã đánh dấu liên hệ là đã đọc.')

      if (selectedContact?._id === contact._id) {
        setSelectedContact(updatedContact)
      }
    } catch (mutationError) {
      messageApi.error('Không thể cập nhật trạng thái liên hệ.')
      // eslint-disable-next-line no-console
      console.error('Mark as read error:', mutationError)
    }
  }

  const handleDeleteContact = async (contact: Contact) => {
    if (deleteContactMutation.isPending) {
      return
    }

    setDeletingContactId(contact._id)

    try {
      await deleteContactMutation.mutateAsync(contact._id)
      messageApi.success('Xóa liên hệ thành công.')

      if (selectedContact?._id === contact._id) {
        setIsDrawerVisible(false)
        setSelectedContact(null)
      }
    } catch (mutationError) {
      messageApi.error('Không thể xóa liên hệ.')
      // eslint-disable-next-line no-console
      console.error('Delete contact error:', mutationError)
    } finally {
      setDeletingContactId(null)
    }
  }

  const renderTypeTag = (contact: Contact) => {
    if (contact.type === 'project') {
      return (
        <Tag color="blue" icon={<HomeOutlined />}>
          Báo giá Dự án
        </Tag>
      )
    }
    if (contact.type === 'template') {
      return (
        <Tag color="cyan" icon={<AppstoreOutlined />}>
          Báo giá Mẫu
        </Tag>
      )
    }
    if (contact.type === 'material') {
      return (
        <Tag color="orange" icon={<ShopOutlined />}>
          Báo giá Vật tư
        </Tag>
      )
    }
    if (contact.targetTitle) {
      return (
        <Tag color="purple" icon={<FileTextOutlined />}>
          Yêu cầu Báo giá
        </Tag>
      )
    }
    return (
      <Tag color="default" icon={<MailOutlined />}>
        Liên hệ chung
      </Tag>
    )
  }

  const columns: ColumnsType<Contact> = [
    {
      title: 'Khách hàng',
      dataIndex: 'name',
      key: 'name',
      width: 220,
      render: (_: string, record) => (
        <Space align="start" size={12}>
          <Avatar
            style={{
              backgroundColor: record.isRead ? '#e2e8f0' : '#ede9fe',
              color: record.isRead ? '#475569' : '#6d28d9'
            }}
          >
            {record.name?.trim()?.charAt(0)?.toUpperCase() || 'K'}
          </Avatar>
          <Space direction="vertical" size={2}>
            <Space size={6} wrap>
              <Text strong>{record.name}</Text>
              <Tag color={record.isRead ? 'default' : 'purple'}>
                {record.isRead ? 'Đã đọc' : 'Chưa đọc'}
              </Tag>
            </Space>
            <Text type="secondary" style={{ fontSize: 12 }}>{record.email}</Text>
          </Space>
        </Space>
      )
    },
    {
      title: 'Phân loại & Mục yêu cầu',
      key: 'type',
      width: 260,
      render: (_: unknown, record) => (
        <Space direction="vertical" size={4} style={{ maxWidth: 250 }}>
          {renderTypeTag(record)}
          {record.targetTitle ? (
            <div style={{ marginTop: 2 }}>
              <a
                href={getTargetItemUrl(record)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#0369a1', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}
                title="Mở xem chính xác mục này trên website"
              >
                <span>{record.targetTitle}</span>
                <ExportOutlined style={{ fontSize: 11, color: '#0284c7' }} />
              </a>
              {record.targetCode && (
                <Tag style={{ marginLeft: 4, fontSize: 11 }}>{record.targetCode}</Tag>
              )}
              {record.targetCategory && (
                <div style={{ fontSize: 11, color: '#64748b' }}>
                  {record.targetCategory}
                </div>
              )}
            </div>
          ) : (
            record.subject && (
              <Text type="secondary" ellipsis={{ tooltip: record.subject }} style={{ fontSize: 12 }}>
                {record.subject}
              </Text>
            )
          )}
        </Space>
      )
    },
    {
      title: 'Số điện thoại',
      key: 'phone',
      width: 150,
      render: (_: unknown, record) => (
        record.phone ? (
          <a href={`tel:${record.phone}`} style={{ fontWeight: 600 }}>
            <PhoneOutlined /> {record.phone}
          </a>
        ) : (
          <Text type="secondary">--</Text>
        )
      )
    },
    {
      title: 'Lời nhắn / Ghi chú',
      dataIndex: 'message',
      key: 'message',
      render: (message: string) => (
        <Paragraph
          style={{ marginBottom: 0, maxWidth: 360 }}
          ellipsis={{ rows: 2, expandable: false, tooltip: message }}
        >
          {message}
        </Paragraph>
      )
    },
    {
      title: 'Thời gian',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      sorter: (a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
      defaultSortOrder: 'descend',
      render: (createdAt: string) => (
        <Text type="secondary" style={{ fontSize: 12 }}>{formatDateTime(createdAt)}</Text>
      )
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 140,
      render: (_: unknown, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            title="Xem chi tiết"
            onClick={() => handleViewContact(record)}
          />
          <Button
            type="text"
            disabled={record.isRead}
            icon={<CheckCircleOutlined />}
            title="Đánh dấu đã đọc"
            onClick={() => void handleMarkAsRead(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            title="Xóa liên hệ"
            loading={deleteContactMutation.isPending && deletingContactId === record._id}
            onClick={() => void handleDeleteContact(record)}
          />
        </Space>
      )
    }
  ]

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      {error && (
        <Alert
          type="error"
          showIcon
          message="Không thể tải dữ liệu liên hệ"
          description="Vui lòng kiểm tra kết nối API hoặc quyền truy cập admin."
        />
      )}

      {/* Thống kê nhanh */}
      <Row gutter={[12, 12]}>
        <Col xs={12} xl={6}>
          <Card bordered={false} style={{ borderRadius: 18 }} styles={{ body: { padding: isMobile ? 16 : 24 } }}>
            <Statistic
              title="Tổng liên hệ"
              value={summary.totalContacts}
              prefix={<ContactsOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} xl={6}>
          <Card bordered={false} style={{ borderRadius: 18 }} styles={{ body: { padding: isMobile ? 16 : 24 } }}>
            <Statistic
              title="Chưa đọc"
              value={summary.unreadContacts}
              prefix={<ClockCircleOutlined style={{ color: '#d97706' }} />}
              valueStyle={{ color: summary.unreadContacts > 0 ? '#d97706' : undefined }}
            />
          </Card>
        </Col>
        <Col xs={12} xl={6}>
          <Card bordered={false} style={{ borderRadius: 18 }} styles={{ body: { padding: isMobile ? 16 : 24 } }}>
            <Statistic
              title="Yêu cầu Báo giá"
              value={summary.quoteRequests}
              prefix={<FileTextOutlined style={{ color: '#0284c7' }} />}
              valueStyle={{ color: '#0284c7' }}
            />
          </Card>
        </Col>
        <Col xs={12} xl={6}>
          <Card bordered={false} style={{ borderRadius: 18 }} styles={{ body: { padding: isMobile ? 16 : 24 } }}>
            <Statistic
              title="Mới trong tháng"
              value={summary.contactsThisMonth}
              prefix={<MailOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Danh sách & Bộ lọc */}
      <Card
        bordered={false}
        style={{ borderRadius: isMobile ? 18 : 24 }}
        styles={{ body: { padding: isMobile ? 16 : 24 } }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'stretch' : 'center',
            gap: 16,
            flexWrap: 'wrap',
            flexDirection: isMobile ? 'column' : 'row',
            marginBottom: 20
          }}
        >
          <Space direction="vertical" size={4}>
            <Title level={2} style={{ margin: 0, fontSize: isMobile ? 24 : undefined }}>
              Quản lý liên lạc & Báo giá khách hàng
            </Title>
            <Text type="secondary">
              Xem chi tiết nội dung, thông tin mục dự án hoặc mẫu thiết kế mà khách hàng gửi yêu cầu tư vấn báo giá.
            </Text>
          </Space>

          <Search
            allowClear
            placeholder="Tìm theo tên, SĐT, mục báo giá, nội dung..."
            style={{ width: isMobile ? '100%' : 360, maxWidth: '100%' }}
            onChange={(event) => {
              setSearchValue(event.target.value)
              setCurrentPage(1)
            }}
          />
        </div>

        {/* Phân loại Segmented Filter */}
        <div style={{ marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
          <Segmented
            value={typeFilter}
            onChange={(val) => {
              setTypeFilter(val as string)
              setCurrentPage(1)
            }}
            options={[
              { label: `Tất cả (${contacts.length})`, value: 'all' },
              {
                label: `Yêu cầu Báo giá (${summary.quoteRequests})`,
                value: 'quote',
                icon: <FileTextOutlined />
              },
              { label: 'Báo giá Dự án', value: 'project', icon: <HomeOutlined /> },
              { label: 'Báo giá Mẫu thiết kế', value: 'template', icon: <AppstoreOutlined /> },
              { label: 'Liên hệ thường', value: 'general', icon: <MailOutlined /> }
            ]}
          />
        </div>

        {isMobile ? (
          <List<Contact>
            loading={isLoading}
            dataSource={paginatedContacts}
            locale={{
              emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có yêu cầu nào" />
            }}
            renderItem={(contact) => (
              <List.Item style={{ paddingInline: 0 }}>
                <Card
                  bordered
                  style={{ width: '100%', borderRadius: 18 }}
                  styles={{ body: { padding: 14 } }}
                >
                  <Space direction="vertical" size={12} style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Space align="start" size={10}>
                        <Avatar
                          style={{
                            backgroundColor: contact.isRead ? '#e2e8f0' : '#ede9fe',
                            color: contact.isRead ? '#475569' : '#6d28d9'
                          }}
                        >
                          {contact.name?.trim()?.charAt(0)?.toUpperCase() || 'K'}
                        </Avatar>
                        <div>
                          <Text strong>{contact.name}</Text>
                          <div>
                            <Text type="secondary" style={{ fontSize: 11 }}>
                              {formatDateTime(contact.createdAt)}
                            </Text>
                          </div>
                        </div>
                      </Space>
                      <Space size={4}>
                        <Tag color={contact.isRead ? 'default' : 'purple'}>
                          {contact.isRead ? 'Đã đọc' : 'Chưa đọc'}
                        </Tag>
                        {renderTypeTag(contact)}
                      </Space>
                    </div>

                    {contact.targetTitle && (
                      <div
                        style={{
                          backgroundColor: '#f0f9ff',
                          padding: '8px 12px',
                          borderRadius: 10,
                          border: '1px solid #bae6fd'
                        }}
                      >
                        <a
                          href={getTargetItemUrl(contact)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#0369a1', fontWeight: 600, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 4 }}
                          title="Mở xem chính xác mục này trên website"
                        >
                          <span>🎯 {contact.targetTitle}</span>
                          <ExportOutlined style={{ fontSize: 12 }} />
                        </a>
                        {contact.targetCode && (
                          <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
                            Mã: {contact.targetCode} {contact.targetCategory ? `• ${contact.targetCategory}` : ''}
                          </div>
                        )}
                      </div>
                    )}

                    <Space direction="vertical" size={3}>
                      {contact.phone && (
                        <a href={`tel:${contact.phone}`} style={{ fontWeight: 600 }}>
                          <PhoneOutlined /> {contact.phone}
                        </a>
                      )}
                      <a href={`mailto:${contact.email}`}>
                        <MailOutlined /> {contact.email}
                      </a>
                    </Space>

                    <Paragraph ellipsis={{ rows: 3, expandable: false }} style={{ marginBottom: 0 }}>
                      {contact.message}
                    </Paragraph>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6, borderTop: '1px solid #f1f5f9' }}>
                      <Button
                        type="link"
                        size="small"
                        icon={<EyeOutlined />}
                        onClick={() => handleViewContact(contact)}
                        style={{ paddingLeft: 0 }}
                      >
                        Xem chi tiết
                      </Button>
                      <Space size={4}>
                        <Button
                          type="text"
                          disabled={contact.isRead}
                          icon={<CheckCircleOutlined />}
                          onClick={() => void handleMarkAsRead(contact)}
                        />
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          loading={deleteContactMutation.isPending && deletingContactId === contact._id}
                          onClick={() => void handleDeleteContact(contact)}
                        />
                      </Space>
                    </div>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <Table<Contact>
            rowKey={(record) => record._id}
            columns={columns}
            dataSource={paginatedContacts}
            loading={isLoading}
            pagination={false}
            scroll={{ x: 1150 }}
          />
        )}

        {filteredContacts.length > 0 && (
          <Pagination
            style={{ marginTop: 16 }}
            align={isMobile ? 'center' : 'end'}
            current={currentPage}
            pageSize={pageSize}
            total={filteredContacts.length}
            showSizeChanger
            pageSizeOptions={['10', '20', '50']}
            responsive
            showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} yêu cầu`}
            onChange={(page, size) => {
              setCurrentPage(page)
              setPageSize(size)
            }}
            onShowSizeChange={(_, size) => {
              setCurrentPage(1)
              setPageSize(size)
            }}
          />
        )}
      </Card>

      {/* Drawer Chi tiết liên hệ & Yêu cầu báo giá */}
      <Drawer
        title="Chi tiết Yêu cầu & Báo giá"
        placement="right"
        onClose={() => {
          setIsDrawerVisible(false)
          setSelectedContact(null)
        }}
        open={isDrawerVisible}
        width={isMobile ? '100%' : 600}
        styles={{
          body: {
            padding: isMobile ? 16 : 24
          }
        }}
        extra={
          selectedContact ? (
            <Space wrap>
              {selectedContact.phone && (
                <Button
                  size={isMobile ? 'small' : 'middle'}
                  type="primary"
                  icon={<PhoneOutlined />}
                  href={`tel:${selectedContact.phone}`}
                >
                  Gọi ngay
                </Button>
              )}
              <Button
                size={isMobile ? 'small' : 'middle'}
                disabled={selectedContact.isRead}
                icon={<CheckCircleOutlined />}
                onClick={() => void handleMarkAsRead(selectedContact)}
              >
                {!isMobile && 'Đánh dấu đã đọc'}
              </Button>
              <Button
                size={isMobile ? 'small' : 'middle'}
                danger
                icon={<DeleteOutlined />}
                loading={
                  deleteContactMutation.isPending &&
                  deletingContactId === selectedContact._id
                }
                onClick={() => void handleDeleteContact(selectedContact)}
              >
                {!isMobile && 'Xóa'}
              </Button>
            </Space>
          ) : null
        }
      >
        {selectedContact ? (
          <Space direction="vertical" size={20} style={{ width: '100%' }}>
            {/* Nếu có mục báo giá đính kèm, hiển thị card nổi bật */}
            {selectedContact.targetTitle && (
              <Card
                bordered
                style={{
                  borderRadius: 16,
                  borderColor: '#bae6fd',
                  background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
                }}
                styles={{ body: { padding: 18 } }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <Space size={6}>
                    {renderTypeTag(selectedContact)}
                    <Text strong style={{ color: '#0369a1', fontSize: 13 }}>
                      Mục Khách Đặt Báo Giá
                    </Text>
                  </Space>
                  <Button
                    type="link"
                    size="small"
                    icon={<ExportOutlined />}
                    href={getTargetItemUrl(selectedContact)}
                    target="_blank"
                    style={{ paddingRight: 0, color: '#0284c7', fontWeight: 600 }}
                  >
                    Mở trên web
                  </Button>
                </div>

                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  {selectedContact.targetImage && !drawerImgError ? (
                    <div
                      style={{
                        position: 'relative',
                        width: 90,
                        height: 70,
                        borderRadius: 10,
                        overflow: 'hidden',
                        flexShrink: 0,
                        border: '1px solid #bae6fd'
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedContact.targetImage}
                        alt={selectedContact.targetTitle}
                        onError={() => setDrawerImgError(true)}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 10,
                        background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0284c7',
                        fontSize: 24,
                        flexShrink: 0
                      }}
                    >
                      {selectedContact.type === 'project' ? <HomeOutlined /> : <AppstoreOutlined />}
                    </div>
                  )}
                  <div>
                    <Text strong style={{ fontSize: 16, color: '#0f172a', display: 'block' }}>
                      {selectedContact.targetTitle}
                    </Text>
                    <Space size={8} wrap style={{ marginTop: 4 }}>
                      {selectedContact.targetCode && (
                        <Tag color="blue">Mã: {selectedContact.targetCode}</Tag>
                      )}
                      {selectedContact.targetCategory && (
                        <Tag color="cyan">Phân loại: {selectedContact.targetCategory}</Tag>
                      )}
                    </Space>
                  </div>
                </div>
              </Card>
            )}

            {/* Thông tin khách hàng */}
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Khách hàng">
                <Text strong>{selectedContact.name}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {selectedContact.phone ? (
                  <Space>
                    <a href={`tel:${selectedContact.phone}`} style={{ fontWeight: 'bold' }}>
                      <PhoneOutlined /> {selectedContact.phone}
                    </a>
                  </Space>
                ) : (
                  'Không có'
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <a href={`mailto:${selectedContact.email}`}>
                  <MailOutlined /> {selectedContact.email}
                </a>
              </Descriptions.Item>
              <Descriptions.Item label="Loại yêu cầu">
                {renderTypeTag(selectedContact)}
              </Descriptions.Item>
              {selectedContact.subject && (
                <Descriptions.Item label="Tiêu đề">
                  {selectedContact.subject}
                </Descriptions.Item>
              )}
              <Descriptions.Item label="Trạng thái">
                <Tag color={selectedContact.isRead ? 'default' : 'purple'}>
                  {selectedContact.isRead ? 'Đã đọc' : 'Chưa đọc'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Thời gian gửi">
                {formatDateTime(selectedContact.createdAt)}
              </Descriptions.Item>
              <Descriptions.Item label="Cập nhật lần cuối">
                {formatDateTime(selectedContact.updatedAt)}
              </Descriptions.Item>
            </Descriptions>

            {/* Khối Nội dung yêu cầu / Lời nhắn */}
            <Card
              title={
                <Space>
                  <MessageOutlined />
                  <span>Nội dung yêu cầu / Lời nhắn từ khách</span>
                </Space>
              }
              bordered={false}
              style={{
                borderRadius: 20,
                background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)'
              }}
              styles={{ body: { padding: isMobile ? 16 : 24 } }}
            >
              <Paragraph style={{ marginBottom: 0, whiteSpace: 'pre-wrap', lineHeight: 1.7, fontSize: 14 }}>
                {selectedContact.message}
              </Paragraph>
            </Card>
          </Space>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có liên hệ được chọn" />
        )}
      </Drawer>
    </Space>
  )
}
