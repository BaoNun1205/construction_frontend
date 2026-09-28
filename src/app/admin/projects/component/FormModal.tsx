'use client'

import React, { useEffect, useState } from 'react'
import {
  App,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Empty,
  Form,
  FormInstance,
  Grid,
  Image,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Switch,
  Tag,
  Typography,
  Upload
} from 'antd'
import {
  DeleteOutlined,
  EyeOutlined,
  LinkOutlined,
  PictureOutlined,
  PlusOutlined,
  StarFilled,
  StarOutlined,
  UploadOutlined
} from '@ant-design/icons'
import type { RcFile } from 'antd/es/upload'
import dayjs from 'dayjs'
import { apiClient } from '@/lib/axios'
import {
  useCreateProject,
  useUpdateProject,
  projectKeys
} from '@/hooks/useProjects'
import { useQueryClient } from '@tanstack/react-query'
import { CreateProjectDto, Project, UpdateProjectDto } from '@/types/project'
import {
  useProjectCategories,
  useCreateProjectCategory,
  projectCategoryKeys
} from '@/hooks/useProjectCategories'
import { generateSlug } from '@/utils/slug'

const { TextArea } = Input
const { Option } = Select
const { Text } = Typography
const { useBreakpoint } = Grid

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormInstance<any>
  isModalVisible: boolean
  // eslint-disable-next-line no-unused-vars
  setIsModalVisible: (visible: boolean) => void
  editingProject: Project | null
}

interface ProjectImageItem {
  uid: string
  url: string
  name?: string
}

const getBase64 = (file: Blob | File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = (error) => reject(error)
  })

const FormModal = ({
  form,
  isModalVisible,
  setIsModalVisible,
  editingProject
}: Props) => {
  const screens = useBreakpoint()
  const isMobile = !screens.md
  const { message: messageApi } = App.useApp()
  const queryClient = useQueryClient()
  const createProjectMutation = useCreateProject()
  const updateProjectMutation = useUpdateProject()
  const { data: categories, isLoading: categoriesLoading } = useProjectCategories()

  const createCategoryMutation = useCreateProjectCategory()
  const [isQuickCategoryModalVisible, setIsQuickCategoryModalVisible] = useState(false)
  const [quickCategoryForm] = Form.useForm()
  const [quickCategorySubmitting, setQuickCategorySubmitting] = useState(false)

  const handleQuickCreateCategory = async () => {
    try {
      const values = await quickCategoryForm.validateFields()
      setQuickCategorySubmitting(true)
      const name = values.name.trim()
      const slug = values.slug ? generateSlug(values.slug.trim()) : generateSlug(name)

      const newCategory = await createCategoryMutation.mutateAsync({
        name,
        slug,
        description: values.description?.trim(),
        order: (categories?.length || 0) + 1,
        isActive: true
      })

      messageApi.success(`Đã tạo và chọn danh mục "${name}" thành công!`)
      await queryClient.invalidateQueries({ queryKey: projectCategoryKeys.all() })
      if (newCategory?._id) {
        form.setFieldValue('category', newCategory._id)
      }
      setIsQuickCategoryModalVisible(false)
      quickCategoryForm.resetFields()
    } catch (err: unknown) {
      const errorMsg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      messageApi.error(errorMsg || 'Lỗi khi tạo danh mục mới!')
    } finally {
      setQuickCategorySubmitting(false)
    }
  }

  // Quản lý danh sách hình ảnh & ảnh chính
  const [imageList, setImageList] = useState<ProjectImageItem[]>([])
  const [selectedMainImage, setSelectedMainImage] = useState<string>('')
  const [newImageUrl, setNewImageUrl] = useState<string>('')

  useEffect(() => {
    if (editingProject && isModalVisible) {
      const rawMedia = Array.isArray(editingProject.media) ? editingProject.media.filter(Boolean) : []
      const allImgs = Array.from(
        new Set([editingProject.mainImage, ...rawMedia].filter(Boolean))
      ) as string[]

      const initialItems: ProjectImageItem[] = allImgs.map((url, idx) => ({
        uid: `img-${idx}-${Date.now()}`,
        url,
        name: `Ảnh ${idx + 1}`
      }))

      const mainImg = editingProject.mainImage || allImgs[0] || ''
      setImageList(initialItems)
      setSelectedMainImage(mainImg)
      setNewImageUrl('')

      form.setFieldsValue({
        title: editingProject.title,
        description: editingProject.description,
        details: editingProject.details,
        workingScope: editingProject.workingScope,
        startDate: editingProject.startDate ? dayjs(editingProject.startDate) : null,
        endDate: editingProject.endDate ? dayjs(editingProject.endDate) : null,
        status: editingProject.status,
        category:
          typeof editingProject.category === 'object' && editingProject.category
            ? editingProject.category._id
            : editingProject.category,
        mainImage: mainImg,
        isFeatured: Boolean(editingProject.isFeatured)
      })
    } else if (!editingProject && isModalVisible) {
      form.resetFields()
      setImageList([])
      setSelectedMainImage('')
      setNewImageUrl('')
    }
  }, [editingProject, isModalVisible, form])

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
        // Fallback to base64
      }

      if (!imageUrl) {
        imageUrl = await getBase64(file)
      }

      const newItem: ProjectImageItem = {
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

    const newItem: ProjectImageItem = {
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

  const onFinish = async (values: Record<string, unknown>) => {
    const mainImage =
      (values.mainImage as string) || selectedMainImage || imageList[0]?.url || ''

    if (!mainImage) {
      messageApi.error('Vui lòng chọn hoặc tải lên ít nhất một ảnh chính!')
      return
    }

    const imageListUrls = imageList.map((img) => img.url).filter(Boolean)
    const media =
      imageListUrls.length > 0
        ? imageListUrls.includes(mainImage)
          ? imageListUrls
          : [mainImage, ...imageListUrls]
        : [mainImage]

    const startDateVal = values.startDate
      ? dayjs.isDayjs(values.startDate)
        ? values.startDate.toISOString()
        : String(values.startDate)
      : ''

    const endDateVal = values.endDate
      ? dayjs.isDayjs(values.endDate)
        ? values.endDate.toISOString()
        : String(values.endDate)
      : null

    const projectData = {
      title: values.title as string,
      description: (values.description as string) ?? '',
      details: Array.isArray(values.details) ? (values.details as string[]) : [],
      workingScope: Array.isArray(values.workingScope) ? (values.workingScope as string[]) : [],
      startDate: startDateVal,
      endDate: endDateVal,
      mainImage,
      media,
      status: (values.status as 'completed' | 'in-progress') || 'in-progress',
      category: values.category as string,
      isFeatured: Boolean(values.isFeatured)
    } as CreateProjectDto | UpdateProjectDto

    const saveMessage = messageApi.loading('Đang lưu dự án...', 0)

    try {
      if (editingProject) {
        await updateProjectMutation.mutateAsync({
          id: editingProject._id,
          data: projectData
        })
      } else {
        await createProjectMutation.mutateAsync(projectData as CreateProjectDto)
      }

      saveMessage()
      messageApi.success(
        editingProject ? 'Cập nhật dự án thành công!' : 'Tạo dự án mới thành công!'
      )
      queryClient.invalidateQueries({ queryKey: projectKeys.all })

      setIsModalVisible(false)
      form.resetFields()
      setImageList([])
      setSelectedMainImage('')
      setNewImageUrl('')
    } catch (error) {
      saveMessage()
      const errorMessage =
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof error.message === 'string'
          ? error.message
          : 'Có lỗi xảy ra khi lưu dự án!'
      messageApi.error(errorMessage)
      // eslint-disable-next-line no-console
      console.error('Save project error:', error)
    }
  }

  return (
    <>
      <Modal
      title={editingProject ? 'Chỉnh sửa dự án' : 'Thêm dự án mới'}
      open={isModalVisible}
      onOk={() => form.submit()}
      onCancel={() => {
        setIsModalVisible(false)
        form.resetFields()
        setImageList([])
        setSelectedMainImage('')
        setNewImageUrl('')
      }}
      width={isMobile ? 'calc(100vw - 16px)' : 900}
      okText={editingProject ? 'Cập nhật' : 'Thêm mới'}
      cancelText="Hủy"
      centered
      styles={{
        body: {
          maxHeight: isMobile ? 'calc(100vh - 180px)' : undefined,
          overflowY: isMobile ? 'auto' : undefined
        }
      }}
      confirmLoading={createProjectMutation.isPending || updateProjectMutation.isPending}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* HÀNG 1: TÊN DỰ ÁN & DANH MỤC */}
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="title"
              label="Tên dự án"
              rules={[{ required: true, message: 'Vui lòng nhập tên dự án!' }]}
            >
              <Input placeholder="Nhập tên dự án" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="category"
              label={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span>Danh mục</span>
                  <Button
                    type="link"
                    size="small"
                    icon={<PlusOutlined />}
                    style={{ padding: 0, height: 'auto', fontSize: 12 }}
                    onClick={() => setIsQuickCategoryModalVisible(true)}
                  >
                    Thêm danh mục mới
                  </Button>
                </div>
              }
              rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
            >
              <Select
                placeholder="Chọn danh mục"
                loading={categoriesLoading}
                allowClear
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Space style={{ padding: '0 8px 4px' }}>
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={() => setIsQuickCategoryModalVisible(true)}
                        style={{ color: '#1677ff', fontSize: 13 }}
                      >
                        + Thêm danh mục mới
                      </Button>
                    </Space>
                  </>
                )}
              >
                {categories && categories.length > 0 ? (
                  categories.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))
                ) : (
                  <Option value="" disabled>
                    {!categoriesLoading ? 'Không có danh mục' : 'Đang tải...'}
                  </Option>
                )}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* HÀNG 2: TRẠNG THÁI & DỰ ÁN NỔI BẬT */}
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
            >
              <Select placeholder="Chọn trạng thái">
                <Option value="in-progress">Đang thực hiện</Option>
                <Option value="completed">Hoàn thành</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="isFeatured"
              label="Dự án nổi bật"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        {/* HÀNG 3: NGÀY BẮT ĐẦU & NGÀY KẾT THÚC */}
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="startDate"
              label="Ngày bắt đầu"
              rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
            >
              <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày bắt đầu" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="endDate" label="Ngày kết thúc">
              <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày kết thúc (nếu có)" />
            </Form.Item>
          </Col>
        </Row>

        {/* HÀNG 4: MÔ TẢ */}
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả dự án!' }]}
        >
          <TextArea rows={3} placeholder="Nhập mô tả tổng quan về dự án" />
        </Form.Item>

        {/* HÀNG 5: PHẠM VI CÔNG VIỆC & CHI TIẾT */}
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item name="workingScope" label="Phạm vi công việc">
              <Select
                mode="tags"
                placeholder="Nhập phạm vi công việc (nhấn Enter để thêm)"
                tokenSeparators={[',']}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="details" label="Chi tiết">
              <Select
                mode="tags"
                placeholder="Nhập các chi tiết (nhấn Enter để thêm)"
                tokenSeparators={[',']}
              />
            </Form.Item>
          </Col>
        </Row>

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
              <span style={{ fontWeight: 600 }}>Ảnh chính đại diện (Avatar hiển thị ngoài danh sách)</span>
            </Space>
          }
          rules={[{ required: true, message: 'Vui lòng chọn ảnh chính cho dự án!' }]}
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
                placeholder="Hoặc dán URL hình ảnh..."
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
          <div
            style={{
              padding: '28px 16px',
              background: '#ffffff',
              border: '1px dashed #cbd5e1',
              borderRadius: 8,
              textAlign: 'center',
              marginBottom: 10
            }}
          >
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Chưa có hình ảnh nào cho dự án này. Hãy tải lên từ máy tính hoặc dán link URL ảnh phía trên."
            />
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))',
              gap: 12,
              marginBottom: 16,
              maxHeight: 280,
              overflowY: 'auto',
              padding: '8px 4px'
            }}
          >
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
                    <div
                      style={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        zIndex: 2,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      <Tag
                        color="gold"
                        icon={<StarFilled />}
                        style={{ margin: 0, fontWeight: 600, fontSize: 11, padding: '1px 6px' }}
                      >
                        Ảnh chính
                      </Tag>
                    </div>
                  )}

                  {/* Thumbnail */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 96,
                      borderRadius: 6,
                      overflow: 'hidden',
                      background: '#f1f5f9'
                    }}
                  >
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
                  <div
                    style={{
                      marginTop: 6,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
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

    {/* Modal tạo nhanh danh mục */}
    <Modal
      title="Thêm nhanh danh mục dự án"
      open={isQuickCategoryModalVisible}
      onOk={handleQuickCreateCategory}
      onCancel={() => {
        setIsQuickCategoryModalVisible(false)
        quickCategoryForm.resetFields()
      }}
      confirmLoading={quickCategorySubmitting}
      okText="Tạo danh mục"
      cancelText="Hủy"
      destroyOnClose
    >
      <Form form={quickCategoryForm} layout="vertical" style={{ marginTop: 12 }}>
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
        >
          <Input
            placeholder="Ví dụ: Nhà phố hiện đại, Biệt thự nghỉ dưỡng..."
            onChange={(e) => {
              const name = e.target.value
              quickCategoryForm.setFieldValue('slug', generateSlug(name))
            }}
          />
        </Form.Item>

        <Form.Item
          name="slug"
          label="Mã slug"
          rules={[{ required: true, message: 'Vui lòng nhập slug!' }]}
          tooltip="Mã định danh không dấu viết liền, ví dụ: nha-pho-hien-dai"
        >
          <Input placeholder="Ví dụ: nha-pho-hien-dai" />
        </Form.Item>

        <Form.Item name="description" label="Mô tả danh mục (tùy chọn)">
          <TextArea
            rows={3}
            placeholder="Mô tả ngắn gọn về loại hình dự án này..."
          />
        </Form.Item>
      </Form>
    </Modal>
  </>
  )
}

export default FormModal
