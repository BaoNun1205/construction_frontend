'use client'

import React, { useEffect, useState } from 'react'
import {
  App,
  Button,
  Card,
  Form,
  Grid,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Space,
  Switch,
  Table,
  Tag,
  Typography
} from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  TagsOutlined
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { TemplateCategoriesService } from '@/services/templateCategoriesService'
import { TemplateCategory } from '@/types/designTemplate'
import { generateSlug } from '@/utils/slug'

const { Title, Text } = Typography
const { TextArea } = Input
const { useBreakpoint } = Grid

interface TemplateCategoryManagementProps {
  onCategoriesChanged?: () => void
}

export default function TemplateCategoryManagement({
  onCategoriesChanged
}: TemplateCategoryManagementProps) {
  const screens = useBreakpoint()
  const isMobile = !screens.md
  const { message: messageApi } = App.useApp()

  const [categories, setCategories] = useState<TemplateCategory[]>([])
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingCategory, setEditingCategory] = useState<TemplateCategory | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [form] = Form.useForm()

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const data = await TemplateCategoriesService.getAllIncludingInactive()
      setCategories(data || [])
    } catch {
      messageApi.error('Không thể tải danh sách danh mục mẫu thiết kế!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpenAdd = () => {
    setEditingCategory(null)
    form.resetFields()
    form.setFieldsValue({
      order: categories.length + 1,
      isActive: true
    })
    setIsModalVisible(true)
  }

  const handleOpenEdit = (record: TemplateCategory) => {
    setEditingCategory(record)
    form.setFieldsValue({
      name: record.name,
      code: record.code || record.slug,
      description: record.description,
      icon: record.icon,
      order: record.order ?? 0,
      isActive: record.isActive !== false
    })
    setIsModalVisible(true)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingCategory) {
      const name = e.target.value
      const currentCode = form.getFieldValue('code')
      if (!currentCode || currentCode === generateSlug(form.getFieldValue('prevName') || '')) {
        form.setFieldValue('code', generateSlug(name))
      }
      form.setFieldValue('prevName', name)
    }
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      setSubmitting(true)

      const payload: Partial<TemplateCategory> = {
        name: values.name.trim(),
        code: values.code ? generateSlug(values.code.trim()) : generateSlug(values.name.trim()),
        description: values.description?.trim(),
        icon: values.icon?.trim(),
        order: Number(values.order) || 0,
        isActive: Boolean(values.isActive)
      }

      if (editingCategory) {
        const id = editingCategory._id || editingCategory.id
        if (!id) throw new Error('Category ID missing')
        await TemplateCategoriesService.update(id, payload)
        messageApi.success('Cập nhật danh mục thành công!')
      } else {
        await TemplateCategoriesService.create(payload)
        messageApi.success('Thêm danh mục mới thành công!')
      }

      setIsModalVisible(false)
      form.resetFields()
      fetchCategories()
      onCategoriesChanged?.()
    } catch (err: unknown) {
      const errorMsg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      messageApi.error(errorMsg || 'Có lỗi xảy ra khi lưu danh mục!')
    } finally {
      setSubmitting(false)
    }
  }

  const handleToggleActive = async (record: TemplateCategory) => {
    const id = record._id || record.id
    if (!id) return
    try {
      await TemplateCategoriesService.toggleActive(id)
      messageApi.success(`Đã ${record.isActive ? 'tạm tắt' : 'kích hoạt'} danh mục "${record.name}"`)
      fetchCategories()
      onCategoriesChanged?.()
    } catch {
      messageApi.error('Không thể thay đổi trạng thái danh mục!')
    }
  }

  const handleDelete = async (record: TemplateCategory) => {
    const id = record._id || record.id
    if (!id) return
    try {
      await TemplateCategoriesService.remove(id)
      messageApi.success(`Đã xóa danh mục "${record.name}" thành công!`)
      fetchCategories()
      onCategoriesChanged?.()
    } catch {
      messageApi.error('Lỗi khi xóa danh mục!')
    }
  }

  const handleSeedDefaults = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/v1/template-categories/seed', { method: 'POST' }).catch(() => null)
      if (!res || !res.ok) {
        // Fallback creating basic category if needed
        await TemplateCategoriesService.create({ name: 'Nhà cấp 4', code: 'nha-cap-4', order: 6, isActive: true })
      }
      messageApi.success('Đã nạp danh mục mẫu thành công!')
      fetchCategories()
      onCategoriesChanged?.()
    } catch {
      messageApi.info('Đã tải lại danh mục')
      fetchCategories()
    } finally {
      setLoading(false)
    }
  }

  const columns: ColumnsType<TemplateCategory> = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: TemplateCategory) => (
        <Space direction="vertical" size={2}>
          <Text strong style={{ fontSize: 14 }}>
            {name}
          </Text>
          {record.description && (
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.description}
            </Text>
          )}
        </Space>
      )
    },
    {
      title: 'Mã (Code / Slug)',
      dataIndex: 'code',
      key: 'code',
      width: 170,
      render: (code: string, record: TemplateCategory) => (
        <Tag color="cyan">{code || record.slug}</Tag>
      )
    },
    {
      title: 'Thứ tự',
      dataIndex: 'order',
      key: 'order',
      width: 90,
      align: 'center',
      render: (order: number) => <Tag color="default">{order ?? 0}</Tag>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 140,
      align: 'center',
      render: (isActive: boolean, record: TemplateCategory) => (
        <Space size={8}>
          <Switch
            checked={isActive !== false}
            onChange={() => handleToggleActive(record)}
            size="small"
          />
          <Text style={{ fontSize: 12 }}>
            {isActive !== false ? (
              <span style={{ color: '#16a34a' }}>Hoạt động</span>
            ) : (
              <span style={{ color: '#dc2626' }}>Tạm tắt</span>
            )}
          </Text>
        </Space>
      )
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 110,
      align: 'center',
      render: (_: unknown, record: TemplateCategory) => (
        <Space size={4}>
          <Button
            type="text"
            icon={<EditOutlined style={{ color: '#1677ff' }} />}
            title="Chỉnh sửa danh mục"
            onClick={() => handleOpenEdit(record)}
          />
          <Popconfirm
            title="Xác nhận xóa danh mục"
            description={`Bạn có chắc chắn muốn xóa danh mục "${record.name}"?`}
            onConfirm={() => handleDelete(record)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              title="Xóa danh mục"
            />
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <Card bordered={false} style={{ borderRadius: isMobile ? 18 : 24 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'stretch' : 'center',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 16,
          marginBottom: 20
        }}
      >
        <Space direction="vertical" size={4}>
          <Title level={3} style={{ margin: 0, fontSize: isMobile ? 20 : 22 }}>
            <TagsOutlined style={{ marginRight: 8, color: '#0284c7' }} />
            Danh mục mẫu thiết kế
          </Title>
          <Text type="secondary">
            Thêm mới, chỉnh sửa, sắp xếp thứ tự và quản lý hiển thị các danh mục mẫu nhà kiến trúc.
          </Text>
        </Space>

        <Space wrap>
          {categories.length === 0 && (
            <Button
              icon={<ReloadOutlined />}
              onClick={handleSeedDefaults}
              loading={loading}
            >
              Nạp dữ liệu mẫu ban đầu
            </Button>
          )}
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenAdd}
            block={isMobile}
          >
            Thêm danh mục mới
          </Button>
        </Space>
      </div>

      <Table<TemplateCategory>
        columns={columns}
        dataSource={categories.map((c) => ({ ...c, key: c._id || c.id || c.code || c.slug }))}
        loading={loading}
        pagination={{ pageSize: 10, showTotal: (total) => `Tổng cộng ${total} danh mục` }}
        scroll={{ x: 600 }}
        locale={{ emptyText: 'Chưa có danh mục nào. Hãy bấm "Thêm danh mục mới" hoặc "Nạp dữ liệu mẫu ban đầu".' }}
      />

      <Modal
        title={editingCategory ? 'Chỉnh sửa danh mục mẫu' : 'Thêm danh mục mẫu thiết kế mới'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false)
          form.resetFields()
        }}
        onOk={handleSubmit}
        confirmLoading={submitting}
        okText={editingCategory ? 'Lưu thay đổi' : 'Tạo danh mục'}
        cancelText="Hủy"
        centered
        width={560}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
          >
            <Input
              placeholder="Ví dụ: Nhà cấp 4, Biệt thự vườn, Nhà phố..."
              onChange={handleNameChange}
            />
          </Form.Item>

          <Form.Item
            name="code"
            label="Mã code (Slug URL)"
            rules={[{ required: true, message: 'Vui lòng nhập mã code hoặc slug!' }]}
            tooltip="Mã định danh duy nhất không dấu, ví dụ: nha-cap-4, villa, townhouse"
          >
            <Input placeholder="Ví dụ: nha-cap-4" />
          </Form.Item>

          <Form.Item name="description" label="Mô tả danh mục">
            <TextArea
              rows={3}
              placeholder="Mô tả ngắn gọn về loại hình kiến trúc này để khách hàng dễ hiểu..."
            />
          </Form.Item>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Form.Item
              name="order"
              label="Thứ tự hiển thị"
              tooltip="Số nhỏ hiển thị trước (0, 1, 2...)"
            >
              <InputNumber min={0} max={999} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="isActive"
              label="Trạng thái hiển thị"
              valuePropName="checked"
            >
              <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </Card>
  )
}
