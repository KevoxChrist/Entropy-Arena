import '../../styles/LeaderboardEntry.css'

function LeaderboardEntry({ entry }) {
  const { rank, username, time, date } = entry
  const isTop = rank === 1

  return (
    <div className={`leaderboard-entry ${isTop ? 'leaderboard-entry--top' : ''}`}>
      <div className="entry-rank">{rank}</div>
      <div className="entry-user">{username}</div>
      <div className="entry-time">
        <span className="entry-time-value">{time.toFixed(2)}</span>
        <span className="entry-time-unit">s</span>
      </div>
      <div className="entry-date">{date}</div>
    </div>
  )
}

export default LeaderboardEntry
