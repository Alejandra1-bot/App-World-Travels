import axios from 'axios';

// Configuración de la API
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambia a tu URL de backend
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token si existe
api.interceptors.request.use(
  async (config) => {
    // Aquí puedes agregar lógica para token si es necesario
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;