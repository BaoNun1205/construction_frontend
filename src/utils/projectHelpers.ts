import { Project } from "@/types/project"


export class ProjectHelpers {
  // Format date từ ISO string thành DD/MM/YYYY
  static formatDate(isoDateString: string): string {
    const date = new Date(isoDateString)
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  // Tính duration giữa 2 ngày hoặc từ startDate đến hiện tại nếu không có endDate
  static calculateDuration(startDate: string, endDate?: string): string {
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date() // Dùng ngày hiện tại nếu không có endDate
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 30) {
      return `${diffDays} ngày`
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30)
      const remainingDays = diffDays % 30
      return remainingDays > 0 ? `${months} tháng ${remainingDays} ngày` : `${months} tháng`
    } else {
      const years = Math.floor(diffDays / 365)
      const remainingDays = diffDays % 365
      const months = Math.floor(remainingDays / 30)
      return `${years} năm ${months} tháng`
    }
  }

  // Convert status từ API sang text hiển thị
  static getStatusText(status: string): string {
    switch (status) {
      case 'completed':
        return 'Hoàn thành'
      case 'in-progress':
        return 'Đang triển khai'
      default:
      return 'Không xác định'
    }
  }

  // Get status color cho UI
  static getStatusColor(status: string): 'success' | 'warning' | 'info' | 'default' {
    switch (status) {
      case 'completed':
        return 'success'
      case 'in-progress':
        return 'warning'
      case 'pending':
        return 'info'
      default:
        return 'default'
    }
  }

  // Detect nếu media item là video
  static isVideo(mediaUrl: string): boolean {
    return mediaUrl.match(/\.(mp4|webm|mov|avi)$/i) !== null
  }

  // Format date range
  static formatDateRange(startDate: string, endDate?: string): string {
    const start = this.formatDate(startDate)
    if (!endDate) {
      return `Từ ${start} (Đang triển khai)`
    }
    const end = this.formatDate(endDate)
    return `${start} - ${end}`
  }

  // Transform Project từ API thành format cho trang chủ
  static transformForHomePage(project: Project) {
    return {
      id: project._id,
      title: project.title,
      description: project.description,
      image: project.mainImage,
      status: this.getStatusText(project.status),
      statusRaw: project.status,
      duration: this.formatDateRange(project.startDate, project.endDate),
      url: `/projects/${project.slug}`,
      category: project.category.name,
      categorySlug: project.category.slug,
    }
  }

  // Transform Project từ API thành format cho trang chi tiết
  static transformForDetailPage(project: Project) {
    const mediaCounts = this.getMediaCounts(project.media || [])
    
    return {
      id: project._id,
      title: project.title,
      description: project.description,
      mainImage: project.mainImage,
      media: project.media || [],
      status: this.getStatusText(project.status),
      statusRaw: project.status,
      duration: this.calculateDuration(project.startDate, project.endDate),
      startDate: this.formatDate(project.startDate),
      endDate: project.endDate ? this.formatDate(project.endDate) : null,
      workingScope: project.workingScope || [],
      details: project.details || [],
      contractor: '',
      location: '',
      projectType: '',
      foundationType: '',
      totalArea: '',
      category: project.category.name,
      mediaCounts: mediaCounts
    }
  }

  // Count images và videos
  static getMediaCounts(media: string[]) {
    const images = media.filter(item => !this.isVideo(item))
    const videos = media.filter(item => this.isVideo(item))

    return {
      images: images.length,
      videos: videos.length,
      total: media.length
    }
  }
}

export default ProjectHelpers
