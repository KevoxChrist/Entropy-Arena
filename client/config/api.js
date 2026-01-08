// API base URL configuration
// In development: empty string (uses Vite proxy to localhost:5000)
// In production: set VITE_API_BASE_URL to your EC2 server URL

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const API_ENDPOINTS = {
  AUTH: `${API_BASE_URL}/api/auth`,
  LEADERBOARD: `${API_BASE_URL}/api/leaderboard`,
  PASSWORD_ANALYZE: `${API_BASE_URL}/api/password/analyze`,
};

export default API_BASE_URL;
