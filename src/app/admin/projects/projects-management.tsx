'use client'

import React, { useMemo, useState } from 'react'
import {
  Alert,
  Button,
  Card,
  Grid,
  Image,
  List,
  Pagination,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Typography
} from 'antd'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined
} from '@ant-design/icons'
import dayjs from 'dayjs'
import { useProjectColumns } from './component/ProjectColumns'
import { useProjectManagement } from './hooks/useProjectManagement'
import DetailModal from './component/DetailModal'
import FormModal from './component/FormModal'
import { Project } from '@/types/project'
import { useProjectCategories } from '@/hooks/useProjectCategories'

const { Title, Text, Paragraph } = Typography
const { useBreakpoint } = Grid

const getStatusMeta = (status: Project['status']) => {
  if (status === 'completed') {
    return {
      color: 'success',
      icon: <CheckCircleOutlined />,
      label: 'Hoàn thành'
    }
  }

  return {
    color: 'processing',
    icon: <ClockCircleOutlined />,
    label: 'Đang thực hiện'
  }
}

const ProjectsManagement = () => {
  const screens = useBreakpoint()
  const isMobile = !screens.md
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>()

  const {
    projects,
    isLoading,
    error,
    isModalVisible,
    setIsModalVisible,
    isDetailModalVisible,
    setIsDetailModalVisible,
    editingProject,
    viewingProject,
    form,
    showModal,
    showDetailModal,
    handleDelete
  } = useProjectManagement()

  const { data: categories = [], isLoading: categoriesLoading } = useProjectCategories()

  const filteredProjects = useMemo(
    () =>
      selectedCategoryId
        ? projects.filter((project) => project.category?._id === selectedCategoryId)
        : projects,
    [projects, selectedCategoryId]
  )

  const sortedProjects = useMemo(
    () =>
      [...filteredProjects].sort(
        (a, b) =>
          dayjs(b.updatedAt || b.createdAt || b.startDate).valueOf() -
          dayjs(a.updatedAt || a.createdAt || a.startDate).valueOf()
      ),
    [filteredProjects]
  )

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return sortedProjects.slice(startIndex, startIndex + pageSize)
  }, [currentPage, pageSize, sortedProjects])

  const columns = useProjectColumns({
    onView: showDetailModal,
    onEdit: showModal,
    onDelete: handleDelete
  })

  if (error) {
    return (
      <Alert
        message="Lỗi tải dữ liệu"
        description="Không thể tải danh sách dự án. Vui lòng thử lại."
        type="error"
        showIcon
      />
    )
  }

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Card
        bordered={false}
        style={{ borderRadius: isMobile ? 18 : 24 }}
        styles={{ body: { padding: isMobile ? 16 : 24 } }}
      >
        <div
          style={{
            marginBottom: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'stretch' : 'center',
            gap: 16,
            flexWrap: 'wrap',
            flexDirection: isMobile ? 'column' : 'row'
          }}
        >
          <Space direction="vertical" size={4}>
            <Title level={2} style={{ margin: 0, fontSize: isMobile ? 24 : undefined }}>
              Quản lý dự án
            </Title>
            <Text type="secondary">
              Sắp xếp theo thời gian cập nhật, lọc theo danh mục và quản lý media trực tiếp khi thêm hoặc sửa.
            </Text>
          </Space>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
            block={isMobile}
          >
            Thêm dự án mới
          </Button>
        </div>

        <div
          style={{
            marginBottom: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'stretch' : 'center',
            gap: 12,
            flexWrap: 'wrap',
            flexDirection: isMobile ? 'column' : 'row'
          }}
        >
          <Select
            allowClear
            showSearch
            placeholder="Hiển thị theo danh mục"
            style={{ minWidth: isMobile ? '100%' : 240, width: isMobile ? '100%' : undefined }}
            loading={categoriesLoading}
            value={selectedCategoryId}
            optionFilterProp="label"
            options={categories.map((category) => ({
              label: category.name,
              value: category._id
            }))}
            onChange={(value) => {
              setSelectedCategoryId(value)
              setCurrentPage(1)
            }}
          />

          <Text type="secondary">
            Hiển thị {sortedProjects.length} dự án
          </Text>
        </div>

        {isMobile ? (
          <List<Project>
            loading={isLoading}
            dataSource={paginatedProjects}
            locale={{
              emptyText: 'Chưa có dự án nào'
            }}
            renderItem={(project) => {
              const statusMeta = getStatusMeta(project.status)

              return (
                <List.Item style={{ paddingInline: 0 }}>
                  <Card
                    bordered
                    style={{ width: '100%', borderRadius: 18 }}
                    styles={{ body: { padding: 14 } }}
                  >
                    <Space direction="vertical" size={12} style={{ width: '100%' }}>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '92px minmax(0, 1fr)',
                          gap: 12,
                          alignItems: 'start'
                        }}
                      >
                        <Image
                          src={project.mainImage}
                          alt={project.title}
                          width={92}
                          height={92}
                          style={{ borderRadius: 14, objectFit: 'cover' }}
                          preview={false}
                        />

                        <Space direction="vertical" size={6} style={{ width: '100%' }}>
                          <Space size={8} wrap>
                            <Text strong>{project.title}</Text>
                            {project.isFeatured && <Tag color="gold">Nổi bật</Tag>}
                          </Space>
                          <Space size={[8, 8]} wrap>
                            <Tag color="blue">{project.category?.name || 'Chưa có danh mục'}</Tag>
                            <Tag color={statusMeta.color} icon={statusMeta.icon}>
                              {statusMeta.label}
                            </Tag>
                          </Space>
                          <Text type="secondary">
                            {dayjs(project.startDate).format('DD/MM/YYYY')}
                            {project.endDate ? ` - ${dayjs(project.endDate).format('DD/MM/YYYY')}` : ''}
                          </Text>
                        </Space>
                      </div>

                      <Paragraph ellipsis={{ rows: 2, expandable: false }} style={{ marginBottom: 0 }}>
                        {project.description}
                      </Paragraph>

                      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                        <Button
                          type="text"
                          icon={<EyeOutlined />}
                          onClick={() => showDetailModal(project)}
                        >
                          Xem
                        </Button>
                        <Space size={4}>
                          <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => showModal(project)}
                          />
                          <Popconfirm
                            title="Bạn có chắc chắn muốn xóa dự án này?"
                            onConfirm={() => handleDelete(project._id)}
                            okText="Có"
                            cancelText="Không"
                          >
                            <Button
                              type="text"
                              danger
                              icon={<DeleteOutlined />}
                            />
                          </Popconfirm>
                        </Space>
                      </Space>
                    </Space>
                  </Card>
                </List.Item>
              )
            }}
          />
        ) : (
          <Table<Project>
            rowKey={(record) => record._id}
            columns={columns}
            dataSource={paginatedProjects}
            loading={isLoading}
            pagination={false}
            scroll={{ x: 1200 }}
          />
        )}

        {sortedProjects.length > 0 && (
          <Pagination
            style={{ marginTop: 16 }}
            align={isMobile ? 'center' : 'end'}
            current={currentPage}
            pageSize={pageSize}
            total={sortedProjects.length}
            showSizeChanger
            pageSizeOptions={['5', '10', '20', '50']}
            responsive
            showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} dự án`}
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

      <FormModal
        form={form}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        editingProject={editingProject}
      />

      <DetailModal
        isDetailModalVisible={isDetailModalVisible}
        setIsDetailModalVisible={setIsDetailModalVisible}
        viewingProject={viewingProject}
      />
    </Space>
  )
}

export default ProjectsManagement
