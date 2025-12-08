import { useEffect, useMemo, useState } from 'react'
import LeaderChart from '../components/leaderboard/LeaderChart.jsx'
import LeaderboardEntry from '../components/leaderboard/LeaderboardEntry.jsx'
import useLeaderboard from '../hooks/useLeaderboard.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { deleteLeaderboardEntry } from '../api/leaderboard.js'
import '../styles/Leaderboard.css'
import '.././index.css'

function Leaderboard() {
  const { entries, loading, error, removeEntry } = useLeaderboard()
  const { user } = useAuth()
  const isAdmin = !!user && user.is_admin

  const sortedEntries = useMemo(
    () =>
      [...entries]
        .sort((a, b) => a.time - b.time)
        .map((entry, index) => ({ ...entry, rank: index + 1 })),
    [entries],
  )

  const getPageSize = () =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(min-width: 768px)').matches
      ? 10
      : 8

  const [pageSize, setPageSize] = useState(getPageSize)
  const [currentPage, setCurrentPage] = useState(1)
  const [autoPagedToUser, setAutoPagedToUser] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const media = window.matchMedia('(min-width: 768px)')
    const updateSize = () => setPageSize(media.matches ? 10 : 8)

    updateSize()
    media.addEventListener('change', updateSize)
    return () => media.removeEventListener('change', updateSize)
  }, [])

  const totalPages = Math.max(1, Math.ceil(sortedEntries.length / pageSize))

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages))
  }, [totalPages])

  const currentPageEntries = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedEntries.slice(start, start + pageSize)
  }, [sortedEntries, currentPage, pageSize])

  const goToPage = (page) => {
    const next = Math.min(Math.max(page, 1), totalPages)
    setCurrentPage(next)
  }

  const handleDelete = async (entryId) => {
    if (!isAdmin || !entryId) return
    try {
      await deleteLeaderboardEntry(entryId)
      removeEntry(entryId)
    } catch (err) {
      // For now just log; could add UI error later
      console.error('Failed to delete leaderboard entry', err)
    }
  }

  const currentUserEntry = useMemo(() => {
    if (!user) return null
    return sortedEntries.find((entry) => entry.username === user.username) || null
  }, [sortedEntries, user])

  useEffect(() => {
    if (!user || autoPagedToUser || !sortedEntries.length) return
    const index = sortedEntries.findIndex((entry) => entry.username === user.username)
    if (index === -1) return
    const page = Math.floor(index / pageSize) + 1
    setCurrentPage(page)
    setAutoPagedToUser(true)
  }, [user, sortedEntries, pageSize, autoPagedToUser])

  if (loading) {
    return (
      <section className="leaderboard-page">
        <div className="surface leaderboard-hero">
          <h1 className="leaderboard-title">Leaderboard</h1>
          <p className="leaderboard-subtitle">Loading leaderboard…</p>
        </div>
      </section>
    )
  }

  if (error && !sortedEntries.length) {
    return (
      <section className="leaderboard-page">
        <div className="surface leaderboard-hero">
          <h1 className="leaderboard-title">Leaderboard</h1>
          <p className="leaderboard-subtitle">
            We could not load the leaderboard right now.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="leaderboard-page">
      <div className="surface leaderboard-hero">
        <h1 className="leaderboard-title">Leaderboard</h1>
        {user ? (
          <p className="leaderboard-greeting">Welcome {user.username}</p>
        ) : null}
        <p className="leaderboard-subtitle">
          May the best password creator win!
        </p>
      </div>

      {user && (
        <div className="surface leaderboard-my-stats">
          {currentUserEntry ? (
            <>
              <p className="my-stats-label">Your best run</p>
              <div className="my-stats-main">
                <span className="my-stats-time">
                  {currentUserEntry.time.toFixed(2)}
                  <span className="my-stats-time-unit">s</span>
                </span>
                <span className="my-stats-rank">Rank #{currentUserEntry.rank}</span>
              </div>
              {currentUserEntry.date ? (
                <p className="my-stats-meta">Recorded on {currentUserEntry.date}</p>
              ) : null}
            </>
          ) : (
            <p className="my-stats-empty">
              You don&apos;t have a run on the leaderboard yet. Play in the Arena to appear here.
            </p>
          )}
        </div>
      )}

      <LeaderChart entries={currentPageEntries} />

      <div className="surface leaderboard-table">
        <div className="table-head">
          <span>Rank</span>
          <span>User</span>
          <span>Time (s)</span>
          <span>Date</span>
        </div>
        <div className="table-body">
          {currentPageEntries.map((entry) => (
            <LeaderboardEntry
              key={entry.id ?? entry.rank}
              entry={entry}
              isAdmin={isAdmin}
              isCurrentUser={Boolean(user && entry.username === user.username)}
              onDelete={() => handleDelete(entry.id)}
            />
          ))}
        </div>

        <div className="pagination-bar">
          <button
            className="page-btn"
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <div className="page-dots">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1
              const isActive = page === currentPage
              return (
                <button
                  key={page}
                  type="button"
                  className={`page-dot ${isActive ? 'active' : ''}`}
                  onClick={() => goToPage(page)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {page}
                </button>
              )
            })}
          </div>
          <button
            className="page-btn"
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}

export default Leaderboard
