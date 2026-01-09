import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include JWT token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await apiClient.post('/auth/login', { username, password });
    if (typeof window !== 'undefined' && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  },
  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  },
};

// Order API
export const orderAPI = {
  createNormal: async () => {
    const response = await apiClient.post('/orders/normal');
    return response.data;
  },
  createVIP: async () => {
    const response = await apiClient.post('/orders/vip');
    return response.data;
  },
  getAll: async () => {
    const response = await apiClient.get('/orders');
    return response.data;
  },
};

// Bot API
export const botAPI = {
  add: async () => {
    const response = await apiClient.post('/bots');
    return response.data;
  },
  remove: async () => {
    const response = await apiClient.delete('/bots');
    return response.data;
  },
  getAll: async () => {
    const response = await apiClient.get('/bots');
    return response.data;
  },
};

// Status API
export const statusAPI = {
  get: async () => {
    const response = await apiClient.get('/status');
    return response.data;
  },
};

export default apiClient;

