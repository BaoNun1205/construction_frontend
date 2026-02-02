'use client'

import React from 'react'
import { Space, Tag, Tooltip, Button, Popconfirm, Image } from 'antd'
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { Project } from '@/types/project'
import dayjs from 'dayjs'

import { Typography } from 'antd'

const { Text } = Typography

interface Props {
  // eslint-disable-next-line no-unused-vars
  onView: (project: Project) => void
  // eslint-disable-next-line no-unused-vars
  onEdit: (project: Project) => void
  // eslint-disable-next-line no-unused-vars
  onDelete: (id: string) => void
}

export const useProjectColumns = ({ onView, onEdit, onDelete }: Props): ColumnsType<Project> => [
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
    width: 120,
    render: (category: { name?: string }) => (
      <Tag color="blue">{category?.name || 'N/A'}</Tag>
    )
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    width: 120,
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
    title: 'Thời gian',
    key: 'timeline',
    width: 180,
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
    title: 'Nổi bật',
    dataIndex: 'isFeatured',
    key: 'isFeatured',
    width: 80,
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