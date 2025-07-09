// src/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://back.local/api',
})

// Interceptar y agregar el token si existe
api.interceptors.request.use((config) => {
  
  
  const token = localStorage.getItem('token')
  console.log('TOKEB       '+ axios.defaults.headers.common['Authorization'] )
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
