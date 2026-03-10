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

export class CloudinaryService {
  /**
   * Get signature from backend for secure upload
   */
  static async getSignature(folder?: string): Promise<CloudinarySignature> {
    const response = await apiClient.post('/uploads/sign', { folder }, {
      requireAuth: true
    })
    return response.data
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
    formData.append('timestamp', signature.timestamp.toString())
    formData.append('signature', signature.signature)
    
    // Add folder if specified
    if (folder) {
      formData.append('folder', folder)
    }

    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${signature.cloudName}/auto/upload`,
      {
        method: 'POST',
        body: formData,
        // Add progress tracking if callback provided
        ...(onProgress && {
          onUploadProgress: (progressEvent: any) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            onProgress(progress)
          }
        })
      }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Upload failed: ${error}`)
    }

    return await response.json()
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