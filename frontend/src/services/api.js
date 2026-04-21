import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Authentication API calls
 */
export const authAPI = {
  /**
   * Register a new user
   * @param {Object} userData - { name, email, password }
   * @returns {Promise} Response with token and user data
   */
  register: (userData) => {
    return api.post('/auth/register', userData);
  },

  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise} Response with token and user data
   */
  login: (credentials) => {
    return api.post('/auth/login', credentials);
  },
};

export default api;
