// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE 
  ? `${import.meta.env.VITE_API_BASE}/api`
  : 'http://localhost:5000/api';

export const API_AUTH_URL = `${API_BASE_URL}/auth`;
export const API_BOOKINGS_URL = `${API_BASE_URL}/bookings`;
