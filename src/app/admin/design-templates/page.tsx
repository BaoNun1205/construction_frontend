'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  App,
  Button,
  Card,
  Col,
  Divider,
  Empty,
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
  LinkOutlined,
  PictureOutlined,
  PlusOutlined,
  StarFilled,
  StarOutlined,
  UploadOutlined
} from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import type { RcFile } from 'antd/es/upload'
import { apiClient } from '@/lib/axios'
import { DesignTemplateService } from '@/services/designTemplateService'
import { TemplateCategoriesService } from '@/services/templateCategoriesService'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
const { Option } = Select
const { useBreakpoint } = Grid

interface DesignTemplate {
  key: string
  id: string
  realId?: string
  name: string
  category: string
  categoryName?: string
  style: string
  styleName?: string
  area: number
  floors: number
  bedrooms: number
  bathrooms: number
  price: number
  description: string
  mainImage: string
  images: string[]
  featured: boolean
  status: string
}

interface TemplateImageItem {
  uid: string
  url: string
  name?: string
}

const getBase64 = (file: File | RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const defaultCategoryOptions = [
  { value: 'villa', label: 'Biệt thự' },
  { value: 'townhouse', label: 'Nhà phố' },
  { value: 'garden-house', label: 'Nhà vườn' },
  { value: 'apartment', label: 'Căn hộ / Chung cư' },
  { value: 'commercial', label: 'Thương mại / Shophouse' },
  { value: 'nha-cap-4', label: 'Nhà cấp 4' }
]

const styleOptions = [
  { value: 'modern', label: 'Hiện đại' },
  { value: 'neoclassical', label: 'Tân cổ điển' },
  { value: 'japanese', label: 'Phong cách Nhật' },
  { value: 'minimalist', label: 'Tối giản' },
  { value: 'indochine', label: 'Indochine' }
]

const statusOptions = [
  { value: 'active', label: 'Hoạt động' },
  { value: 'draft', label: 'Bản nháp' }
]

export default function DesignTemplatesPage() {
  const screens = useBreakpoint()
  const isMobile = !screens.md
  const { message: messageApi } = App.useApp()
  const [templates, setTemplates] = useState<DesignTemplate[]>([])
  const [loading, setLoading] = useState(false)
  const [categoryOptions, setCategoryOptions] = useState(defaultCategoryOptions)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<DesignTemplate | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [form] = Form.useForm()

  // Quản lý danh sách hình ảnh & ảnh chính trong modal
  const [imageList, setImageList] = useState<TemplateImageItem[]>([])
  const [selectedMainImage, setSelectedMainImage] = useState<string>('')
  const [newImageUrl, setNewImageUrl] = useState<string>('')

  const fetchTemplates = async () => {
    setLoading(true)
    try {
      const data = await DesignTemplateService.getTemplates()
      const mapped: DesignTemplate[] = (data || []).map((t, idx) => {
        const rawImgs = Array.isArray(t.images) && t.images.length > 0 ? (t.images as string[]) : [(t.mainImage as string)].filter(Boolean)
        const mainImg = (t.mainImage as string) || rawImgs[0] || ''
        return {
          key: t.id || String(idx),
          id: t.code || t.id,
          realId: t._id || t.id,
          name: t.title,
          category: typeof t.category === 'object' && t.category ? ((t.category as { code?: string; slug?: string }).code || (t.category as { code?: string; slug?: string }).slug || '') : (t.category as string),
          categoryName: t.categoryName,
          style: t.style,
          styleName: t.styleName,
          area: t.area,
          floors: t.floors,
          bedrooms: t.bedrooms,
          bathrooms: t.bathrooms,
          price: t.constructionCostEstimated || t.designCost,
          description: t.description,
          mainImage: mainImg,
          images: rawImgs.length > 0 ? rawImgs : [mainImg],
          featured: Boolean(t.featured),
          status: t.status || 'active'
        }
      })
      setTemplates(mapped)
    } catch {
      messageApi.error('Lỗi khi tải danh sách mẫu thiết kế từ cơ sở dữ liệu!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTemplates()
    TemplateCategoriesService.getTemplateCategories().then((cats) => {
      if (cats && cats.length > 0) {
        setCategoryOptions(cats.map((c) => ({ value: c.code || c.slug, label: c.name })))
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const paginatedTemplates = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return templates.slice(startIndex, startIndex + pageSize)
  }, [currentPage, pageSize, templates])

  const handleAddTemplate = () => {
    setEditingTemplate(null)
    setImageList([])
    setSelectedMainImage('')
    setNewImageUrl('')
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEditTemplate = (template: DesignTemplate) => {
    setEditingTemplate(template)

    const rawImages = Array.isArray(template.images) && template.images.length > 0
      ? template.images
      : [template.mainImage].filter(Boolean)

    const allImgs = Array.from(new Set([
      template.mainImage,
      ...rawImages
    ].filter(Boolean))) as string[]

    const initialItems: TemplateImageItem[] = allImgs.map((url, idx) => ({
      uid: `img-${idx}-${Date.now()}`,
      url,
      name: `Ảnh ${idx + 1}`
    }))

    const mainImg = template.mainImage || allImgs[0] || ''
    setImageList(initialItems)
    setSelectedMainImage(mainImg)
    setNewImageUrl('')

    form.setFieldsValue({
      ...template,
      mainImage: mainImg
    })
    setIsModalVisible(true)
  }

  const handleSetMainImage = (url: string) => {
    setSelectedMainImage(url)
    form.setFieldValue('mainImage', url)
    messageApi.info('Đã chọn làm ảnh chính!')
  }

  const handleRemoveImage = (url: string) => {
    setImageList((prev) => {
      const next = prev.filter((item) => item.url !== url)
      if (selectedMainImage === url) {
        const nextMain = next[0]?.url || ''
        setSelectedMainImage(nextMain)
        form.setFieldValue('mainImage', nextMain)
      }
      return next
    })
    messageApi.success('Đã xóa ảnh khỏi danh sách')
  }

  const handleUploadFiles = async (file: RcFile) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      messageApi.error('Chỉ được tải lên tệp định dạng hình ảnh!')
      return Upload.LIST_IGNORE
    }

    try {
      let imageUrl = ''
      try {
        const formData = new FormData()
        formData.append('file', file)
        const res: unknown = await apiClient.post('/uploads/image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          requireAuth: true
        })
        const resData = res as { data?: { url?: string } }
        if (resData?.data?.url) {
          imageUrl = resData.data.url
        }
      } catch {
        // Fallback to base64 preview
      }

      if (!imageUrl) {
        imageUrl = await getBase64(file)
      }

      const newItem: TemplateImageItem = {
        uid: `upload-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        url: imageUrl,
        name: file.name
      }

      setImageList((prev) => {
        const updated = [...prev, newItem]
        if (!selectedMainImage) {
          setSelectedMainImage(newItem.url)
          form.setFieldValue('mainImage', newItem.url)
        }
        return updated
      })

      messageApi.success(`Đã thêm ảnh "${file.name}"!`)
    } catch {
      messageApi.error('Không thể xử lý hình ảnh tải lên!')
    }
    return Upload.LIST_IGNORE
  }

  const handleAddImageByUrl = () => {
    const trimmed = newImageUrl.trim()
    if (!trimmed) {
      messageApi.warning('Vui lòng nhập đường dẫn hình ảnh!')
      return
    }

    const newItem: TemplateImageItem = {
      uid: `url-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      url: trimmed,
      name: trimmed.split('/').pop() || 'Ảnh mới'
    }

    setImageList((prev) => {
      const updated = [...prev, newItem]
      if (!selectedMainImage) {
        setSelectedMainImage(trimmed)
        form.setFieldValue('mainImage', trimmed)
      }
      return updated
    })

    setNewImageUrl('')
    messageApi.success('Đã thêm hình ảnh từ liên kết!')
  }

  const handleDeleteTemplate = async (templateId: string, realId?: string) => {
    try {
      await DesignTemplateService.deleteTemplate(realId || templateId)
      messageApi.success('Xóa mẫu thiết kế khỏi cơ sở dữ liệu thành công!')
      fetchTemplates()
    } catch {
      messageApi.error('Có lỗi xảy ra khi xóa mẫu thiết kế!')
    }
  }

  const handleSaveTemplate = async (values: Record<string, unknown>) => {
    try {
      const mainImage = (values.mainImage as string) || selectedMainImage || imageList[0]?.url || ''
      const imageListUrls = imageList.map((img) => img.url).filter(Boolean)
      const images = imageListUrls.length > 0
        ? (imageListUrls.includes(mainImage) ? imageListUrls : [mainImage, ...imageListUrls])
        : [mainImage]

      const payload = {
        code: (values.id as string) || editingTemplate?.id || `TPL-${String(templates.length + 1).padStart(3, '0')}`,
        title: values.name as string,
        category: values.category as string,
        style: values.style as string,
        area: Number(values.area) || 100,
        floors: Number(values.floors) || 1,
        bedrooms: Number(values.bedrooms) || 1,
        bathrooms: Number(values.bathrooms) || 1,
        designCost: Math.round((Number(values.price) || 1000000000) * 0.05),
        constructionCostEstimated: Number(values.price) || 1000000000,
        description: (values.description as string) || 'Mẫu thiết kế cao cấp tối ưu công năng.',
        features: ['Kiến trúc hiện đại', 'Tối ưu ánh sáng và gió tự nhiên', 'Vật liệu cao cấp'],
        mainImage,
        images,
        featured: Boolean(values.featured),
        status: (values.status as string) || 'active'
      }

      if (editingTemplate) {
        await DesignTemplateService.updateTemplate(editingTemplate.realId || editingTemplate.id, payload)
        messageApi.success('Cập nhật mẫu thiết kế vào cơ sở dữ liệu thành công!')
      } else {
        await DesignTemplateService.createTemplate(payload)
        messageApi.success('Thêm mẫu thiết kế mới vào cơ sở dữ liệu thành công!')
      }

      setIsModalVisible(false)
      form.resetFields()
      fetchTemplates()
    } catch (saveError) {
      messageApi.error('Có lỗi xảy ra khi lưu mẫu thiết kế!')
      // eslint-disable-next-line no-console
      console.error('Save design template error:', saveError)
    }
  }

  const columns: ColumnsType<DesignTemplate> = [
    {
      title: 'Mẫu thiết kế',
      key: 'templateInfo',
      render: (_: unknown, record: DesignTemplate) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Image
            src={record.mainImage || record.images?.[0] || ''}
            alt={record.name}
            width={58}
            height={58}
            style={{ objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABCUlEQVR4nO3BAQ0AAADCoPdPbQ43oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+FAYEAAA=="
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
            <Text
              strong
              style={{
                fontSize: 14,
                lineHeight: 1.35,
                color: '#0f172a'
              }}
            >
              {record.name}
            </Text>
            <Space size={6} wrap>
              <Tag color="default" style={{ margin: 0, fontSize: 11, padding: '0 6px', fontWeight: 500 }}>
                {record.id}
              </Tag>
              {record.featured && (
                <Tag color="gold" icon={<StarFilled />} style={{ margin: 0, fontSize: 11, padding: '0 6px' }}>
                  Nổi bật
                </Tag>
              )}
            </Space>
          </div>
        </div>
      )
    },
    {
      title: 'Phân loại',
      key: 'classification',
      width: 140,
      render: (_: unknown, record: DesignTemplate) => {
        const categoryLabel = categoryOptions.find((opt) => opt.value === record.category)?.label || record.categoryName || record.category
        const styleLabel = styleOptions.find((opt) => opt.value === record.style)?.label || record.styleName || record.style
        return (
          <Space direction="vertical" size={4}>
            <Tag color="blue" style={{ margin: 0 }}>
              {categoryLabel}
            </Tag>
            <Tag color="green" style={{ margin: 0 }}>
              {styleLabel}
            </Tag>
          </Space>
        )
      }
    },
    {
      title: 'Quy mô',
      key: 'specs',
      width: 140,
      render: (_: unknown, record: DesignTemplate) => (
        <Space direction="vertical" size={2}>
          <Text strong style={{ fontSize: 13, color: '#334155' }}>
            {record.area} m² • {record.floors} tầng
          </Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.bedrooms} PN • {record.bathrooms} WC
          </Text>
        </Space>
      )
    },
    {
      title: 'Chi phí ước tính',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      render: (price: number) => {
        const billions = price / 1000000000
        const formatted = price >= 1000000000
          ? `${billions % 1 === 0 ? billions : billions.toFixed(1)} tỷ đ`
          : `${price.toLocaleString('vi-VN')} đ`
        return (
          <Space direction="vertical" size={1}>
            <Text strong style={{ color: '#1d4ed8', fontSize: 14 }}>
              {formatted}
            </Text>
            <Text type="secondary" style={{ fontSize: 11 }}>
              {price.toLocaleString('vi-VN')} đ
            </Text>
          </Space>
        )
      }
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
        const statusLabel = statusOptions.find((option) => option.value === status)?.label || 'Hoạt động'
        return <Tag color={colors[status as keyof typeof colors] || 'green'}>{statusLabel}</Tag>
      }
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 110,
      align: 'center',
      render: (_: unknown, record: DesignTemplate) => (
        <Space size={2}>
          <Button
            type="text"
            icon={<EyeOutlined />}
            title="Xem chi tiết"
            onClick={() => handleEditTemplate(record)}
          />
          <Button
            type="text"
            icon={<EditOutlined style={{ color: '#1677ff' }} />}
            title="Chỉnh sửa"
            onClick={() => handleEditTemplate(record)}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa mẫu thiết kế này?"
            onConfirm={() => handleDeleteTemplate(record.realId || record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="text" danger icon={<DeleteOutlined />} title="Xóa" />
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
            loading={loading}
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
                        src={template.mainImage || template.images[0]}
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
                          onConfirm={() => handleDeleteTemplate(template.realId || template.id)}
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
            loading={loading}
            columns={columns}
            dataSource={paginatedTemplates}
            pagination={false}
            scroll={{ x: 800 }}
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

          {/* PHẦN QUẢN LÝ HÌNH ẢNH & CHỌN ẢNH CHÍNH */}
          <Divider orientation="left" style={{ margin: '22px 0 16px 0', borderColor: '#e2e8f0' }}>
            <Space size={8}>
              <PictureOutlined style={{ color: '#1677ff', fontSize: 16 }} />
              <span style={{ fontWeight: 600, fontSize: 15 }}>Quản lý hình ảnh & Chọn ảnh chính</span>
            </Space>
          </Divider>

          {/* Chọn ảnh chính đại diện */}
          <Form.Item
            name="mainImage"
            label={
              <Space size={6}>
                <StarFilled style={{ color: '#faad14' }} />
                <span style={{ fontWeight: 600 }}>Ảnh chính đại diện (Hiển thị đầu tiên và ở danh sách)</span>
              </Space>
            }
            rules={[{ required: true, message: 'Vui lòng chọn ảnh chính cho mẫu thiết kế!' }]}
            style={{ marginBottom: 16 }}
          >
            <Select
              size="large"
              placeholder="Chọn một ảnh trong danh sách làm ảnh chính"
              value={selectedMainImage}
              onChange={(val) => handleSetMainImage(val)}
              disabled={imageList.length === 0}
              style={{ width: '100%' }}
              optionLabelProp="label"
            >
              {imageList.map((img, idx) => {
                const isCurrentMain = img.url === selectedMainImage
                return (
                  <Option
                    key={img.url}
                    value={img.url}
                    label={
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: '100%' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.url}
                          alt=""
                          style={{
                            width: 24,
                            height: 24,
                            minWidth: 24,
                            borderRadius: 4,
                            objectFit: 'cover',
                            border: '1px solid #d9d9d9',
                            display: 'block'
                          }}
                        />
                        <span style={{ fontSize: 14 }}>
                          Ảnh {idx + 1} {isCurrentMain ? '(Đang là ảnh chính ⭐)' : ''}
                        </span>
                      </div>
                    }
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '3px 0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.url}
                          alt=""
                          style={{
                            width: 32,
                            height: 32,
                            minWidth: 32,
                            borderRadius: 4,
                            objectFit: 'cover',
                            border: '1px solid #e2e8f0',
                            display: 'block'
                          }}
                        />
                        <span style={{ fontWeight: isCurrentMain ? 600 : 400 }}>
                          Ảnh {idx + 1}
                        </span>
                      </div>
                      {isCurrentMain && (
                        <Tag color="gold" icon={<StarFilled />} style={{ margin: 0 }}>
                          Ảnh chính
                        </Tag>
                      )}
                    </div>
                  </Option>
                )
              })}
            </Select>
          </Form.Item>

          {/* Thanh công cụ: Tải ảnh từ máy tính & Thêm qua URL */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              flexWrap: 'wrap',
              background: '#f8fafc',
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              marginBottom: 14
            }}
          >
            <div style={{ flex: '1 1 320px' }}>
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  placeholder="Hoặc dán URL hình ảnh (ví dụ: /design-templates/villa.jpg)..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  onPressEnter={handleAddImageByUrl}
                  prefix={<LinkOutlined style={{ color: '#94a3b8' }} />}
                  allowClear
                />
                <Button type="primary" onClick={handleAddImageByUrl} icon={<PlusOutlined />}>
                  Thêm URL
                </Button>
              </Space.Compact>
            </div>

            <Upload
              accept="image/*"
              multiple
              showUploadList={false}
              beforeUpload={handleUploadFiles}
            >
              <Button icon={<UploadOutlined />} style={{ fontWeight: 500 }}>
                Tải ảnh từ máy tính
              </Button>
            </Upload>
          </div>

          {/* Tiêu đề danh sách ảnh */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, padding: '0 2px' }}>
            <Text strong style={{ fontSize: 13, color: '#334155' }}>
              Tất cả hình ảnh đã tải lên ({imageList.length})
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Bấm <b>⭐ Đặt làm ảnh chính</b> trên từng ảnh để chọn làm ảnh đại diện
            </Text>
          </div>

          {/* Danh sách ảnh đã tải lên (Visual Gallery Grid) */}
          {imageList.length === 0 ? (
            <div style={{
              padding: '28px 16px',
              background: '#ffffff',
              border: '1px dashed #cbd5e1',
              borderRadius: 8,
              textAlign: 'center',
              marginBottom: 10
            }}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Chưa có hình ảnh nào cho mẫu thiết kế này. Hãy tải lên từ máy tính hoặc dán link URL ảnh phía trên."
              />
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))',
              gap: 12,
              marginBottom: 16,
              maxHeight: 280,
              overflowY: 'auto',
              padding: '8px 4px'
            }}>
              {imageList.map((img, index) => {
                const isMain = img.url === selectedMainImage
                return (
                  <Card
                    key={img.uid || index}
                    hoverable
                    size="small"
                    style={{
                      position: 'relative',
                      borderRadius: 8,
                      overflow: 'hidden',
                      border: isMain ? '2px solid #faad14' : '1px solid #cbd5e1',
                      boxShadow: isMain ? '0 0 0 2px rgba(250, 173, 20, 0.2)' : '0 1px 2px rgba(0,0,0,0.04)',
                      background: isMain ? '#fffdf0' : '#ffffff'
                    }}
                    styles={{ body: { padding: 6 } }}
                  >
                    {/* Badge Ảnh chính */}
                    {isMain && (
                      <div style={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        zIndex: 2,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}>
                        <Tag color="gold" icon={<StarFilled />} style={{ margin: 0, fontWeight: 600, fontSize: 11, padding: '1px 6px' }}>
                          Ảnh chính
                        </Tag>
                      </div>
                    )}

                    {/* Thumbnail */}
                    <div style={{ position: 'relative', width: '100%', height: 96, borderRadius: 6, overflow: 'hidden', background: '#f1f5f9' }}>
                      <Image
                        src={img.url}
                        alt={`Ảnh ${index + 1}`}
                        width="100%"
                        height="100%"
                        style={{ objectFit: 'cover' }}
                        preview={{
                          mask: (
                            <Space size={4} style={{ fontSize: 12 }}>
                              <EyeOutlined /> Xem
                            </Space>
                          )
                        }}
                      />
                    </div>

                    {/* Action bar dưới thumbnail */}
                    <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {isMain ? (
                        <Text strong style={{ fontSize: 11, color: '#d48806' }}>
                          ⭐ Đại diện
                        </Text>
                      ) : (
                        <Button
                          type="text"
                          size="small"
                          icon={<StarOutlined />}
                          style={{ fontSize: 11, padding: '0 4px', color: '#1677ff', height: 22 }}
                          onClick={() => handleSetMainImage(img.url)}
                        >
                          Đặt ảnh chính
                        </Button>
                      )}

                      <Popconfirm
                        title="Xóa ảnh này?"
                        okText="Xóa"
                        cancelText="Hủy"
                        onConfirm={() => handleRemoveImage(img.url)}
                      >
                        <Button
                          type="text"
                          danger
                          size="small"
                          icon={<DeleteOutlined />}
                          style={{ height: 22, width: 22, minWidth: 22, padding: 0 }}
                        />
                      </Popconfirm>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </Form>
      </Modal>
    </Space>
  )
}
