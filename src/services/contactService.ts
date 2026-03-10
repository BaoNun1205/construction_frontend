import { apiClient } from '@/lib/axios'
import { ApiResponse } from '@/types/api'
import {
  Contact,
  CreateContactDto,
  CreateContactResponse,
  DeleteContactResponse
} from '@/types/contact'

export class ContactService {
  /**
   * Tạo liên hệ mới
   */
  static async createContact(data: CreateContactDto): Promise<CreateContactResponse> {
    const res: ApiResponse<CreateContactResponse> = await apiClient.post('/contact', data, {
      requireAuth: false
    })
    return res.data
  }

  /**
   * Lấy tất cả liên hệ (yêu cầu xác thực)
   */
  static async getAllContacts(): Promise<Contact[]> {
    const res: ApiResponse<Contact[]> = await apiClient.get('/contact', {
      requireAuth: true
    })
    return res.data
  }

  /**
   * Lấy liên hệ theo ID (yêu cầu xác thực)
   */
  static async getContactById(id: string): Promise<Contact> {
    const res: ApiResponse<Contact> = await apiClient.get(`/contact/${id}`, {
      requireAuth: true
    })
    return res.data
  }

  /**
   * Đánh dấu liên hệ là đã đọc (yêu cầu xác thực)
   */
  static async markAsRead(id: string): Promise<Contact> {
    const res: ApiResponse<Contact> = await apiClient.put(`/contact/${id}/read`, {}, {
      requireAuth: true
    })
    return res.data
  }

  /**
   * Xóa liên hệ (yêu cầu xác thực)
   */
  static async deleteContact(id: string): Promise<DeleteContactResponse> {
    const res: ApiResponse<DeleteContactResponse> = await apiClient.delete(`/contact/${id}`, {
      requireAuth: true
    })
    return res.data
  }
}
