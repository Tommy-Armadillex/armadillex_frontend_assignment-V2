import axios from 'axios'
import { log } from 'src/services/app/log.service'

// Create axios instance
const httpClient = axios.create({
  timeout: 30000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
httpClient.interceptors.request.use(
  (config) => {
    log.info('Making request', {
      data: config.data,
      url: config.url,
      method: config.method,
    })
    return config
  },
  (error) => {
    log.error('Request error', error)
    return Promise.reject(error)
  }
)

// Response interceptor
httpClient.interceptors.response.use(
  (response) => {
    // Check for error field in successful responses
    if (response.data && response.data.error) {
      const error = new Error(response.data.error)
      error.response = response
      error.data = response.data
      return Promise.reject(error)
    }

    return response.data
  },
  (error) => {
    // Handle CORS errors
    if (error.code === 'ERR_NETWORK' || error.message?.includes('CORS')) {
      return Promise.reject(
        new Error(
          'CORS error - API Gateway may need to allow cross-origin requests from this domain'
        )
      )
    }

    return Promise.reject(error)
  }
)

// API methods
export const httpService = {
  get: (url, config = {}) => httpClient.get(url, config),
  post: (url, data = {}, config = {}) => httpClient.post(url, data, config),
  put: (url, data = {}, config = {}) => httpClient.put(url, data, config),
  delete: (url, config = {}) => httpClient.delete(url, config),
  patch: (url, data = {}, config = {}) => httpClient.patch(url, data, config),
}
