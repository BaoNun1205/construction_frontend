export interface ApiResponse<T> {
  status: boolean
  code: number
  message: string
  data: T
}