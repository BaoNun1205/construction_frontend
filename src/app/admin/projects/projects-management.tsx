'use client'

import React, { useMemo, useState } from 'react'
import {
  Table,
  Button,
  Card,
  Alert,
  Typography,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useProjectColumns } from './component/ProjectColumns'
import { useProjectManagement } from './hooks/useProjectManagement'
import DetailModal from './component/DetailModal'
import FormModal from './component/FormModal'
import { Project } from '@/types/project'
import { useProjectCategories } from '@/hooks/useProjectCategories'

const { Title, Text } = Typography

const ProjectsManagement = () => {
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
    <div>
      <Card>
        <div
          style={{
            marginBottom: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap'
          }}
        >
          <Space direction="vertical" size={4}>
            <Title level={2} style={{ margin: 0 }}>
              Quản lý Dự án
            </Title>
            <Text type="secondary">
              Sắp xếp theo thời gian cập nhật, theo danh mục và quản lý media trực tiếp khi thêm/sửa.
            </Text>
          </Space>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            Thêm dự án mới
          </Button>
        </div>

        <div
          style={{
            marginBottom: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap'
          }}
        >
          <Select
            allowClear
            showSearch
            placeholder="Hiển thị theo danh mục"
            style={{ minWidth: 240 }}
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

        <Table<Project>
          rowKey={(record) => record._id}
          columns={columns}
          dataSource={sortedProjects}
          loading={isLoading}
          pagination={{
            current: currentPage,
            pageSize,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50'],
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} dự án`,
            onChange: (page, size) => {
              setCurrentPage(page)
              setPageSize(size)
            },
            onShowSizeChange: (_, size) => {
              setCurrentPage(1)
              setPageSize(size)
            }
          }}
          scroll={{ x: 1200 }}
        />
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
    </div>
  )
}

export default ProjectsManagement
