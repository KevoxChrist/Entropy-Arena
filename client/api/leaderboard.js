import { API_ENDPOINTS } from '../config/api.js';

const API_BASE = API_ENDPOINTS.LEADERBOARD;

export async function updateLeaderboardUsername(id, username) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  })

  const data = await response.json()

  if (!response.ok || !data.success) {
    const message = data?.message || 'Failed to update leaderboard entry'
    throw new Error(message)
  }

  return data.data
}

