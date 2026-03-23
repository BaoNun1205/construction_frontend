'use client'

import React, { useEffect, useState } from 'react'
import {
  App,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Switch,
  FormInstance,
  Upload,
  Image
} from 'antd'
import {
  useCreateProject,
  useUpdateProject,
  projectKeys
} from '@/hooks/useProjects'
import { useQueryClient } from '@tanstack/react-query'
import { CreateProjectDto, Project, UpdateProjectDto } from '@/types/project'
import { UploadFile } from 'antd/lib'
import { RcFile } from 'antd/es/upload'
import { PlusOutlined } from '@ant-design/icons'
import { useProjectCategories } from '@/hooks/useProjectCategories'
import { CloudinaryService } from '@/services/cloudinaryService'
import dayjs from 'dayjs'

const { TextArea } = Input
const { Option } = Select

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormInstance<any>
  isModalVisible: boolean
  // eslint-disable-next-line no-unused-vars
  setIsModalVisible: (visible: boolean) => void
  editingProject: Project | null
}

const getBase64 = (file: Blob | File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = (error) => reject(error)
  })

interface PreviewContent {
  type: 'image' | 'video'
  src: string
  title: string
}

interface ExtendedUploadFile extends UploadFile {
  previewUrl?: string
}

const FormModal = ({
  form,
  isModalVisible,
  setIsModalVisible,
  editingProject
} : Props) => {
  const { message: messageApi } = App.useApp()
  const queryClient = useQueryClient()
  const createProjectMutation = useCreateProject()
  const updateProjectMutation = useUpdateProject()
  const { data: categories, isLoading: categoriesLoading } = useProjectCategories()

  const [fileList, setFileList] = useState<ExtendedUploadFile[]>([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewContent, setPreviewContent] = useState<PreviewContent | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])
  const [deletedUrls, setDeletedUrls] = useState<string[]>([])

  useEffect(() => {
    if (editingProject && isModalVisible) {
      form.setFieldsValue({
        title: editingProject.title,
        description: editingProject.description,
        details: editingProject.details,
        workingScope: editingProject.workingScope,
        startDate: editingProject.startDate ? dayjs(editingProject.startDate) : null,
        endDate: editingProject.endDate ? dayjs(editingProject.endDate) : null,
        status: editingProject.status,
        category: editingProject.category._id,
        mainImage: editingProject.mainImage
      })

      const existingUrls = Array.isArray(editingProject.media) ? editingProject.media.filter(Boolean) : []
      setUploadedUrls(Array.from(new Set(existingUrls)))
      setDeletedUrls([])
      setPreviewOpen(false)
      setPreviewContent(null)

      if (existingUrls.length > 0) {
        const list = existingUrls.map((url: string, idx: number) => {
          const isVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(url)
          return {
            uid: `remote-${idx}-${Math.random().toString(36).slice(2, 8)}`,
            name: url.split('/').pop() || `media-${idx}`,
            status: 'done' as const,
            url,
            type: isVideo ? 'video/*' : 'image/*',
            originUrl: url
          } as UploadFile
        })
        setFileList(list)
      } else {
        setFileList([])
      }
    } else if (!editingProject && isModalVisible) {
      form.resetFields()
      setFileList([])
      setUploadedUrls([])
      setDeletedUrls([])
      setPreviewOpen(false)
      setPreviewContent(null)
    }
  }, [editingProject, isModalVisible, form])

  // cleanup created object URLs on unmount
  useEffect(() => {
    return () => {
      fileList.forEach((f) => {
        if (f.previewUrl) {
          URL.revokeObjectURL(f.previewUrl)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = ({ fileList: newList }: { fileList: UploadFile[] }) => {
    setFileList(newList)
  }

  const beforeUpload = async (file: RcFile) => {
    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')
    if (!isImage && !isVideo) return Upload.LIST_IGNORE

    // for images use base64 preview, for videos use object URL for efficient preview
    if (isImage) {
      const base64 = await getBase64(file)
      const newFile: UploadFile = {
        uid: `${Date.now()}`,
        name: file.name,
        status: 'done',
        originFileObj: file,
        url: base64,
        type: file.type
      }
      setFileList((prev) => [...prev, newFile])
    } else {
      // video
      const previewUrl = URL.createObjectURL(file)
      const newFile: UploadFile & { previewUrl?: string } = {
        uid: `${Date.now()}`,
        name: file.name,
        status: 'done',
        originFileObj: file,
        url: previewUrl,
        type: file.type,
        // keep reference to revoke later
        previewUrl
      }
      setFileList((prev) => [...prev, newFile])
    }

    // prevent automatic upload
    return Upload.LIST_IGNORE
  }

  const handlePreview = async (file: UploadFile) => {
    // detect video vs image
    const fileType = (file.type as string) || ''

    const isVideo = fileType.startsWith('video/') || /\.(mp4|webm|ogg)$/i.test(String(file.url || file.name || ''))

    if (isVideo) {
      let src = String(file.url || '')
      // if originFileObj exist and we didn't create previewUrl earlier, create one
      if (!src && file.originFileObj) {
        src = URL.createObjectURL(file.originFileObj as File)
        ;(file as ExtendedUploadFile).previewUrl = src
      }
      setPreviewContent({ type: 'video', src, title: file.name })
      setPreviewOpen(true)
      return
    }

    // image preview
    let imageSrc = String(file.url || '')
    if (!imageSrc && file.originFileObj) {
      imageSrc = await getBase64(file.originFileObj as File)
    }
    setPreviewContent({ type: 'image', src: imageSrc, title: file.name })
    setPreviewOpen(true)
  }

  const handleRemove = (file: UploadFile) => {
    const extFile = file as ExtendedUploadFile
    if (extFile.previewUrl) {
      URL.revokeObjectURL(extFile.previewUrl)
    }

    const url = String((file as any).url || (file as any).originUrl || '')
    const isRemote = url.startsWith('http://') || url.startsWith('https://')
    const removedValue = isRemote ? url : `local:${String(file.uid)}`

    if (isRemote) {
      setDeletedUrls(prev => {
        if (prev.includes(url)) return prev
        return [...prev, url]
      })
      setUploadedUrls((prev) => prev.filter((u) => u !== url))
    }

    if (form.getFieldValue('mainImage') === removedValue || form.getFieldValue('mainImage') === url) {
      form.setFieldValue('mainImage', undefined)
    }

    setFileList((prev) => prev.filter((f) => f.uid !== file.uid))
  }

  const isRemoteUrl = (u?: string | null) => {
    if (!u) return false
    const s = String(u)
    if (s.startsWith('data:') || s.startsWith('blob:')) return false
    return s.startsWith('http://') || s.startsWith('https://')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: Record<string, any>) => {
    try {
      setIsUploading(true)

      // Build ordered newFiles with uid so we can map uploaded results back to file uid
      const newFileEntries: { file: File; uid: string }[] = []
      const existingUrls: string[] = []

      fileList.forEach((f) => {
        const uid = String(f.uid)
        if ((f as any).originFileObj) {
          newFileEntries.push({ file: (f as any).originFileObj as File, uid })
        } else {
          const url = String((f as any).url || (f as any).originUrl || '')
          if (isRemoteUrl(url)) existingUrls.push(url)
        }
      })
      const newFiles = newFileEntries.map((e) => e.file)

      let mainImage: string | undefined
      let mediaFolder = editingProject?.mediaFolder
      let allUrls: string[] = [...existingUrls]

      // Upload new files to Cloudinary if any
      if (newFiles.length > 0) {
        const folderName = mediaFolder || CloudinaryService.createFolderName(values.title)

        // Show detailed upload progress
        const uploadMessage = messageApi.loading('Đang upload ảnh...', 0)

        try {
          const uploadResults = await CloudinaryService.uploadMultipleFiles(
            newFiles,
            folderName
          )

          uploadMessage() // Clear loading message
          messageApi.success(`Upload thành công ${uploadResults.length} ảnh!`)

          // Collect all uploaded URLs and map back to file uids
          const newUrls = uploadResults.map((r) => r.secure_url)
          // map uid -> url
          const uidToUrl = new Map<string, string>()
          newFileEntries.forEach((entry, idx) => {
            uidToUrl.set(entry.uid, newUrls[idx])
          })

          allUrls = [...existingUrls, ...newUrls]
          setUploadedUrls(allUrls)

          // update fileList entries to replace local data URLs with uploaded remote URLs
          setFileList((prev) =>
            prev.map((f) => {
              const uid = String(f.uid)
              if (uidToUrl.has(uid)) {
                const url = uidToUrl.get(uid) as string
                return { ...f, url, originUrl: url, status: 'done' } as ExtendedUploadFile
              }
              return f
            })
          )

          // Set mediaFolder
          mediaFolder = folderName

          // Determine selected mainImage:
          const sel = values.mainImage as string | undefined
          if (sel && sel.startsWith('local:')) {
            const uid = sel.split(':')[1]
            mainImage = uidToUrl.get(uid) as string | undefined
          } else if (sel && isRemoteUrl(sel)) {
            mainImage = sel
          } else {
            // fallback to first uploaded
            mainImage = newUrls[0]
          }

          if (mainImage) form.setFieldValue('mainImage', mainImage)
        } catch (error) {
          uploadMessage()
          const errorMessage =
            error instanceof Error
              ? error.message
              : 'Upload ảnh thất bại! Vui lòng kiểm tra đăng nhập hoặc cấu hình Cloudinary.'
          messageApi.error(errorMessage)
          // eslint-disable-next-line no-console
          console.error('Upload error:', error)
          setIsUploading(false)
          return
        }
      } else {
        // No new uploads - check if user selected from existing or form field
        const selectedMainImage = values.mainImage
        if (selectedMainImage && existingUrls.includes(selectedMainImage)) {
          // Valid selection from existing URLs
          mainImage = selectedMainImage
        } else if (existingUrls.length > 0) {
          // Default to first existing URL
          mainImage = existingUrls[0]
          form.setFieldValue('mainImage', mainImage)
        }
      }

      // Validate mainImage is set and is a valid URL (not base64)
      if (!mainImage || mainImage.startsWith('data:')) {
        messageApi.error('Vui lòng chọn ảnh đại diện hợp lệ!')
        setIsUploading(false)
        return
      }

      // Format data for backend validation
      const projectData = {
        title: values.title,
        description: values.description ?? '',
        details: Array.isArray(values.details) ? values.details : [],
        workingScope: Array.isArray(values.workingScope) ? values.workingScope : [],
        startDate: values.startDate ? values.startDate.toISOString() : '',
        endDate: values.endDate ? values.endDate.toISOString() : null,
        mainImage,
        media: Array.isArray(allUrls) ? allUrls : [],
        mediaFolder,
        status: values.status,
        category: values.category,
        isFeatured: !!values.isFeatured,
        deletedMedia: deletedUrls.length ? deletedUrls : undefined
      } as CreateProjectDto | UpdateProjectDto

      // Submit project data
      const saveMessage = messageApi.loading('Đang lưu dự án...', 0)

      if (editingProject) {
        // Update project
        await updateProjectMutation.mutateAsync({
          id: editingProject._id,
          data: projectData
        })
      } else {
        await createProjectMutation.mutateAsync(projectData as CreateProjectDto)
      }

      saveMessage() // Clear loading message
      messageApi.success(editingProject ? 'Cập nhật dự án thành công!' : 'Tạo dự án thành công!')

      queryClient.invalidateQueries({ queryKey: projectKeys.all })

      setIsModalVisible(false)
      form.resetFields()
      setFileList([])
      setUploadedUrls([])
      setDeletedUrls([])
      setPreviewOpen(false)
      setPreviewContent(null)

    } catch (error) {
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
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Modal
      title={editingProject ? 'Chỉnh sửa dự án' : 'Thêm dự án mới'}
      open={isModalVisible}
      onOk={() => form.submit()}
      onCancel={() => {
        setIsModalVisible(false)
        form.resetFields()
        fileList.forEach((f) => {
          const extF = f as ExtendedUploadFile
          if (extF.previewUrl) URL.revokeObjectURL(extF.previewUrl)
        })
        setFileList([])
        setUploadedUrls([])
        setDeletedUrls([])
        setPreviewOpen(false)
        setPreviewContent(null)
      }}
      width={1000}
      centered
      wrapClassName='detail-modal'
      confirmLoading={
        createProjectMutation.isPending ||
        updateProjectMutation.isPending ||
        isUploading
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="title"
              label="Tên dự án"
              rules={[{ required: true, message: 'Vui lòng nhập tên dự án!' }]}
            >
              <Input placeholder="Nhập tên dự án" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
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
          <Col span={12}>
            <Form.Item
              name="category"
              label="Danh mục"
              rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
            >
              <Select placeholder="Chọn danh mục" loading={categoriesLoading} allowClear>
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

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="startDate"
              label="Ngày bắt đầu"
              rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="endDate"
              label="Ngày kết thúc"
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="mainImage"
              label="Ảnh chính"
              tooltip="Chọn ảnh chính từ danh sách ảnh đã upload. Nếu không chọn, ảnh đầu tiên sẽ được làm ảnh chính."
            >
              {(() => {
                // Build options strictly from fileList order so numbering matches displayed files.
                // Each option value is either remote URL or `local:<uid>` for new files.
                const seen = new Set<string>()
                const options: { value: string; preview: string; name?: string }[] = []

                fileList.forEach((f) => {
                  const uid = String(f.uid)
                  const rawUrl = String((f as any).url || (f as any).originUrl || '')
                  const remote = isRemoteUrl(rawUrl)
                  const value = remote ? rawUrl : `local:${uid}`
                  // avoid duplicates
                  if (!seen.has(value)) {
                    seen.add(value)
                    options.push({
                      value,
                      preview: remote ? rawUrl : String((f as any).url || ''), // base64/blob preview for local
                      name: f.name
                    })
                  }
                })

                // If no fileList entries but uploadedUrls exist (edge case), include them
                if (options.length === 0 && uploadedUrls.length > 0) {
                  uploadedUrls.filter(isRemoteUrl).forEach((url) => {
                    if (!seen.has(url)) {
                      seen.add(url)
                      options.push({ value: url, preview: url, name: undefined })
                    }
                  })
                }

                return (
                  <Select
                    placeholder="Chọn ảnh chính"
                    allowClear
                    disabled={options.length === 0}
                    optionLabelProp="label"
                  >
                    {options.map((opt, index) => (
                      <Option key={`${opt.value}-${index}`} value={opt.value} label={`Ảnh ${index + 1}`}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Image
                            src={opt.preview}
                            alt={opt.name ?? `Ảnh ${index + 1}`}
                            width={40}
                            height={40}
                            style={{ objectFit: 'cover', borderRadius: '4px' }}
                          />
                          <span>{`Ảnh ${index + 1}`}</span>
                        </div>
                      </Option>
                    ))}
                  </Select>
                )
              })()}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Hình ảnh / Video (thêm / xoá / xem trước)">
              <Upload
                accept="image/*,video/*"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={beforeUpload}
                onRemove={handleRemove}
                showUploadList={{ showPreviewIcon: true, showRemoveIcon: true, showDownloadIcon: false }}
              >
                {fileList.length >= 8 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Thêm</div>
                  </div>
                )}
              </Upload>

              <Modal
                open={previewOpen}
                title={previewContent?.title}
                footer={null}
                onCancel={() => {
                  setPreviewOpen(false)
                  // revoke temp object URL if any
                  if (previewContent?.type === 'video') {
                    // try to find corresponding file and revoke previewUrl
                    const file = fileList.find((f) => (f.url === previewContent.src) || (f as ExtendedUploadFile).previewUrl === previewContent.src)
                    if (file) {
                      const extFile = file as ExtendedUploadFile
                      if (extFile.previewUrl) {
                        // do not revoke if it's remote url
                        URL.revokeObjectURL(extFile.previewUrl)
                        extFile.previewUrl = undefined
                      }
                    }
                  }
                  setPreviewContent(null)
                }}
                centered
                width={800}
                wrapClassName='detail-modal'
              >
                {previewContent?.type === 'image' && (
                  <Image preview={false} src={previewContent.src} alt={previewContent.title} width="100%" />
                )}
                {previewContent?.type === 'video' && (
                  <video
                    key={previewContent?.src}
                    controls
                    style={{ width: '100%', maxHeight: '70vh', height: 'auto', display: 'block', margin: '0 auto' }}
                    src={previewContent?.src}
                  >
                    Trình duyệt không hỗ trợ thẻ video.
                  </video>
                )}
              </Modal>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
        >
          <TextArea rows={4} placeholder="Nhập mô tả dự án" />
        </Form.Item>

        <Form.Item
          name="workingScope"
          label="Phạm vi công việc"
        >
          <Select
            mode="tags"
            placeholder="Nhập các phạm vi công việc"
            tokenSeparators={[',']}
          />
        </Form.Item>

        <Form.Item
          name="details"
          label="Chi tiết"
        >
          <Select
            mode="tags"
            placeholder="Nhập các chi tiết"
            tokenSeparators={[',']}
          />
        </Form.Item>

        <Form.Item
          name="isFeatured"
          label="Dự án nổi bật"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormModal
