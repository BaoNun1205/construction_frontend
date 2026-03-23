'use client'

import React from 'react'
import { Space, Tag, Tooltip, Button, Popconfirm, Image, Typography } from 'antd'
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { Project } from '@/types/project'

const { Text } = Typography

interface Props {
  onView: (project: Project) => void
  onEdit: (project: Project) => void
  onDelete: (id: string) => void
}

const getManagementSortTime = (project: Project) =>
  dayjs(project.updatedAt || project.createdAt || project.startDate).valueOf()

export const useProjectColumns = ({
  onView,
  onEdit,
  onDelete
}: Props): ColumnsType<Project> => [
  {
    title: 'Hình ảnh',
    dataIndex: 'mainImage',
    key: 'mainImage',
    width: 80,
    render: (mainImage: string) => (
      <Image
        width={60}
        height={60}
        src={mainImage}
        alt="Project"
        style={{ objectFit: 'cover', borderRadius: '8px' }}
        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABCUlEQVR4nO3BAQ0AAADCoPdPbQ43oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+FAYEAAA=="
      />
    )
  },
  {
    title: 'Tên dự án',
    dataIndex: 'title',
    key: 'title',
    width: 250,
    sorter: (a, b) => a.title.localeCompare(b.title, 'vi'),
    render: (text: string) => (
      <Tooltip title={text}>
        <Text strong style={{ cursor: 'pointer' }}>
          {typeof text === 'string' && text.length > 50 ? `${text.substring(0, 50)}...` : text}
        </Text>
      </Tooltip>
    )
  },
  {
    title: 'Danh mục',
    dataIndex: 'category',
    key: 'category',
    width: 160,
    sorter: (a, b) => (a.category?.name || '').localeCompare(b.category?.name || '', 'vi'),
    render: (category: { name?: string }) => (
      <Tag color="blue">{category?.name || 'N/A'}</Tag>
    )
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    width: 140,
    filters: [
      { text: 'Hoàn thành', value: 'completed' },
      { text: 'Đang thực hiện', value: 'in-progress' }
    ],
    onFilter: (value, record) => record.status === value,
    render: (status: string) => (
      <Tag
        icon={status === 'completed' ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
        color={status === 'completed' ? 'success' : 'processing'}
      >
        {status === 'completed' ? 'Hoàn thành' : 'Đang thực hiện'}
      </Tag>
    )
  },
  {
    title: 'Thời gian dự án',
    key: 'timeline',
    width: 190,
    sorter: (a, b) => dayjs(a.startDate).valueOf() - dayjs(b.startDate).valueOf(),
    render: (_, record) => (
      <div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          <CalendarOutlined /> Bắt đầu: {dayjs(record.startDate).format('DD/MM/YYYY')}
        </div>
        {record.endDate && (
          <div style={{ fontSize: '12px', color: '#666' }}>
            <CalendarOutlined /> Kết thúc: {dayjs(record.endDate).format('DD/MM/YYYY')}
          </div>
        )}
      </div>
    )
  },
  {
    title: 'Cập nhật',
    key: 'updatedAt',
    width: 170,
    defaultSortOrder: 'descend' as const,
    sorter: (a, b) => getManagementSortTime(a) - getManagementSortTime(b),
    render: (_, record) => (
      <div style={{ fontSize: '12px', color: '#666' }}>
        {dayjs(record.updatedAt || record.createdAt || record.startDate).format('DD/MM/YYYY HH:mm')}
      </div>
    )
  },
  {
    title: 'Nổi bật',
    dataIndex: 'isFeatured',
    key: 'isFeatured',
    width: 90,
    render: (isFeatured: boolean) => (
      <Tag color={isFeatured ? 'gold' : 'default'}>
        {isFeatured ? 'Có' : 'Không'}
      </Tag>
    )
  },
  {
    title: 'Hành động',
    key: 'action',
    width: 150,
    render: (_, record) => (
      <Space size="small">
        <Tooltip title="Xem chi tiết">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => onView(record)}
          />
        </Tooltip>
        <Tooltip title="Chỉnh sửa">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
        </Tooltip>
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa dự án này?"
          onConfirm={() => onDelete(record._id)}
          okText="Có"
          cancelText="Không"
        >
          <Tooltip title="Xóa">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        </Popconfirm>
      </Space>
    )
  }
]
