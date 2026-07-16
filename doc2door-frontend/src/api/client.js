import axios from 'axios'

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

export const api = axios.create({ baseURL: BASE_URL })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  if (token) config.headers.Authorization = `Bearer ${token}`
  if (userId) config.headers['X-User-Id'] = userId
  return config
})


