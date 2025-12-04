//Updated Account Page, w/ Mock Data 
import React from "react";
import "../styles/Account.css";

function formatSeconds(totalSeconds) {
  const sec = Number(totalSeconds) || 0;
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;

  if (h > 0) {
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// Mock Data (Replace with fetch later)
const mockData = {
  user: {
    username: "Guest!",
  },
  rank: {
    tier: "bronze", // gold | silver | bronze
    bestScore: 186,
    latestScore: 172,
  },
  time: {
    latestTimeSeconds: 425.5,
  },
};

function getTierLabel(tier) {
  if (!tier) return "Unranked";
  const names = {
    gold: "Gold",
    silver: "Silver",
    bronze: "Bronze",
  };
  return names[tier.toLowerCase()] || "Unranked";
}

function getTierClass(tier) {
  if (!tier) return "rank-tier rank-tier-unranked";
  return `rank-tier rank-tier-${tier.toLowerCase()}`;
}

export default function AccountPage() {
  const { user, rank, time } = mockData;
  const username = user?.username ?? "Player";


  const rankTier = rank?.tier ?? null;
  const rankLabel = getTierLabel(rankTier);
  const bestScore = rank?.bestScore ?? 0;
  const latestScore = rank?.latestScore ?? 0;

  const latestTime = time?.latestTimeSeconds ?? 0;

  return (
    <div className="account-page">
      {/* Sidebar */}
      <aside className="account-sidebar">
        <div className="account-sidebar-item">
          <span className="account-label">Username</span>
          <span className="account-value">{username}</span>
        </div>

        <div className="account-sidebar-item">
          <span className="account-label">Rank</span>
          <span className="account-value">{rankLabel}</span>
        </div>

        <div className="account-sidebar-item">
          <span className="account-label">Time</span>
          <span className="account-value">{formatSeconds(latestTime)}</span>
        </div>
      </aside>

      {/* Main */}
      <main className="account-main">
        <header className="account-header">
          <h1 className="account-title">
            Hello, <span>{username}</span>
          </h1>
        </header>

        <section className="account-cards">

          {/* Rank Card */}
          <article className="account-card">
            <h2 className="account-card-title">Rank</h2>
            <div className="rank-card-main">
              <span className={getTierClass(rankTier)}>{rankLabel}</span>
            </div>
          </article>

          {/* Best Score Card */}
          <article className="account-card">
            <h2 className="account-card-title">Best Score</h2>
            <p className="account-card-primary">{bestScore}</p>
          </article>

          {/* Latest Score Card */}
          <article className="account-card">
            <h2 className="account-card-title">Latest Score</h2>
            <p className="account-card-primary">{latestScore}</p>
          </article>

          {/* Time Card */}
          <article className="account-card">
            <h2 className="account-card-title">Time</h2>
            <p className="account-card-primary">{formatSeconds(latestTime)}</p>
            <p className="account-card-secondary">Latest completed game time</p>
          </article>
        </section>
      </main>
    </div>
  );
}
