'use client'

import { useState } from 'react'
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Modal, 
  Form, 
  Input, 
  Select, 
  message,
  Popconfirm,
  Tag,
  Typography,
  DatePicker,
  Drawer,
  Descriptions,
  Timeline
} from 'antd'
import { 
  EyeOutlined,
  EditOutlined, 
  DeleteOutlined,
  PhoneOutlined,
  MailOutlined,
  MessageOutlined,
  ClockCircleOutlined
} from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'

const { Title, Paragraph } = Typography
const { TextArea } = Input
const { Option } = Select

interface Contact {
  key: string
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: string
  priority: string
  source: string
  assignedTo: string
  createdAt: string
  updatedAt: string
  notes: string[]
}

// Mock data
const initialContacts: Contact[] = [
  {
    key: '1',
    id: 'CT001',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0901234567',
    subject: 'Tư vấn thiết kế nhà phố',
    message: 'Tôi muốn tư vấn thiết kế nhà phố 3 tầng tại Quận 7',
    status: 'new',
    priority: 'high',
    source: 'website',
    assignedTo: 'Admin',
    createdAt: '2024-10-08',
    updatedAt: '2024-10-08',
    notes: [],
  },
  {
    key: '2',
    id: 'CT002',
    name: 'Trần Thị B',
    email: 'tranthib@email.com',
    phone: '0907654321',
    subject: 'Báo giá thi công biệt thự',
    message: 'Cần báo giá thi công biệt thự 2 tầng tại Thủ Đức',
    status: 'in_progress',
    priority: 'medium',
    source: 'phone',
    assignedTo: 'Admin',
    createdAt: '2024-10-07',
    updatedAt: '2024-10-09',
    notes: ['Đã gọi điện tư vấn', 'Khách hàng quan tâm đến thiết kế hiện đại'],
  },
]

const statusOptions = [
  { value: 'new', label: 'Mới', color: 'blue' },
  { value: 'in_progress', label: 'Đang xử lý', color: 'orange' },
  { value: 'completed', label: 'Hoàn thành', color: 'green' },
  { value: 'cancelled', label: 'Đã hủy', color: 'red' },
]

const priorityOptions = [
  { value: 'low', label: 'Thấp', color: 'default' },
  { value: 'medium', label: 'Trung bình', color: 'orange' },
  { value: 'high', label: 'Cao', color: 'red' },
]

const sourceOptions = [
  { value: 'website', label: 'Website' },
  { value: 'phone', label: 'Điện thoại' },
  { value: 'email', label: 'Email' },
  { value: 'referral', label: 'Giới thiệu' },
]

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [form] = Form.useForm()
  const [noteForm] = Form.useForm()

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact)
    setIsDrawerVisible(true)
  }

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact)
    form.setFieldsValue(contact)
    setIsModalVisible(true)
  }

  const handleDeleteContact = (contactId: string) => {
    setContacts(contacts.filter(contact => contact.id !== contactId))
    message.success('Xóa liên lạc thành công!')
  }

  const handleSaveContact = async (values: any) => {
    try {
      if (editingContact) {
        // Update existing contact
        setContacts(contacts.map(contact => 
          contact.id === editingContact.id 
            ? { ...contact, ...values, updatedAt: new Date().toISOString().split('T')[0] }
            : contact
        ))
        message.success('Cập nhật liên lạc thành công!')
      }

      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error('Có lỗi xảy ra!')
    }
  }

  const handleAddNote = async (values: any) => {
    if (selectedContact) {
      const updatedContacts = contacts.map(contact => 
        contact.id === selectedContact.id 
          ? { 
              ...contact, 
              notes: [...contact.notes, `${new Date().toLocaleString()}: ${values.note}`],
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : contact
      )
      setContacts(updatedContacts)
      setSelectedContact({
        ...selectedContact,
        notes: [...selectedContact.notes, `${new Date().toLocaleString()}: ${values.note}`]
      })
      noteForm.resetFields()
      message.success('Thêm ghi chú thành công!')
    }
  }

  const columns: ColumnsType<Contact> = [
    {
      title: 'Mã liên lạc',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      render: (email: string) => (
        <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
          <MailOutlined /> {email}
        </a>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: 130,
      render: (phone: string) => (
        <a href={`tel:${phone}`}>
          <PhoneOutlined /> {phone}
        </a>
      ),
    },
    {
      title: 'Chủ đề',
      dataIndex: 'subject',
      key: 'subject',
      width: 200,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => {
        const statusOption = statusOptions.find(opt => opt.value === status)
        return <Tag color={statusOption?.color}>{statusOption?.label}</Tag>
      },
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      width: 120,
      render: (priority: string) => {
        const priorityOption = priorityOptions.find(opt => opt.value === priority)
        return <Tag color={priorityOption?.color}>{priorityOption?.label}</Tag>
      },
    },
    {
      title: 'Nguồn',
      dataIndex: 'source',
      key: 'source',
      width: 100,
      render: (source: string) => {
        const sourceOption = sourceOptions.find(opt => opt.value === source)
        return <Tag>{sourceOption?.label}</Tag>
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewContact(record)}
          />
          <Button
            type="default"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditContact(record)}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa liên lạc này?"
            onConfirm={() => handleDeleteContact(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button
              type="primary"
              danger
              size="small"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2}>Quản lý liên lạc khách hàng</Title>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={contacts}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1300 }}
        />
      </Card>

      {/* Edit Contact Modal */}
      <Modal
        title="Chỉnh sửa liên lạc"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false)
          form.resetFields()
        }}
        onOk={() => form.submit()}
        width={600}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveContact}
        >
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select placeholder="Chọn trạng thái">
              {statusOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="Độ ưu tiên"
            rules={[{ required: true, message: 'Vui lòng chọn độ ưu tiên!' }]}
          >
            <Select placeholder="Chọn độ ưu tiên">
              {priorityOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="assignedTo"
            label="Phân công cho"
          >
            <Input placeholder="Tên người xử lý" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Contact Detail Drawer */}
      <Drawer
        title="Chi tiết liên lạc"
        placement="right"
        onClose={() => setIsDrawerVisible(false)}
        open={isDrawerVisible}
        width={600}
      >
        {selectedContact && (
          <div>
            <Descriptions title="Thông tin khách hàng" bordered column={1}>
              <Descriptions.Item label="Mã liên lạc">{selectedContact.id}</Descriptions.Item>
              <Descriptions.Item label="Tên khách hàng">{selectedContact.name}</Descriptions.Item>
              <Descriptions.Item label="Email">
                <a href={`mailto:${selectedContact.email}`}>
                  <MailOutlined /> {selectedContact.email}
                </a>
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                <a href={`tel:${selectedContact.phone}`}>
                  <PhoneOutlined /> {selectedContact.phone}
                </a>
              </Descriptions.Item>
              <Descriptions.Item label="Chủ đề">{selectedContact.subject}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {(() => {
                  const statusOption = statusOptions.find(opt => opt.value === selectedContact.status)
                  return <Tag color={statusOption?.color}>{statusOption?.label}</Tag>
                })()}
              </Descriptions.Item>
              <Descriptions.Item label="Độ ưu tiên">
                {(() => {
                  const priorityOption = priorityOptions.find(opt => opt.value === selectedContact.priority)
                  return <Tag color={priorityOption?.color}>{priorityOption?.label}</Tag>
                })()}
              </Descriptions.Item>
              <Descriptions.Item label="Nguồn">
                {(() => {
                  const sourceOption = sourceOptions.find(opt => opt.value === selectedContact.source)
                  return <Tag>{sourceOption?.label}</Tag>
                })()}
              </Descriptions.Item>
              <Descriptions.Item label="Phân công cho">{selectedContact.assignedTo}</Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">{selectedContact.createdAt}</Descriptions.Item>
              <Descriptions.Item label="Cập nhật lần cuối">{selectedContact.updatedAt}</Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 24 }}>
              <Title level={4}>Nội dung tin nhắn</Title>
              <Card>
                <Paragraph>{selectedContact.message}</Paragraph>
              </Card>
            </div>

            <div style={{ marginTop: 24 }}>
              <Title level={4}>Ghi chú</Title>
              {selectedContact.notes.length > 0 ? (
                <Timeline>
                  {selectedContact.notes.map((note, index) => (
                    <Timeline.Item key={index} dot={<ClockCircleOutlined />}>
                      {note}
                    </Timeline.Item>
                  ))}
                </Timeline>
              ) : (
                <p>Chưa có ghi chú nào</p>
              )}
              
              <Card style={{ marginTop: 16 }} title="Thêm ghi chú">
                <Form form={noteForm} onFinish={handleAddNote}>
                  <Form.Item
                    name="note"
                    rules={[{ required: true, message: 'Vui lòng nhập ghi chú!' }]}
                  >
                    <TextArea rows={3} placeholder="Nhập ghi chú..." />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" icon={<MessageOutlined />}>
                      Thêm ghi chú
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}