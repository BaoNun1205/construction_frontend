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
  Upload, 
  message,
  Popconfirm,
  Tag,
  Image,
  Typography,
  Row,
  Col
} from 'antd'
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  UploadOutlined
} from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import type { UploadProps } from 'antd'

const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

interface DesignTemplate {
  key: string
  id: string
  name: string
  category: string
  style: string
  area: number
  floors: number
  bedrooms: number
  bathrooms: number
  price: number
  description: string
  images: string[]
  featured: boolean
  status: string
}

// Mock data
const initialTemplates: DesignTemplate[] = [
  {
    key: '1',
    id: 'TPL001',
    name: 'Nhà phố hiện đại 3 tầng',
    category: 'townhouse',
    style: 'modern',
    area: 120,
    floors: 3,
    bedrooms: 4,
    bathrooms: 3,
    price: 150000000,
    description: 'Thiết kế nhà phố hiện đại với không gian thoáng đãng',
    images: ['/design-consulting/ai.jpg'],
    featured: true,
    status: 'active',
  },
  {
    key: '2',
    id: 'TPL002',
    name: 'Biệt thự cổ điển',
    category: 'villa',
    style: 'classic',
    area: 300,
    floors: 2,
    bedrooms: 5,
    bathrooms: 4,
    price: 500000000,
    description: 'Thiết kế biệt thự phong cách cổ điển sang trọng',
    images: ['/design-consulting/application.jpg'],
    featured: false,
    status: 'active',
  },
]

const categoryOptions = [
  { value: 'townhouse', label: 'Nhà phố' },
  { value: 'villa', label: 'Biệt thự' },
  { value: 'apartment', label: 'Chung cư' },
  { value: 'house', label: 'Nhà cấp 4' },
]

const styleOptions = [
  { value: 'modern', label: 'Hiện đại' },
  { value: 'classic', label: 'Cổ điển' },
  { value: 'minimalist', label: 'Tối giản' },
  { value: 'industrial', label: 'Công nghiệp' },
]

const statusOptions = [
  { value: 'active', label: 'Hoạt động' },
  { value: 'inactive', label: 'Không hoạt động' },
  { value: 'draft', label: 'Bản nháp' },
]

export default function DesignTemplatesPage() {
  const [templates, setTemplates] = useState<DesignTemplate[]>(initialTemplates)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<DesignTemplate | null>(null)
  const [form] = Form.useForm()

  const handleAddTemplate = () => {
    setEditingTemplate(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEditTemplate = (template: DesignTemplate) => {
    setEditingTemplate(template)
    form.setFieldsValue(template)
    setIsModalVisible(true)
  }

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(templates.filter(template => template.id !== templateId))
    message.success('Xóa mẫu thiết kế thành công!')
  }

  const handleSaveTemplate = async (values: any) => {
    try {
      const templateData = {
        ...values,
        images: values.images?.fileList?.map((file: any) => file.url || file.response?.url) || [],
      }

      if (editingTemplate) {
        // Update existing template
        setTemplates(templates.map(template => 
          template.id === editingTemplate.id 
            ? { ...template, ...templateData }
            : template
        ))
        message.success('Cập nhật mẫu thiết kế thành công!')
      } else {
        // Add new template
        const newTemplate: DesignTemplate = {
          key: Date.now().toString(),
          id: `TPL${String(templates.length + 1).padStart(3, '0')}`,
          ...templateData,
        }
        setTemplates([...templates, newTemplate])
        message.success('Thêm mẫu thiết kế thành công!')
      }

      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error('Có lỗi xảy ra!')
    }
  }

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    listType: 'picture',
    beforeUpload: () => false, // Prevent auto upload
  }

  const columns: ColumnsType<DesignTemplate> = [
    {
      title: 'Mã mẫu',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Tên mẫu',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (category: string) => {
        const categoryLabel = categoryOptions.find(opt => opt.value === category)?.label
        return <Tag color="blue">{categoryLabel}</Tag>
      },
    },
    {
      title: 'Phong cách',
      dataIndex: 'style',
      key: 'style',
      width: 120,
      render: (style: string) => {
        const styleLabel = styleOptions.find(opt => opt.value === style)?.label
        return <Tag color="green">{styleLabel}</Tag>
      },
    },
    {
      title: 'Diện tích (m²)',
      dataIndex: 'area',
      key: 'area',
      width: 120,
    },
    {
      title: 'Số tầng',
      dataIndex: 'floors',
      key: 'floors',
      width: 80,
    },
    {
      title: 'PN/WC',
      key: 'rooms',
      width: 100,
      render: (_, record) => `${record.bedrooms}/${record.bathrooms}`,
    },
    {
      title: 'Giá (VNĐ)',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      render: (price: number) => `${price.toLocaleString('vi-VN')}`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => {
        const colors = {
          active: 'green',
          inactive: 'red',
          draft: 'orange',
        }
        const statusLabel = statusOptions.find(opt => opt.value === status)?.label
        return <Tag color={colors[status as keyof typeof colors]}>{statusLabel}</Tag>
      },
    },
    {
      title: 'Nổi bật',
      dataIndex: 'featured',
      key: 'featured',
      width: 80,
      render: (featured: boolean) => (
        <Tag color={featured ? 'gold' : 'default'}>
          {featured ? 'Có' : 'Không'}
        </Tag>
      ),
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'images',
      key: 'images',
      width: 100,
      render: (images: string[]) => {
        if (images && images.length > 0) {
          return <Image width={50} height={50} src={images[0]} style={{ objectFit: 'cover' }} />
        }
        return <div style={{ width: 50, height: 50, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>N/A</div>
      },
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
            onClick={() => {/* Handle view */}}
          />
          <Button
            type="default"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditTemplate(record)}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa mẫu thiết kế này?"
            onConfirm={() => handleDeleteTemplate(record.id)}
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
        <Title level={2}>Quản lý mẫu thiết kế</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddTemplate}
        >
          Thêm mẫu thiết kế
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={templates}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1400 }}
        />
      </Card>

      <Modal
        title={editingTemplate ? 'Chỉnh sửa mẫu thiết kế' : 'Thêm mẫu thiết kế mới'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false)
          form.resetFields()
        }}
        onOk={() => form.submit()}
        width={900}
        okText={editingTemplate ? 'Cập nhật' : 'Thêm'}
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveTemplate}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên mẫu thiết kế"
                rules={[{ required: true, message: 'Vui lòng nhập tên mẫu thiết kế!' }]}
              >
                <Input placeholder="Nhập tên mẫu thiết kế" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Danh mục"
                rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
              >
                <Select placeholder="Chọn danh mục">
                  {categoryOptions.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="style"
                label="Phong cách"
                rules={[{ required: true, message: 'Vui lòng chọn phong cách!' }]}
              >
                <Select placeholder="Chọn phong cách">
                  {styleOptions.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
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
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="area"
                label="Diện tích (m²)"
                rules={[{ required: true, message: 'Vui lòng nhập diện tích!' }]}
              >
                <Input type="number" placeholder="Diện tích" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="floors"
                label="Số tầng"
                rules={[{ required: true, message: 'Vui lòng nhập số tầng!' }]}
              >
                <Input type="number" placeholder="Số tầng" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="price"
                label="Giá (VNĐ)"
                rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
              >
                <Input type="number" placeholder="Giá thiết kế" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="bedrooms"
                label="Số phòng ngủ"
                rules={[{ required: true, message: 'Vui lòng nhập số phòng ngủ!' }]}
              >
                <Input type="number" placeholder="Số phòng ngủ" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="bathrooms"
                label="Số phòng tắm"
                rules={[{ required: true, message: 'Vui lòng nhập số phòng tắm!' }]}
              >
                <Input type="number" placeholder="Số phòng tắm" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="featured"
            label="Mẫu nổi bật"
            valuePropName="checked"
          >
            <Select placeholder="Chọn mẫu nổi bật">
              <Option value={true}>Có</Option>
              <Option value={false}>Không</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
          >
            <TextArea rows={4} placeholder="Nhập mô tả mẫu thiết kế" />
          </Form.Item>

          <Form.Item
            name="images"
            label="Hình ảnh"
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}