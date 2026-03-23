'use client'

import { useMemo, useState } from 'react'
import {
  App,
  Button,
  Card,
  Col,
  Form,
  Grid,
  Image,
  Input,
  List,
  Modal,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
  Upload
} from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  UploadOutlined
} from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import type { UploadProps } from 'antd'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
const { Option } = Select
const { useBreakpoint } = Grid

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
    status: 'active'
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
    status: 'active'
  }
]

const categoryOptions = [
  { value: 'townhouse', label: 'Nhà phố' },
  { value: 'villa', label: 'Biệt thự' },
  { value: 'apartment', label: 'Chung cư' },
  { value: 'house', label: 'Nhà cấp 4' }
]

const styleOptions = [
  { value: 'modern', label: 'Hiện đại' },
  { value: 'classic', label: 'Cổ điển' },
  { value: 'minimalist', label: 'Tối giản' },
  { value: 'industrial', label: 'Công nghiệp' }
]

const statusOptions = [
  { value: 'active', label: 'Hoạt động' },
  { value: 'inactive', label: 'Không hoạt động' },
  { value: 'draft', label: 'Bản nháp' }
]

export default function DesignTemplatesPage() {
  const screens = useBreakpoint()
  const isMobile = !screens.md
  const { message: messageApi } = App.useApp()
  const [templates, setTemplates] = useState<DesignTemplate[]>(initialTemplates)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<DesignTemplate | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [form] = Form.useForm()

  const paginatedTemplates = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return templates.slice(startIndex, startIndex + pageSize)
  }, [currentPage, pageSize, templates])

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
    setTemplates((prev) => prev.filter((template) => template.id !== templateId))
    messageApi.success('Xóa mẫu thiết kế thành công!')
  }

  const handleSaveTemplate = async (values: Record<string, unknown>) => {
    try {
      const templateData = {
        ...values,
        images: Array.isArray((values.images as { fileList?: Array<{ url?: string; response?: { url?: string } }> })?.fileList)
          ? (values.images as { fileList: Array<{ url?: string; response?: { url?: string } }> }).fileList.map(
            (file) => file.url || file.response?.url || ''
          ).filter(Boolean)
          : editingTemplate?.images || []
      } as Omit<DesignTemplate, 'key' | 'id'>

      if (editingTemplate) {
        setTemplates((prev) =>
          prev.map((template) =>
            template.id === editingTemplate.id
              ? { ...template, ...templateData }
              : template
          )
        )
        messageApi.success('Cập nhật mẫu thiết kế thành công!')
      } else {
        const newTemplate: DesignTemplate = {
          key: Date.now().toString(),
          id: `TPL${String(templates.length + 1).padStart(3, '0')}`,
          ...templateData
        }
        setTemplates((prev) => [...prev, newTemplate])
        messageApi.success('Thêm mẫu thiết kế thành công!')
      }

      setIsModalVisible(false)
      form.resetFields()
    } catch (saveError) {
      messageApi.error('Có lỗi xảy ra khi lưu mẫu thiết kế!')
      // eslint-disable-next-line no-console
      console.error('Save design template error:', saveError)
    }
  }

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    listType: 'picture',
    beforeUpload: () => false
  }

  const columns: ColumnsType<DesignTemplate> = [
    {
      title: 'Mã mẫu',
      dataIndex: 'id',
      key: 'id',
      width: 100
    },
    {
      title: 'Tên mẫu',
      dataIndex: 'name',
      key: 'name',
      width: 200
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (category: string) => {
        const categoryLabel = categoryOptions.find((option) => option.value === category)?.label
        return <Tag color="blue">{categoryLabel}</Tag>
      }
    },
    {
      title: 'Phong cách',
      dataIndex: 'style',
      key: 'style',
      width: 120,
      render: (style: string) => {
        const styleLabel = styleOptions.find((option) => option.value === style)?.label
        return <Tag color="green">{styleLabel}</Tag>
      }
    },
    {
      title: 'Diện tích (m²)',
      dataIndex: 'area',
      key: 'area',
      width: 120
    },
    {
      title: 'Số tầng',
      dataIndex: 'floors',
      key: 'floors',
      width: 80
    },
    {
      title: 'PN/WC',
      key: 'rooms',
      width: 100,
      render: (_: unknown, record) => `${record.bedrooms}/${record.bathrooms}`
    },
    {
      title: 'Giá (VNĐ)',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      render: (price: number) => `${price.toLocaleString('vi-VN')}`
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
          draft: 'orange'
        }
        const statusLabel = statusOptions.find((option) => option.value === status)?.label
        return <Tag color={colors[status as keyof typeof colors]}>{statusLabel}</Tag>
      }
    },
    {
      title: 'Nổi bật',
      dataIndex: 'featured',
      key: 'featured',
      width: 90,
      render: (featured: boolean) => (
        <Tag color={featured ? 'gold' : 'default'}>
          {featured ? 'Có' : 'Không'}
        </Tag>
      )
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 150,
      render: (_: unknown, record) => (
        <Space size="small">
          <Button type="text" icon={<EyeOutlined />} />
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEditTemplate(record)} />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa mẫu thiết kế này?"
            onConfirm={() => handleDeleteTemplate(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
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
            flexDirection: isMobile ? 'column' : 'row',
            gap: 16,
            marginBottom: 16
          }}
        >
          <Space direction="vertical" size={4}>
            <Title level={2} style={{ margin: 0, fontSize: isMobile ? 24 : undefined }}>
              Quản lý mẫu thiết kế
            </Title>
            <Text type="secondary">
              Theo dõi danh sách mẫu thiết kế, trạng thái và thông tin cơ bản trên cả desktop lẫn điện thoại.
            </Text>
          </Space>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddTemplate}
            block={isMobile}
          >
            Thêm mẫu thiết kế
          </Button>
        </div>

        {isMobile ? (
          <List<DesignTemplate>
            dataSource={paginatedTemplates}
            locale={{ emptyText: 'Chưa có mẫu thiết kế nào' }}
            renderItem={(template) => (
              <List.Item style={{ paddingInline: 0 }}>
                <Card bordered style={{ width: '100%', borderRadius: 18 }} styles={{ body: { padding: 14 } }}>
                  <Space direction="vertical" size={12} style={{ width: '100%' }}>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '92px minmax(0, 1fr)',
                        gap: 12
                      }}
                    >
                      <Image
                        src={template.images[0]}
                        alt={template.name}
                        width={92}
                        height={92}
                        preview={false}
                        style={{ borderRadius: 14, objectFit: 'cover' }}
                      />
                      <Space direction="vertical" size={6}>
                        <Text strong>{template.name}</Text>
                        <Space size={[8, 8]} wrap>
                          <Tag color="blue">
                            {categoryOptions.find((option) => option.value === template.category)?.label}
                          </Tag>
                          <Tag color="green">
                            {styleOptions.find((option) => option.value === template.style)?.label}
                          </Tag>
                          <Tag color={template.featured ? 'gold' : 'default'}>
                            {template.featured ? 'Nổi bật' : 'Thường'}
                          </Tag>
                        </Space>
                        <Text type="secondary">
                          {template.area} m² • {template.floors} tầng • {template.bedrooms}/{template.bathrooms} PN/WC
                        </Text>
                        <Text strong>{template.price.toLocaleString('vi-VN')} VNĐ</Text>
                      </Space>
                    </div>

                    <Paragraph ellipsis={{ rows: 2, expandable: false }} style={{ marginBottom: 0 }}>
                      {template.description}
                    </Paragraph>

                    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                      <Tag color={template.status === 'active' ? 'green' : template.status === 'inactive' ? 'red' : 'orange'}>
                        {statusOptions.find((option) => option.value === template.status)?.label}
                      </Tag>
                      <Space size={4}>
                        <Button type="text" icon={<EyeOutlined />} />
                        <Button type="text" icon={<EditOutlined />} onClick={() => handleEditTemplate(template)} />
                        <Popconfirm
                          title="Bạn có chắc chắn muốn xóa mẫu thiết kế này?"
                          onConfirm={() => handleDeleteTemplate(template.id)}
                          okText="Có"
                          cancelText="Không"
                        >
                          <Button type="text" danger icon={<DeleteOutlined />} />
                        </Popconfirm>
                      </Space>
                    </Space>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <Table
            columns={columns}
            dataSource={paginatedTemplates}
            pagination={false}
            scroll={{ x: 1400 }}
          />
        )}

        {templates.length > 0 && (
          <Pagination
            style={{ marginTop: 16 }}
            align={isMobile ? 'center' : 'end'}
            current={currentPage}
            pageSize={pageSize}
            total={templates.length}
            showSizeChanger
            pageSizeOptions={['10', '20', '50']}
            responsive
            showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} mẫu thiết kế`}
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

      <Modal
        title={editingTemplate ? 'Chỉnh sửa mẫu thiết kế' : 'Thêm mẫu thiết kế mới'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false)
          form.resetFields()
        }}
        onOk={() => form.submit()}
        width={isMobile ? 'calc(100vw - 16px)' : 900}
        okText={editingTemplate ? 'Cập nhật' : 'Thêm'}
        cancelText="Hủy"
        centered
        styles={{
          body: {
            maxHeight: isMobile ? 'calc(100vh - 180px)' : undefined,
            overflowY: isMobile ? 'auto' : undefined
          }
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveTemplate}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="name"
                label="Tên mẫu thiết kế"
                rules={[{ required: true, message: 'Vui lòng nhập tên mẫu thiết kế!' }]}
              >
                <Input placeholder="Nhập tên mẫu thiết kế" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="category"
                label="Danh mục"
                rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
              >
                <Select placeholder="Chọn danh mục">
                  {categoryOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="style"
                label="Phong cách"
                rules={[{ required: true, message: 'Vui lòng chọn phong cách!' }]}
              >
                <Select placeholder="Chọn phong cách">
                  {styleOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
              >
                <Select placeholder="Chọn trạng thái">
                  {statusOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                name="area"
                label="Diện tích (m²)"
                rules={[{ required: true, message: 'Vui lòng nhập diện tích!' }]}
              >
                <Input type="number" placeholder="Diện tích" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="floors"
                label="Số tầng"
                rules={[{ required: true, message: 'Vui lòng nhập số tầng!' }]}
              >
                <Input type="number" placeholder="Số tầng" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
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
            <Col xs={24} md={12}>
              <Form.Item
                name="bedrooms"
                label="Số phòng ngủ"
                rules={[{ required: true, message: 'Vui lòng nhập số phòng ngủ!' }]}
              >
                <Input type="number" placeholder="Số phòng ngủ" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
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
            <Switch />
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
    </Space>
  )
}
