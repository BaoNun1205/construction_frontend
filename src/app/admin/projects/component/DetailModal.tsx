'use client'

import React, { useState, useRef } from 'react'
import {
  Button,
  Modal,
  Space,
  Tag,
  Typography,
  Row,
  Col,
  Divider,
  Image
} from 'antd'
import {
  EnvironmentOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons'
import dayjs from 'dayjs'
import { Project } from '@/types/project'

const { Title, Text, Paragraph } = Typography

interface Props {
  isDetailModalVisible: boolean
  // eslint-disable-next-line no-unused-vars
  setIsDetailModalVisible: (visible: boolean) => void
  viewingProject: Project | null
}

const DetailModal = ({
  isDetailModalVisible,
  setIsDetailModalVisible,
  viewingProject
}: Props) => {
  const [fsSrc, setFsSrc] = useState<string | null>(null)
  const fsContainerRef = useRef<HTMLDivElement | null>(null)
  const fsVideoRef = useRef<HTMLVideoElement | null>(null)
  const [isPortrait, setIsPortrait] = useState(false)

  const openFullscreenVideo = async (src: string) => {
    setFsSrc(src)
    // wait for DOM update so ref exists
    await new Promise((r) => setTimeout(r, 0))
    const el = fsContainerRef.current
    if (!el) return
    try {
      // request fullscreen on the overlay container
      if (el.requestFullscreen) {
        await el.requestFullscreen()
      } else if ('webkitRequestFullscreen' in el) {
        await (el as unknown as { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen()
      }
    } catch {
      // ignore fullscreen errors - silently fail
    }
  }

  const closeFs = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      }
    } catch {
      // ignore
    }
    setFsSrc(null)
    setIsPortrait(false)
  }

  const onFsLoadedMeta = () => {
    const v = fsVideoRef.current
    if (!v) return
    // detect natural orientation
    setIsPortrait(v.videoHeight > v.videoWidth)
  }

  if (!viewingProject) {
    return (
      <Modal
        title="Chi tiết dự án"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
            Đóng
          </Button>
        ]}
        width={1000}
        centered
        wrapClassName="detail-modal"
      />
    )
  }

  const isVideoRegex = /\.(mp4|webm|ogg)(\?.*)?$/i
  const media = viewingProject.media || []
  const videos = media.filter((m) => isVideoRegex.test(String(m)))
  const images = media.filter((m) => !isVideoRegex.test(String(m)))

  return (
    <Modal
      title="Chi tiết dự án"
      open={isDetailModalVisible}
      onCancel={() => setIsDetailModalVisible(false)}
      footer={[
        <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
          Đóng
        </Button>
      ]}
      width={1000}
      centered
      wrapClassName='detail-modal'
    >
      {viewingProject && (
        <div>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Image
                width="100%"
                height={250}
                src={viewingProject.mainImage}
                alt={viewingProject.title}
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            </Col>
            <Col span={12}>
              <Title level={3}>{viewingProject.title}</Title>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <Text strong>Trạng thái: </Text>
                  <Tag
                    icon={viewingProject.status === 'completed' ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
                    color={viewingProject.status === 'completed' ? 'success' : 'processing'}
                  >
                    {viewingProject.status === 'completed' ? 'Hoàn thành' : 'Đang thực hiện'}
                  </Tag>
                </div>
                <div>
                  <Text strong>Danh mục: </Text>
                  <Tag color="blue">{viewingProject.category?.name || 'N/A'}</Tag>
                </div>
                <div>
                  <Text strong>Ngày bắt đầu: </Text>
                  <Text>{dayjs(viewingProject.startDate).format('DD/MM/YYYY')}</Text>
                </div>
                {viewingProject.endDate && (
                  <div>
                    <Text strong>Ngày kết thúc: </Text>
                    <Text>{dayjs(viewingProject.endDate).format('DD/MM/YYYY')}</Text>
                  </div>
                )}
                <div>
                  <Text strong>Dự án nổi bật: </Text>
                  <Tag color={viewingProject.isFeatured ? 'gold' : 'default'}>
                    {viewingProject.isFeatured ? 'Có' : 'Không'}
                  </Tag>
                </div>
              </Space>
            </Col>
          </Row>

          <Divider />

          <div style={{ marginBottom: 16 }}>
            <Title level={4}>Mô tả</Title>
            <Paragraph>{viewingProject.description}</Paragraph>
          </div>

          {viewingProject.workingScope && viewingProject.workingScope.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <Title level={4}>
                <EnvironmentOutlined /> Phạm vi công việc
              </Title>
              <div>
                {viewingProject.workingScope.map((scope, index) => (
                  <Tag key={index} style={{ marginBottom: 8 }}>
                    {scope}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          {viewingProject.details && viewingProject.details.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <Title level={4}>Chi tiết</Title>
              <div>
                {viewingProject.details.map((detail, index) => (
                  <Tag key={index} color="blue" style={{ marginBottom: 8 }}>
                    {detail}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          {videos.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <Title level={4}>Video</Title>
              <Row gutter={[16, 16]}>
                {videos.map((videoUrl, index) => (
                  <Col key={index} span={8}>
                    {/* Video thumbnail với controls đầy đủ và kích thước cố định */}
                    <div
                      style={{
                        width: '100%',
                        height: 120,
                        borderRadius: 8,
                        overflow: 'hidden',
                        background: '#000',
                        position: 'relative'
                      }}
                    >
                      <video
                        src={String(videoUrl)}
                        controls
                        preload="metadata"
                        playsInline
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                        onDoubleClick={() => openFullscreenVideo(String(videoUrl))}
                      />
                      {/* Nút fullscreen overlay */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          openFullscreenVideo(String(videoUrl))
                        }}
                        style={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          background: 'rgba(0,0,0,0.7)',
                          border: 'none',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: 4,
                          cursor: 'pointer',
                          fontSize: '12px',
                          zIndex: 10
                        }}
                        title="Mở fullscreen"
                      >
                        ⛶
                      </button>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* Image section */}
          {images.length > 0 && (
            <div>
              <Title level={4}>Hình ảnh</Title>
              <Row gutter={[16, 16]}>
                {images.map((imageUrl, index) => (
                  <Col key={index} span={8}>
                    <Image
                      width="100%"
                      height={120}
                      src={String(imageUrl)}
                      alt={`${viewingProject.title} - ${index + 1}`}
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>
      )}

      {/* Fullscreen overlay cho video */}
      {fsSrc && (
        <div
          ref={fsContainerRef}
          onClick={closeFs}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1200,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12
          }}
        >
          <video
            ref={fsVideoRef}
            src={fsSrc}
            controls
            autoPlay
            onLoadedMetadata={onFsLoadedMeta}
            onClick={(e) => e.stopPropagation()} // Ngăn đóng khi click video
            style={{
              // Hiển thị đúng kích thước gốc của video
              maxWidth: isPortrait ? '60vh' : '90vw',
              maxHeight: isPortrait ? '90vh' : '80vh',
              width: 'auto',
              height: 'auto',
              outline: 'none',
              background: '#000'
            }}
          />
        </div>
      )}
    </Modal>
  )
}

export default DetailModal