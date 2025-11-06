/**
 * Configuration centralisée de l'API DigiTontine
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_PREFIX = '/api/proxy';
const API_TIMEOUT = 120000;

// Log pour debug (uniquement en développement)
if (import.meta.env.DEV) {
  console.log('🔧 API Configuration:');
  console.log('  - VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
  console.log('  - API_BASE_URL:', API_BASE_URL);
  console.log('  - CREATE_ADMIN_PUBLIC:', `${API_BASE_URL}/create-admin-public`);
}

const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  API_PREFIX: API_PREFIX,
  FULL_URL: `${API_BASE_URL}${API_PREFIX}`,
  TIMEOUT: API_TIMEOUT,
  RETRY_ATTEMPTS: 3,
  
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  ENDPOINTS: {
    AUTH: {
      CREATE_ADMIN_PUBLIC: `${API_BASE_URL}/create-admin-public`,
      LOGIN_STEP1: '/auth/login',
      LOGIN_STEP2: '/auth/verify-login-otp',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      CONFIRM_PASSWORD_CHANGE: '/auth/confirm-password-change',
      FIRST_PASSWORD_CHANGE: '/auth/first-password-change',
      CHANGE_PASSWORD: '/auth/change-password',
      GET_ME: '/auth/me',
      LOGOUT: '/auth/logout',
      VERIFY_TOKEN: '/auth/verify',
    },
    
    USERS: {
      LIST: '/users',
      CREATE_MEMBRE: '/users/membre',
      CREATE_TRESORIER: '/users/tresorier',
      STATS: '/users/stats',
      DETAILS: (userId) => `/users/${userId}`,
      UPDATE: (userId) => `/users/${userId}`,
      DELETE: (userId) => `/users/${userId}`,
      TOGGLE_ACTIVATION: (userId) => `/users/${userId}/toggle-activation`,
      RESET_PASSWORD: (userId) => `/users/${userId}/reset-password`,
      UPDATE_MY_PROFILE: '/users/me',
      UPDATE_PROFILE_PHOTO: '/users/me/photo-profil',
      DELETE_PROFILE_PHOTO: '/users/me/photo-profil',
    },
    
    TONTINES: {
      LIST: '/tontines',
      CREATE: '/tontines',
      DETAILS: (tontineId) => `/tontines/${tontineId}`,
      DETAILS_FOR_MEMBER: (tontineId) => `/tontines/${tontineId}/details`,
      MY_TONTINES: '/tontines/me/tontines',
      INVITATIONS: (tontineId) => `/tontines/${tontineId}/invitations`,
      UPDATE: (tontineId) => `/tontines/${tontineId}`,
      DELETE: (tontineId) => `/tontines/${tontineId}`,
      ADD_MEMBERS: (tontineId) => `/tontines/${tontineId}/membres`,
      REMOVE_MEMBER: (tontineId, userId) => `/tontines/${tontineId}/membres/${userId}`,
      ACTIVATE: (tontineId) => `/tontines/${tontineId}/activate`,
      BLOCK: (tontineId) => `/tontines/${tontineId}/block`,
      UNBLOCK: (tontineId) => `/tontines/${tontineId}/unblock`,
      CLOSE: (tontineId) => `/tontines/${tontineId}/close`,
      OPT_IN_TIRAGE: (tontineId) => `/tontines/${tontineId}/opt-in`,
    },
    
    TRANSACTIONS: {
      LIST: '/transactions',
      CREATE: '/transactions',
      MY_TRANSACTIONS: '/transactions/me',
      MY_TONTINES_TRANSACTIONS: '/transactions/my-tontines',
      DETAILS: (transactionId) => `/transactions/${transactionId}`,
      VALIDATE: (transactionId) => `/transactions/${transactionId}/validate`,
      REJECT: (transactionId) => `/transactions/${transactionId}/reject`,
    },
    
    TIRAGES: {
      LIST_BY_TONTINE: (tontineId) => `/tirages/tontine/${tontineId}`,
      NOTIFY_MEMBERS: (tontineId) => `/tirages/tontine/${tontineId}/notify`,
      AUTOMATIQUE: (tontineId) => `/tirages/tontine/${tontineId}/automatique`,
      MANUEL: (tontineId) => `/tirages/tontine/${tontineId}/manuel`,
      ANNULER: (tirageId) => `/tirages/${tirageId}/annuler`,
      DETAILS: (tirageId) => `/tirages/${tirageId}`,
      MES_GAINS: '/tirages/me/gains',
    },
    
    DASHBOARD: {
      ADMIN: '/dashboard/admin',
      TRESORIER: '/dashboard/tresorier',
      MEMBRE: '/dashboard/membre',
      STATISTIQUES: '/dashboard/statistiques',
    },
    
    VALIDATION: {
      CREATE_REQUEST: '/validation/request',
      ACCEPT: (requestId) => `/validation/accept/${requestId}`,
      REJECT: (requestId) => `/validation/reject/${requestId}`,
      PENDING: '/validation/pending',
      MY_REQUESTS: '/validation/my-requests',
      DETAILS: (requestId) => `/validation/${requestId}`,
    },
    
    NOTIFICATIONS: {
      LIST: '/notifications',
      UNREAD_COUNT: '/notifications/unread-count',
      MARK_AS_READ: (notificationId) => `/notifications/${notificationId}/read`,
      DELETE: (notificationId) => `/notifications/${notificationId}`,
      TAKE_ACTION: (notificationId) => `/notifications/${notificationId}/action`,
    },
  },
  
  ERROR_CODES: {
    NETWORK_ERROR: 'NETWORK_ERROR',
    TIMEOUT: 'TIMEOUT',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    SERVER_ERROR: 'SERVER_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  },
  
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'Erreur de connexion. Vérifiez votre internet.',
    TIMEOUT: 'La requête a pris trop de temps. Réessayez.',
    UNAUTHORIZED: 'Session expirée. Veuillez vous reconnecter.',
    FORBIDDEN: 'Vous n\'avez pas les permissions nécessaires.',
    NOT_FOUND: 'Ressource introuvable.',
    VALIDATION_ERROR: 'Données invalides.',
    SERVER_ERROR: 'Erreur serveur. Réessayez plus tard.',
    UNKNOWN_ERROR: 'Une erreur est survenue.',
  },
};

export default API_CONFIG;

