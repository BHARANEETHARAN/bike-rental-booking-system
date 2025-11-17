// API Configuration
// Priority: VITE_API_BASE env var > localhost for development > undefined
const getApiBaseUrl = (): string => {
  // Check if VITE_API_BASE is explicitly set (for production)
  if (import.meta.env.VITE_API_BASE) {
    const url = `${import.meta.env.VITE_API_BASE}/api`;
    console.log('✅ Using Render backend:', url);
    return url;
  }
  
  // For local development
  if (import.meta.env.DEV) {
    console.log('✅ Using localhost backend: http://localhost:5000/api');
    return 'http://localhost:5000/api';
  }
  
  // Production fallback - try to use current domain's /api
  console.warn('⚠️ No VITE_API_BASE set, using relative /api path');
  return '/api';
};

const API_BASE = getApiBaseUrl();

export const API_BASE_URL = API_BASE;
export const API_AUTH_URL = `${API_BASE}/auth`;
export const API_BOOKINGS_URL = `${API_BASE}/bookings`;

