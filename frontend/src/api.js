import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/+$/, '')}/api`
  : '/api'

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
})

// Attach JWT token to every admin request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('om_admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 and 403 — both indicate the session is invalid or expired.
// Clear the stored token and redirect to the admin login page.
// DO NOT redirect when the request is to the login endpoint itself (/auth/login).
api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status
    const isLoginRequest = error.config?.url?.includes('/auth/login')
    if ((status === 401 || status === 403) && !isLoginRequest) {
      localStorage.removeItem('om_admin_token')
      localStorage.removeItem('om_admin_user')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

export default api
