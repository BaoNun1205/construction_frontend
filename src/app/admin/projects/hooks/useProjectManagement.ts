'use client'

import { useState } from 'react'
import { Form, message } from 'antd'
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from '@/hooks/useProjects'
import { Project, CreateProjectDto, UpdateProjectDto } from '@/types/project'
import dayjs from 'dayjs'

export const useProjectManagement = () => {
  const { data: projects = [], isLoading, error } = useProjects()
  const createProjectMutation = useCreateProject()
  const updateProjectMutation = useUpdateProject()
  const deleteProjectMutation = useDeleteProject()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [viewingProject, setViewingProject] = useState<Project | null>(null)
  const [form] = Form.useForm()

  const showModal = (project?: Project) => {
    setEditingProject(project || null)
    setIsModalVisible(true)
    if (project) {
      form.setFieldsValue({
        title: project.title,
        description: project.description,
        status: project.status,
        workingScope: project.workingScope,
        startDate: dayjs(project.startDate),
        endDate: project.endDate ? dayjs(project.endDate) : null,
        details: project.details,
        isFeatured: project.isFeatured,
        category: project.category._id
      })
    } else {
      form.resetFields()
    }
  }

  const showDetailModal = (project: Project) => {
    setViewingProject(project)
    setIsDetailModalVisible(true)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      const projectData: CreateProjectDto | UpdateProjectDto = {
        title: values.title,
        description: values.description,
        status: values.status,
        workingScope: values.workingScope || [],
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate ? values.endDate.format('YYYY-MM-DD') : '',
        details: values.details || [],
        isFeatured: values.isFeatured || false,
        category: values.category
      }

      if (editingProject) {
        await updateProjectMutation.mutateAsync({
          id: editingProject._id,
          data: projectData as UpdateProjectDto
        })
        message.success('Cập nhật dự án thành công!')
      } else {
        await createProjectMutation.mutateAsync(projectData as CreateProjectDto)
        message.success('Tạo dự án mới thành công!')
      }

      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error('Có lỗi xảy ra!')
      // eslint-disable-next-line no-console
      console.error('Error:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProjectMutation.mutateAsync(id)
      message.success('Xóa dự án thành công!')
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa dự án!')
      // eslint-disable-next-line no-console
      console.error('Error:', error)
    }
  }

  return {
    // Data
    projects,
    isLoading,
    error,

    // Mutations
    createProjectMutation,
    updateProjectMutation,
    deleteProjectMutation,

    // Modal states
    isModalVisible,
    setIsModalVisible,
    isDetailModalVisible,
    setIsDetailModalVisible,
    editingProject,
    viewingProject,

    // Form
    form,

    // Handlers
    showModal,
    showDetailModal,
    handleSubmit,
    handleDelete
  }
}