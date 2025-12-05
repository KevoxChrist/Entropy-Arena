import { API_ENDPOINTS } from '../config/api.js';

const API_BASE = API_ENDPOINTS.AUTH;

export async function registerUser(formData) {
  const response = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  const data = await response.json()

  if (!response.ok || !data.success) {
    const message = data?.message || 'Registration failed'
    throw new Error(message)
  }

  return data
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  const data = await response.json()

  if (!response.ok || !data.success) {
    const message = data?.message || 'Login failed'
    throw new Error(message)
  }

  return data
}

