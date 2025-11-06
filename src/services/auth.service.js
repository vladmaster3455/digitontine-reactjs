import api from './api';
import API_CONFIG from '../config/api.config';

export const authService = {
  // Étape 1: Login - Envoie OTP
  async loginStep1(identifier, motDePasse) {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN_STEP1, {
      identifier,
      motDePasse,
    });
    return response.data;
  },

  // Étape 2: Vérification OTP
  async loginStep2(email, code) {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN_STEP2, {
      email,
      code,
    });
    
    if (response.data.success && response.data.data?.token) {
      localStorage.setItem('token', response.data.data.token);
      if (response.data.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
    }
    
    return response.data;
  },

  // Obtenir le profil utilisateur
  async getMe() {
    const response = await api.get(API_CONFIG.ENDPOINTS.AUTH.GET_ME);
    return response.data;
  },

  // Vérifier le token
  async verifyToken() {
    const response = await api.get(API_CONFIG.ENDPOINTS.AUTH.VERIFY_TOKEN);
    return response.data;
  },

  // Logout
  async logout() {
    try {
      await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // Mot de passe oublié
  async forgotPassword(email) {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      email,
    });
    return response.data;
  },

  // Réinitialiser le mot de passe
  async resetPassword(email, code, nouveauMotDePasse) {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD, {
      email,
      code,
      nouveauMotDePasse,
    });
    return response.data;
  },

  // Changer le mot de passe (première connexion)
  async firstPasswordChange(ancienMotDePasse, nouveauMotDePasse) {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.FIRST_PASSWORD_CHANGE, {
      ancienMotDePasse,
      nouveauMotDePasse,
    });
    return response.data;
  },

  // Changer le mot de passe
  async changePassword(ancienMotDePasse, nouveauMotDePasse) {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.CHANGE_PASSWORD, {
      ancienMotDePasse,
      nouveauMotDePasse,
    });
    return response.data;
  },
};

