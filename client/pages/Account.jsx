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

// Replace with fetch/api route
const mockData = {
  user: { username: " Jane Doe" },
  rank: { position: 5, bestScore: 186 },
  time: { latestTimeSeconds: 425 },
};

export default function AccountPage() {
  const { user, rank, time } = mockData;
  const username = user?.username ?? "Player";
  const rankPosition = rank?.position ?? null;
  const bestScore = rank?.bestScore ?? 0;
  const latestTime = time?.latestTimeSeconds ?? 0;

  return (
    <div className="account-page">
      {/* Left sidebar */}
      <aside className="account-sidebar">
        <div className="account-sidebar-item">
          <span className="account-label">Username</span>
          <span className="account-value">{username}</span>
        </div>

        <div className="account-sidebar-item">
          <span className="account-label">Rank</span>
          <span className="account-value">
            {rankPosition ? `#${rankPosition}` : "Unranked"}
          </span>
        </div>

        <div className="account-sidebar-item">
          <span className="account-label">Time</span>
          <span className="account-value">{formatSeconds(latestTime)}</span>
        </div>
      </aside>

      {/* Main content */}
      <main className="account-main">
        <header className="account-header">
          <h1 className="account-title">
            Hello, <span>{username}</span>
          </h1>
        </header>

        <section className="account-cards">
          {/* Rank card */}
          <article className="account-card">
            <h2 className="account-card-title">Rank</h2>
            <p className="account-card-primary">
              {rankPosition ? `#${rankPosition}` : "Unranked"}
            </p>
            <p className="account-card-secondary">Best score: {bestScore}</p>
          </article>

          {/* Time card */}
          <article className="account-card">
            <h2 className="account-card-title">Time</h2>
            <p className="account-card-primary">{formatSeconds(latestTime)}</p>
            <p className="account-card-secondary">
              Latest completed game time
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
