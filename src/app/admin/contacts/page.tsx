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
  PhoneOutlined
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
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

export default function ContactsPage() {
  const screens = useBreakpoint()
  const isMobile = !screens.md
  const { message: messageApi } = App.useApp()
  const { data: contacts = [], isLoading, error } = useContacts()
  const markAsReadMutation = useMarkContactAsRead()
  const deleteContactMutation = useDeleteContact()

  const [searchValue, setSearchValue] = useState('')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const [deletingContactId, setDeletingContactId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const summary = useMemo(() => {
    const now = dayjs()
    const totalContacts = contacts.length
    const unreadContacts = contacts.filter((contact) => !contact.isRead).length
    const contactsWithPhone = contacts.filter((contact) => Boolean(contact.phone)).length
    const contactsThisMonth = contacts.filter((contact) =>
      dayjs(contact.createdAt).isSame(now, 'month')
    ).length

    return {
      totalContacts,
      unreadContacts,
      contactsWithPhone,
      contactsThisMonth
    }
  }, [contacts])

  const filteredContacts = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase()

    if (!keyword) {
      return contacts
    }

    return contacts.filter((contact) => {
      const searchableText = [
        contact.name,
        contact.email,
        contact.phone || '',
        contact.message
      ]
        .join(' ')
        .toLowerCase()

      return searchableText.includes(keyword)
    })
  }, [contacts, searchValue])

  const paginatedContacts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredContacts.slice(startIndex, startIndex + pageSize)
  }, [currentPage, filteredContacts, pageSize])

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact)
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

  const columns: ColumnsType<Contact> = [
    {
      title: 'Khách hàng',
      dataIndex: 'name',
      key: 'name',
      width: 240,
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
            <Space size={8} wrap>
              <Text strong>{record.name}</Text>
              <Tag color={record.isRead ? 'default' : 'purple'}>
                {record.isRead ? 'Đã đọc' : 'Chưa đọc'}
              </Tag>
            </Space>
            <Text type="secondary">{record.email}</Text>
          </Space>
        </Space>
      )
    },
    {
      title: 'Liên hệ',
      key: 'contact',
      width: 220,
      render: (_: unknown, record) => (
        <Space direction="vertical" size={4}>
          <a href={`mailto:${record.email}`}>
            <MailOutlined /> {record.email}
          </a>
          {record.phone ? (
            <a href={`tel:${record.phone}`}>
              <PhoneOutlined /> {record.phone}
            </a>
          ) : (
            <Text type="secondary">Không có số điện thoại</Text>
          )}
        </Space>
      )
    },
    {
      title: 'Nội dung',
      dataIndex: 'message',
      key: 'message',
      render: (message: string) => (
        <Paragraph
          style={{ marginBottom: 0, maxWidth: 420 }}
          ellipsis={{ rows: 2, expandable: false, tooltip: message }}
        >
          {message}
        </Paragraph>
      )
    },
    {
      title: 'Thời gian gửi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 170,
      sorter: (a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
      defaultSortOrder: 'descend',
      render: (createdAt: string) => (
        <Text type="secondary">{formatDateTime(createdAt)}</Text>
      )
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 170,
      render: (_: unknown, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewContact(record)}
          />
          <Button
            type="text"
            disabled={record.isRead}
            icon={<CheckCircleOutlined />}
            onClick={() => void handleMarkAsRead(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
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
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} xl={6}>
          <Card bordered={false} style={{ borderRadius: 18 }} styles={{ body: { padding: isMobile ? 16 : 24 } }}>
            <Statistic
              title="Có số điện thoại"
              value={summary.contactsWithPhone}
              prefix={<PhoneOutlined />}
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
              Quản lý liên lạc khách hàng
            </Title>
            <Text type="secondary">
              Hãy xem qua và quản lý các liên hệ từ khách hàng. Đừng để sót bất kỳ yêu cầu nào.
            </Text>
          </Space>

          <Search
            allowClear
            placeholder="Tìm theo tên, email, số điện thoại, nội dung"
            style={{ width: isMobile ? '100%' : 360, maxWidth: '100%' }}
            onChange={(event) => {
              setSearchValue(event.target.value)
              setCurrentPage(1)
            }}
          />
        </div>

        {isMobile ? (
          <List<Contact>
            loading={isLoading}
            dataSource={paginatedContacts}
            locale={{
              emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có liên hệ nào" />
            }}
            renderItem={(contact) => (
              <List.Item style={{ paddingInline: 0 }}>
                <Card
                  bordered
                  style={{ width: '100%', borderRadius: 18 }}
                  styles={{ body: { padding: 14 } }}
                >
                  <Space direction="vertical" size={12} style={{ width: '100%' }}>
                    <Space align="start" size={12}>
                      <Avatar
                        style={{
                          backgroundColor: contact.isRead ? '#e2e8f0' : '#ede9fe',
                          color: contact.isRead ? '#475569' : '#6d28d9'
                        }}
                      >
                        {contact.name?.trim()?.charAt(0)?.toUpperCase() || 'K'}
                      </Avatar>
                      <Space direction="vertical" size={2} style={{ minWidth: 0 }}>
                        <Space size={8} wrap>
                          <Text strong>{contact.name}</Text>
                          <Tag color={contact.isRead ? 'default' : 'purple'}>
                            {contact.isRead ? 'Đã đọc' : 'Chưa đọc'}
                          </Tag>
                        </Space>
                        <Text type="secondary">{formatDateTime(contact.createdAt)}</Text>
                      </Space>
                    </Space>

                    <Space direction="vertical" size={4}>
                      <a href={`mailto:${contact.email}`}>
                        <MailOutlined /> {contact.email}
                      </a>
                      {contact.phone ? (
                        <a href={`tel:${contact.phone}`}>
                          <PhoneOutlined /> {contact.phone}
                        </a>
                      ) : (
                        <Text type="secondary">Không có số điện thoại</Text>
                      )}
                    </Space>

                    <Paragraph ellipsis={{ rows: 3, expandable: false }} style={{ marginBottom: 0 }}>
                      {contact.message}
                    </Paragraph>

                    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                      <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => handleViewContact(contact)}
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
                    </Space>
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
            scroll={{ x: 1100 }}
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
            showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} liên hệ`}
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

      <Drawer
        title="Chi tiết liên hệ"
        placement="right"
        onClose={() => {
          setIsDrawerVisible(false)
          setSelectedContact(null)
        }}
        open={isDrawerVisible}
        width={isMobile ? '100%' : 560}
        styles={{
          body: {
            padding: isMobile ? 16 : 24
          }
        }}
        extra={
          selectedContact ? (
            <Space wrap>
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
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Khách hàng">
                {selectedContact.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <a href={`mailto:${selectedContact.email}`}>
                  <MailOutlined /> {selectedContact.email}
                </a>
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {selectedContact.phone ? (
                  <a href={`tel:${selectedContact.phone}`}>
                    <PhoneOutlined /> {selectedContact.phone}
                  </a>
                ) : (
                  'Không có'
                )}
              </Descriptions.Item>
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

            <Card
              title={
                <Space>
                  <MessageOutlined />
                  <span>Nội dung liên hệ</span>
                </Space>
              }
              bordered={false}
              style={{
                borderRadius: 20,
                background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)'
              }}
              styles={{ body: { padding: isMobile ? 16 : 24 } }}
            >
              <Paragraph style={{ marginBottom: 0, whiteSpace: 'pre-wrap' }}>
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
