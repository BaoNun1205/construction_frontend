'use client'

import React, { useState } from 'react'
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
  TagsOutlined
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import {
  useProjectCategoriesIncludingInactive,
  useCreateProjectCategory,
  useUpdateProjectCategory,
  useDeleteProjectCategory,
  useToggleProjectCategoryActive
} from '@/hooks/useProjectCategories'
import { ProjectCategory } from '@/types/projectCategory'
import { generateSlug } from '@/utils/slug'

const { Title, Text } = Typography
const { TextArea } = Input
const { useBreakpoint } = Grid

interface ProjectCategoryManagementProps {
  onCategoriesChanged?: () => void
}

export default function ProjectCategoryManagement({
  onCategoriesChanged
}: ProjectCategoryManagementProps) {
  const screens = useBreakpoint()
  const isMobile = !screens.md
  const { message: messageApi } = App.useApp()

  const {
    data: categories = [],
    isLoading: loading,
    refetch
  } = useProjectCategoriesIncludingInactive()

  const createMutation = useCreateProjectCategory()
  const updateMutation = useUpdateProjectCategory()
  const deleteMutation = useDeleteProjectCategory()
  const toggleActiveMutation = useToggleProjectCategoryActive()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingCategory, setEditingCategory] = useState<ProjectCategory | null>(null)
  const [form] = Form.useForm()

  const handleOpenAdd = () => {
    setEditingCategory(null)
    form.resetFields()
    form.setFieldsValue({
      order: categories.length + 1,
      isActive: true
    })
    setIsModalVisible(true)
  }

  const handleOpenEdit = (record: ProjectCategory) => {
    setEditingCategory(record)
    form.setFieldsValue({
      name: record.name,
      slug: record.slug,
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
      const currentSlug = form.getFieldValue('slug')
      if (!currentSlug || currentSlug === generateSlug(form.getFieldValue('prevName') || '')) {
        form.setFieldValue('slug', generateSlug(name))
      }
      form.setFieldValue('prevName', name)
    }
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const payload = {
        name: values.name.trim(),
        slug: values.slug ? generateSlug(values.slug.trim()) : generateSlug(values.name.trim()),
        description: values.description?.trim(),
        icon: values.icon?.trim(),
        order: Number(values.order) || 0,
        isActive: Boolean(values.isActive)
      }

      if (editingCategory) {
        await updateMutation.mutateAsync({
          id: editingCategory._id,
          data: payload
        })
        messageApi.success('Cập nhật danh mục dự án thành công!')
      } else {
        await createMutation.mutateAsync(payload)
        messageApi.success('Thêm danh mục dự án mới thành công!')
      }

      setIsModalVisible(false)
      form.resetFields()
      refetch()
      onCategoriesChanged?.()
    } catch {
      messageApi.error('Có lỗi xảy ra khi lưu danh mục dự án!')
    }
  }

  const handleToggleActive = async (record: ProjectCategory) => {
    try {
      await toggleActiveMutation.mutateAsync(record._id)
      messageApi.success(`Đã ${record.isActive ? 'tạm tắt' : 'kích hoạt'} danh mục "${record.name}"`)
      refetch()
      onCategoriesChanged?.()
    } catch {
      messageApi.error('Không thể thay đổi trạng thái danh mục!')
    }
  }

  const handleDelete = async (record: ProjectCategory) => {
    try {
      await deleteMutation.mutateAsync(record._id)
      messageApi.success(`Đã xóa danh mục "${record.name}" thành công!`)
      refetch()
      onCategoriesChanged?.()
    } catch {
      messageApi.error('Lỗi khi xóa danh mục dự án!')
    }
  }

  const columns: ColumnsType<ProjectCategory> = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: ProjectCategory) => (
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
      title: 'Slug (Định danh URL)',
      dataIndex: 'slug',
      key: 'slug',
      width: 180,
      render: (slug: string) => <Tag color="blue">{slug}</Tag>
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
      render: (isActive: boolean, record: ProjectCategory) => (
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
      render: (_: unknown, record: ProjectCategory) => (
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
            <TagsOutlined style={{ marginRight: 8, color: '#2563eb' }} />
            Danh mục dự án
          </Title>
          <Text type="secondary">
            Quản lý các loại hình dự án (Nhà dân dụng, Công nghiệp, Nội thất...) để phân loại công trình.
          </Text>
        </Space>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenAdd}
          block={isMobile}
        >
          Thêm danh mục dự án
        </Button>
      </div>

      <Table<ProjectCategory>
        columns={columns}
        dataSource={categories.map((c) => ({ ...c, key: c._id }))}
        loading={loading}
        pagination={{ pageSize: 10, showTotal: (total) => `Tổng cộng ${total} danh mục` }}
        scroll={{ x: 600 }}
        locale={{ emptyText: 'Chưa có danh mục dự án nào. Hãy bấm "Thêm danh mục dự án".' }}
      />

      <Modal
        title={editingCategory ? 'Chỉnh sửa danh mục dự án' : 'Thêm danh mục dự án mới'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false)
          form.resetFields()
        }}
        onOk={handleSubmit}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
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
              placeholder="Ví dụ: Nhà dân dụng, Công nghiệp, Hạ tầng..."
              onChange={handleNameChange}
            />
          </Form.Item>

          <Form.Item
            name="slug"
            label="Slug định danh URL"
            rules={[{ required: true, message: 'Vui lòng nhập slug!' }]}
            tooltip="Định danh không dấu trên URL, ví dụ: nha-dan-dung, cong-nghiep"
          >
            <Input placeholder="Ví dụ: nha-dan-dung" />
          </Form.Item>

          <Form.Item name="description" label="Mô tả danh mục">
            <TextArea
              rows={3}
              placeholder="Mô tả ngắn gọn về loại hình công trình này..."
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
