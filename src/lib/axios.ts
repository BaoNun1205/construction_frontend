import axios, { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosInstance } from 'axios'

// Extend AxiosRequestConfig to include requireAuth flag
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  requireAuth?: boolean
}

// Extend InternalAxiosRequestConfig for interceptors
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  requireAuth?: boolean
}

// Extend AxiosInstance to support generic typing with custom config
interface CustomAxiosInstance extends AxiosInstance {
  get<T = unknown>(url: string, config?: CustomAxiosRequestConfig): Promise<T>
  post<T = unknown>(url: string, data?: unknown, config?: CustomAxiosRequestConfig): Promise<T>
  put<T = unknown>(url: string, data?: unknown, config?: CustomAxiosRequestConfig): Promise<T>
  patch<T = unknown>(url: string, data?: unknown, config?: CustomAxiosRequestConfig): Promise<T>
  delete<T = unknown>(url: string, config?: CustomAxiosRequestConfig): Promise<T>
}

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 55000
}) as CustomAxiosInstance

// Create a versioned API client
export const apiClient = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000') + '/api/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 55000
}) as CustomAxiosInstance

/**
 * Request Interceptor
 * - Automatically attaches Authorization token (if available) when requireAuth !== false.
 * - Provides request logging in development mode.
 */
axiosClient.interceptors.request.use(async (config: CustomInternalAxiosRequestConfig) => {
  const shouldAddToken = config.requireAuth !== false // Default: true if not explicitly set

  if (shouldAddToken && typeof window !== 'undefined') {
    // Import getSession dynamically to avoid SSR issues
    const { getSession } = await import('next-auth/react')
    const session = await getSession()
    const token = (session as any)?.accessToken

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(
      '[Request]',
      config.method?.toUpperCase(),
      config.url,
      config.data ?? ''
    )
  }

  return config
})

/**
 * Response Interceptor
 * - Returns response.data directly for cleaner API calls.
 * - Handles common HTTP errors with meaningful error messages.
 */
axiosClient.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        '[Response]',
        response.status,
        response.config.url,
        response.data
      )
    }

    return response.data
  },
  async (error) => {
    let status: number | null = null
    let message = 'Unexpected error occurred'
    const data: unknown[] = []

    const {
      response = {
        status: false,
        statusText: 'Slow network, please try again later.'
      }
    } = error

    if (response.status) {
      status = response.status
      message = response.statusText

      switch (status) {
      case 401:
        message = 'Session expired. Please log in again.'
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token')
        }
        break
      case 403:
        message = 'Access denied. You do not have permission to perform this action.'
        break
      case 404:
        message = 'The requested resource could not be found.'
        break
      case 500:
        message = 'Internal server error. Please try again later.'
        break
      case 502:
        message = 'Bad gateway. The server received an invalid response.'
        break
      case 503:
        message = 'Service unavailable. Please try again later.'
        break
      }
    }

    if (response.data && response.data.statusCode) {
      const { statusCode, message: apiMessage } = response.data
      status = statusCode
      message = apiMessage
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('[API Error]:', status, message, data)
    }

    return Promise.reject({
      status,
      message,
      data
    })
  }
)

// Apply the same interceptors to the versioned API client
apiClient.interceptors.request.use(
  async (config: CustomInternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined' && config.requireAuth !== false) {
      // Import getSession dynamically to avoid SSR issues
      const { getSession } = await import('next-auth/react')
      const session = await getSession()
      const token = (session as any)?.accessToken

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `🚀 [${config.method?.toUpperCase()}] ${config.url} | Request:`,
        config.data || config.params
      )
    }

    return config
  },
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('🚨 Request Error:', error)
    }
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `✅ [${response.config.method?.toUpperCase()}] ${response.config.url} | Response:`,
        response.data
      )
    }
    return response.data
  },
  (error) => {
    let status: number = 500
    let message: string = 'An unexpected error occurred. Please try again.'
    let data: unknown = null

    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        status: 408,
        message: 'Request timeout.',
        statusText: 'Slow network, please try again later.'
      })
    }

    if (error.response) {
      status = error.response.status
      data = error.response.data

      switch (status) {
      case 401:
        message = 'Session expired. Please log in again.'
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token')
        }
        break
      case 403:
        message = 'Access denied. You do not have permission to perform this action.'
        break
      case 404:
        message = 'The requested resource could not be found.'
        break
      case 500:
        message = 'Internal server error. Please try again later.'
        break
      case 502:
        message = 'Bad gateway. The server received an invalid response.'
        break
      case 503:
        message = 'Service unavailable. Please try again later.'
        break
      }
    }

    if (error.response?.data && error.response.data.statusCode) {
      const { statusCode, message: apiMessage } = error.response.data
      status = statusCode
      message = apiMessage
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('[API Error]:', status, message, data)
    }

    return Promise.reject({
      status,
      message,
      data
    })
  }
)

export default axiosClient
