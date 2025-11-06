import axios from 'axios';
import API_CONFIG from '../config/api.config';

// Créer une instance axios avec configuration par défaut
const api = axios.create({
  baseURL: API_CONFIG.FULL_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.DEFAULT_HEADERS,
});

// Intercepteur pour ajouter le token d'authentification
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

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Log des erreurs en développement
    if (import.meta.env.DEV) {
      console.error('❌ API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        message: error.message,
        response: error.response?.data,
      });
    }

    // Si erreur 401 et pas déjà retenté
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Supprimer le token et rediriger vers login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;

