'use client'

import { useState } from 'react'
import { App, Form } from 'antd'
import { useProjects, useDeleteProject } from '@/hooks/useProjects'
import { Project } from '@/types/project'

export const useProjectManagement = () => {
  const { message: messageApi } = App.useApp()
  const { data: projects = [], isLoading, error } = useProjects()
  const deleteProjectMutation = useDeleteProject()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [viewingProject, setViewingProject] = useState<Project | null>(null)
  const [form] = Form.useForm()

  const showModal = (project?: Project) => {
    setEditingProject(project || null)
    setIsModalVisible(true)

    if (!project) {
      form.resetFields()
    }
  }

  const showDetailModal = (project: Project) => {
    setViewingProject(project)
    setIsDetailModalVisible(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProjectMutation.mutateAsync(id)
      messageApi.success('Xóa dự án thành công!')
    } catch (mutationError) {
      messageApi.error('Có lỗi xảy ra khi xóa dự án!')
      // eslint-disable-next-line no-console
      console.error('Error:', mutationError)
    }
  }

  return {
    projects,
    isLoading,
    error,
    deleteProjectMutation,
    isModalVisible,
    setIsModalVisible,
    isDetailModalVisible,
    setIsDetailModalVisible,
    editingProject,
    setEditingProject,
    viewingProject,
    form,
    showModal,
    showDetailModal,
    handleDelete
  }
}
