// API Configuration
// Priority: VITE_API_BASE env var > localhost for development > undefined
const getApiBaseUrl = (): string => {
  // Check if VITE_API_BASE is explicitly set (for production)
  if (import.meta.env.VITE_API_BASE) {
    return `${import.meta.env.VITE_API_BASE}/api`;
  }
  
  // For local development
  if (import.meta.env.DEV) {
    return 'http://localhost:5000/api';
  }
  
  // Production fallback - try to use current domain's /api
  // This assumes backend and frontend are on same domain
  return '/api';
};

const API_BASE = getApiBaseUrl();

export const API_BASE_URL = API_BASE;
export const API_AUTH_URL = `${API_BASE}/auth`;
export const API_BOOKINGS_URL = `${API_BASE}/bookings`;

// For debugging
console.log('API Base URL:', API_BASE_URL);
console.log('VITE_API_BASE env:', import.meta.env.VITE_API_BASE);

