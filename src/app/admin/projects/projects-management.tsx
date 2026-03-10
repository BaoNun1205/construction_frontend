'use client'

import React from 'react'
import {
  Table,
  Button,
  Card,
  Alert,
  Typography
} from 'antd'
import {
  PlusOutlined
} from '@ant-design/icons'
import { useProjectColumns } from './component/ProjectColumns'
import { useProjectManagement } from './hooks/useProjectManagement'
import DetailModal from './component/DetailModal'
import FormModal from './component/FormModal'

const { Title } = Typography

const ProjectsManagement = () => {
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
    handleSubmit,
    handleDelete
  } = useProjectManagement()

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
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={2}>Quản lý Dự án</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            Thêm dự án mới
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={projects.map((project, idx) => ({
            ...project,
            key: project._id ?? (project as any).id ?? `proj-${idx}`
          }))}
          loading={isLoading}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            // showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} dự án`
          }}
          scroll={{ x: 1000 }}
        />
      </Card>

      {/* Form Modal */}
      <FormModal
        form={form}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        editingProject={editingProject}
        handleSubmit={handleSubmit}
      />

      {/* Detail Modal */}
      <DetailModal
        isDetailModalVisible={isDetailModalVisible}
        setIsDetailModalVisible={setIsDetailModalVisible}
        viewingProject={viewingProject}
      />
    </div>
  )
}

export default ProjectsManagement