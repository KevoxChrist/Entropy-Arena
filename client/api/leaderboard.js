const API_BASE = 'http://localhost:5000/api/leaderboard'

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

