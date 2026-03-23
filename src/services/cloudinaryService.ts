import { apiClient } from '@/lib/axios'

export interface CloudinarySignature {
  signature: string
  timestamp: number
  apiKey: string
  cloudName: string
}

export interface CloudinaryUploadResult {
  secure_url: string
  public_id: string
  resource_type: string
  width?: number
  height?: number
}

interface ApiEnvelope<T> {
  data?: T
}

export class CloudinaryService {
  private static isCloudinarySignature(value: unknown): value is CloudinarySignature {
    if (!value || typeof value !== 'object') {
      return false
    }

    const signature = value as Partial<CloudinarySignature>

    return (
      typeof signature.signature === 'string' &&
      typeof signature.apiKey === 'string' &&
      typeof signature.cloudName === 'string' &&
      (typeof signature.timestamp === 'number' || typeof signature.timestamp === 'string')
    )
  }

  private static normalizeSignature(
    response: CloudinarySignature | ApiEnvelope<CloudinarySignature>
  ): CloudinarySignature {
    const payload: unknown =
      response &&
      typeof response === 'object' &&
      'data' in response &&
      response.data
        ? response.data
        : response

    if (!this.isCloudinarySignature(payload)) {
      throw new Error('Khong the lay chu ky upload tu server.')
    }

    return {
      ...payload,
      timestamp: Number(payload.timestamp)
    }
  }

  /**
   * Get signature from backend for secure upload
   */
  static async getSignature(folder?: string): Promise<CloudinarySignature> {
    const response = await apiClient.post<CloudinarySignature | ApiEnvelope<CloudinarySignature>>('/uploads/sign', { folder }, {
      requireAuth: true
    })

    return this.normalizeSignature(response)
  }

  /**
   * Upload file directly to Cloudinary using signed upload
   */
  static async uploadFile(
    file: File, 
    signature: CloudinarySignature,
    folder?: string,
    onProgress?: (progress: number) => void
  ): Promise<CloudinaryUploadResult> {
    const formData = new FormData()
    
    // Add required fields
    formData.append('file', file)
    formData.append('api_key', signature.apiKey)
    formData.append('timestamp', String(signature.timestamp))
    formData.append('signature', signature.signature)
    
    // Add folder if specified
    if (folder) {
      formData.append('folder', folder)
    }

    // Use XMLHttpRequest for upload so we can report progress
    return await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const url = `https://api.cloudinary.com/v1_1/${signature.cloudName}/auto/upload`

      xhr.open('POST', url)

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const json = JSON.parse(xhr.responseText) as CloudinaryUploadResult
            resolve(json)
          } catch (err) {
            reject(err)
          }
        } else {
          reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`))
        }
      }

      xhr.onerror = () => reject(new Error('Network error during upload'))

      if (onProgress && xhr.upload) {
        xhr.upload.onprogress = (ev: ProgressEvent) => {
          if (ev.lengthComputable) {
            const progress = Math.round((ev.loaded * 100) / ev.total)
            onProgress(progress)
          }
        }
      }

      xhr.send(formData)
    })
  }

  /**
   * Upload multiple files to a folder
   */
  static async uploadMultipleFiles(
    files: File[],
    folder: string,
    onProgress?: (fileIndex: number, progress: number) => void
  ): Promise<CloudinaryUploadResult[]> {
    // Get signature once for all uploads
    const signature = await this.getSignature(folder)
    
    // Upload all files
    const uploadPromises = files.map((file, index) => 
      this.uploadFile(
        file, 
        signature, 
        folder,
        onProgress ? (progress) => onProgress(index, progress) : undefined
      )
    )

    return Promise.all(uploadPromises)
  }

  /**
   * Create folder name from project title
   */
  static createFolderName(title: string): string {
    return `Projects/${title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')}`
  }
}
