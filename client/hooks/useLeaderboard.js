import { useEffect, useState } from 'react'
import { leaderboardEntries as mockEntries } from '../pages/leaderboardData.js'
import { API_ENDPOINTS } from '../config/api.js'

const API_URL = API_ENDPOINTS.LEADERBOARD

function mapRowToEntry(row) {
  return {
    id: row.id,
    rank: row.user_rank,
    username: row.username,
    time: Number(row.time_seconds),
    date: row.recorded_date
      ? new Date(row.recorded_date).toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: '2-digit',
        })
      : '',
  }
}

export default function useLeaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const dedupeByUser = (list) => {
    const byUser = new Map()
    for (const entry of list) {
      const existing = byUser.get(entry.username)
      if (!existing || entry.time < existing.time) {
        byUser.set(entry.username, entry)
      }
    }
    return Array.from(byUser.values())
  }

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard')
        }

        const json = await response.json()
        const rows = json?.data ?? []
        const mapped = rows.map(mapRowToEntry)
        const deduped = dedupeByUser(mapped)

        if (!cancelled) {
          setEntries(deduped)
          setError(null)
        }
      } catch (err) {
        console.error('Leaderboard fetch error, falling back to mock data:', err)
        if (!cancelled) {
          setError(err)
          const fallbackRaw = mockEntries.map((entry, index) => ({
            id: entry.id ?? index + 1,
            ...entry,
          }))
          const fallback = dedupeByUser(fallbackRaw)
          setEntries(fallback)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  const removeEntry = (id) => {
    setEntries((previous) => previous.filter((entry) => entry.id !== id))
  }

  return { entries, loading, error, removeEntry }
}
