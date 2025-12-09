import { Link } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
  return (
    <main className="home-page">
      <div className="home-hero">
        <p className="home-eyebrow">Turn ‘Password123’ into ‘Nice Try, Hacker'</p>
        <h1 className="home-title">
          Entropy <span className="home-title-highlight">Arena</span>
        </h1>
        <p className="home-subtitle">
          Turn password security into a high‑speed challenge. Race the clock, outsmart
          attackers, and see how your strength stacks up on the global leaderboard.
        </p>
        <div className="home-feature-row">
          <div className="home-feature-pill">No real passwords stored</div>
          <div className="home-feature-pill">Learn attacks & defenses</div>
          <div className="home-feature-pill">Compete for the fastest time</div>
        </div>
        <div className="home-actions">
          <Link to="/arena" className="home-cta-button">
            Enter the Arena
          </Link>
          <Link to="/faq" className="home-secondary-link">
            Learn how it works
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Home
