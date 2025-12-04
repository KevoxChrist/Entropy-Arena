import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
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

export default function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchUserStats = async () => {
      try {
        // Fetch user's leaderboard entries
        const response = await fetch(`/api/leaderboard/user/${user.username}`);
        const data = await response.json();
        
        if (data.success) {
          const entries = data.data;
          if (entries.length > 0) {
            // Get best score and latest time
            const bestEntry = entries.reduce((best, current) => 
              current.time_seconds < best.time_seconds ? current : best
            );
            const latestEntry = entries[entries.length - 1];
            
            setUserStats({
              username: user.username,
              bestTime: bestEntry.time_seconds,
              latestTime: latestEntry.time_seconds,
              rank: bestEntry.user_rank,
              totalGames: entries.length,
              bestScore: Math.round((100 - bestEntry.time_seconds) * 100) // Calculate score from time
            });
          } else {
            setUserStats({
              username: user.username,
              bestTime: 0,
              latestTime: 0,
              rank: null,
              totalGames: 0,
              bestScore: 0
            });
          }
        } else {
          setError('Failed to load user statistics');
        }
      } catch (err) {
        console.error('Error fetching user stats:', err);
        setError('Network error loading statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="account-page">Loading...</div>;
  }

  if (error) {
    return <div className="account-page">Error: {error}</div>;
  }

  const username = userStats?.username ?? "Player";
  const rankPosition = userStats?.rank ?? null;
  const bestScore = userStats?.bestScore ?? 0;
  const latestTime = userStats?.latestTime ?? 0;
  const bestTime = userStats?.bestTime ?? 0;
  const totalGames = userStats?.totalGames ?? 0;

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
          <span className="account-label">Best Time</span>
          <span className="account-value">{formatSeconds(bestTime)}</span>
        </div>

        <div className="account-sidebar-item">
          <span className="account-label">Games</span>
          <span className="account-value">{totalGames}</span>
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

          {/* Best Time card */}
          <article className="account-card">
            <h2 className="account-card-title">Best Time</h2>
            <p className="account-card-primary">{formatSeconds(bestTime)}</p>
            <p className="account-card-secondary">
              Personal record
            </p>
          </article>

          {/* Latest Time card */}
          <article className="account-card">
            <h2 className="account-card-title">Latest Time</h2>
            <p className="account-card-primary">{formatSeconds(latestTime)}</p>
            <p className="account-card-secondary">
              Most recent completion
            </p>
          </article>

          {/* Games Played card */}
          <article className="account-card">
            <h2 className="account-card-title">Games Played</h2>
            <p className="account-card-primary">{totalGames}</p>
            <p className="account-card-secondary">
              Total challenges completed
            </p>
          </article>
        </section>

        {/* Logout button */}
        <section className="account-actions">
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </section>
      </main>
    </div>
  );
}
