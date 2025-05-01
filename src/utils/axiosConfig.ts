import axios from 'axios'
import { authenticate } from './authService'

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

// Add request interceptor to include the token
axiosConfig.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.params = { ...config.params, auth: token }
  }
  return config
})

// Add response interceptor to handle authentication errors
axiosConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    
    // If error is 400 or 401 and we haven't tried to refresh token yet
    if ((error.response?.status === 400 || error.response?.status === 401) && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        // Try to get a new token
        await authenticate()
        // Retry the original request with new token
        const token = localStorage.getItem('authToken')
        originalRequest.params = { ...originalRequest.params, auth: token }
        return axios(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export default axiosConfig
