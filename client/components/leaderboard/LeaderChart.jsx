import '../../styles/LeaderChart.css'

function LeaderChart({ entries }) {
  if (!entries?.length) return null

  const fastest = entries[0]
  const slowest = entries[entries.length - 1]
  const averageTime = Math.round(
    entries.reduce((sum, item) => sum + item.time, 0) / entries.length,
  )

  return (
    <div className="leader-chart surface">
      <div className="chart-item">
        <span className="chart-label">Fastest</span>
        <span className="chart-value">
          {fastest.time}
          <span className="chart-unit">s</span>
        </span>
        <span className="chart-caption">{fastest.username}</span>
      </div>
      <div className="chart-item">
        <span className="chart-label">Average</span>
        <span className="chart-value">
          {averageTime}
          <span className="chart-unit">s</span>
        </span>
        <span className="chart-caption">Across {entries.length} runs</span>
      </div>
      <div className="chart-item">
        <span className="chart-label">Longest</span>
        <span className="chart-value">
          {slowest.time}
          <span className="chart-unit">s</span>
        </span>
        <span className="chart-caption">{slowest.username}</span>
      </div>
    </div>
  )
}

export default LeaderChart
