import { useState } from 'react'
import '../../styles/LeaderboardEntry.css'
import { updateLeaderboardUsername } from '../../api/leaderboard.js'

function LeaderboardEntry({ entry, isAdmin }) {
  const { id, rank, username, time, date } = entry
  const isTop = rank === 1

  const [editing, setEditing] = useState(false)
  const [pendingName, setPendingName] = useState(username)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleEditClick = () => {
    setPendingName(username)
    setError('')
    setEditing(true)
  }

  const handleCancel = () => {
    setEditing(false)
    setPendingName(username)
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextName = pendingName.trim()
    if (!nextName) {
      setError('Username cannot be empty')
      return
    }

    try {
      setSaving(true)
      setError('')
      const updated = await updateLeaderboardUsername(id, nextName)
      entry.username = updated.username
      setEditing(false)
    } catch (err) {
      setError(err.message || 'Failed to update username')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={`leaderboard-entry ${isTop ? 'leaderboard-entry--top' : ''}`}>
      <div className="entry-rank">{rank}</div>

      <div className="entry-user">
        {editing ? (
          <form className="entry-edit-form" onSubmit={handleSubmit}>
            <input
              className="entry-edit-input"
              type="text"
              value={pendingName}
              onChange={(event) => setPendingName(event.target.value)}
              disabled={saving}
            />
          </form>
        ) : (
          username
        )}
        {error && <div className="entry-error">{error}</div>}
      </div>

      <div className="entry-time">
        <span className="entry-time-value">{time.toFixed(2)}</span>
        <span className="entry-time-unit">s</span>
      </div>
      <div className="entry-date">
        <span>{date}</span>
        {isAdmin && (
          <div className="entry-admin-actions">
            {editing ? (
              <>
                <button
                  type="button"
                  className="entry-admin-btn"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="entry-admin-btn"
                  onClick={handleSubmit}
                  disabled={saving}
                >
                  Save
                </button>
              </>
            ) : (
              <button
                type="button"
                className="entry-admin-btn"
                onClick={handleEditClick}
              >
                Edit
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default LeaderboardEntry
