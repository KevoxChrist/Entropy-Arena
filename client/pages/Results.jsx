// import '../styles/Arena.css';
import '../styles/Results.css';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

function Results({ password1Data, password2Data, timeRemaining, onRestart }) {
    const { user } = useAuth();
    const [savedToLeaderboard, setSavedToLeaderboard] = useState(false);
    const [saveError, setSaveError] = useState('');
    const getStrengthLabel = (score) => {
        const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Centuries'];
        return labels[score];
    };

    const getStrengthColor = (score) => {
        const colors = ['#d73f40', '#dc6551', '#f2b84f', '#bde952', '#3ba62f'];
        return colors[score];
    };

    const getAccuracyLabel = (accuracy) => {
        if (accuracy >= 95) return 'very precise';
        if (accuracy >= 85) return 'precise';
        if (accuracy >= 75) return 'good';
        if (accuracy >= 60) return 'fair';
        return 'needs work';
    };

    const getRank = (totalScore) => {
        if (totalScore >= 18000) return 'Diamond I';
        if (totalScore >= 15000) return 'Diamond II';
        if (totalScore >= 12000) return 'Diamond III';
        if (totalScore >= 10000) return 'Platinum I';
        if (totalScore >= 8000) return 'Platinum II';
        if (totalScore >= 6000) return 'Gold I';
        if (totalScore >= 4000) return 'Gold II';
        if (totalScore >= 2000) return 'Silver I';
        if (totalScore >= 1000) return 'Silver II';
        return 'Bronze';
    };

    const generateAIFeedback = (accuracy, wpm, entropyScore, passwordLength) => {
        const strengths = [];
        const improvements = [];

        // Analyze performance for strengths
        if (accuracy >= 90) {
            strengths.push('Strong accuracy on common words');
        }
        if (wpm >= 70) {
            strengths.push('Good recovery from errors');
        }
        if (entropyScore >= 80) {
            strengths.push('Consistent pace throughout');
        }

        // Analyze for improvements
        if (accuracy < 95) {
            improvements.push('Practice with punctuation marks');
        }
        if (passwordLength < 15) {
            improvements.push('Work on less common key combinations');
        }

        // Generate summary message
        let message = '';
        if (accuracy >= 95 && wpm >= 70) {
            message = 'Excellent performance! Your typing rhythm shows consistency and strong muscle memory.';
        } else if (accuracy >= 85) {
            message = 'Great job! Your accuracy is strong and you\'re building good habits.';
        } else if (accuracy >= 75) {
            message = 'Good effort! Keep practicing to improve your consistency.';
        } else {
            message = 'Keep practicing! Focus on accuracy before speed.';
        }

        return { message, strengths, improvements };
    };

    // Use password1Data as the main data
    const passwordData = password1Data;

    if (!passwordData) return null;

    // Existing calculations
    const entropyScore = Math.round(passwordData.guesses_log10);
    const strengthLabel = getStrengthLabel(passwordData.score);
    const strengthColor = getStrengthColor(passwordData.score);

    // New calculations
    const timeTaken = 30 - timeRemaining;
    const passwordLength = passwordData.password?.length || 0;
    const wpm = Math.round((passwordLength / 5) / (timeTaken / 60));

    const accuracy = ((passwordData.score / 4) * 100).toFixed(1);
    const accuracyLabel = getAccuracyLabel(parseFloat(accuracy));
    const characterCount = passwordData.password.length;

    //---------------------------- Score calculation ----------------------------------
    // TASKS:
    // 1. Configure how the scoring is calulated. Include penalties
    const baseScore = Math.round(passwordData.guesses_log10 * 100);
    const timeBonus = timeRemaining * 50;
    const accuracyBonus = Math.round(parseFloat(accuracy) * 20);
    const totalScore = Math.round(baseScore + timeBonus + accuracyBonus);
    const xp = Math.round(totalScore * 0.15);

    //---------------------------Rank---------------------------------------------------
    const rank = getRank(totalScore);


    const aiFeedback = generateAIFeedback(parseFloat(accuracy), wpm, entropyScore, passwordLength);

    // Save to leaderboard when component mounts (only if user is logged in and not already saved)
    useEffect(() => {
        const saveToLeaderboard = async () => {
            if (!user || savedToLeaderboard) return;

            try {
                const response = await fetch('/api/leaderboard', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: user.username,
                        time_seconds: timeTaken,
                        score: totalScore
                    }),
                });

                const data = await response.json();
                
                if (data.success) {
                    setSavedToLeaderboard(true);
                } else {
                    setSaveError(data.message || 'Failed to save to leaderboard');
                }
            } catch (error) {
                console.error('Error saving to leaderboard:', error);
                setSaveError('Network error while saving to leaderboard');
            }
        };

        saveToLeaderboard();
    }, [user, timeTaken, totalScore, savedToLeaderboard]);

    return (
        <main className="results">
            <article className="container">
                {/* Leaderboard Save Status */}
                {user && (
                    <div className="save-status">
                        {savedToLeaderboard && (
                            <div className="save-success">Score saved to leaderboard!</div>
                        )}
                        {saveError && (
                            <div className="save-error">{saveError}</div>
                        )}
                    </div>
                )}
                <section className="main-grid">
                    <section className="left-middle-wrapper">
                        <div className="stats-row">
                            <article className="stat-block">
                                <span className="label">time</span>
                                <data className="value-large" value={timeTaken.toFixed(1)}>{timeTaken.toFixed(1)}s</data>
                                <span className="value-sub">{wpm} wpm</span>
                            </article>
                            <article className="stat-block">
                                <span className="label">characters</span>
                                <data className="value-large" value={characterCount}>{characterCount}</data>
                            </article>
                        </div>

                        <div className="stats-row">
                            <article className="stat-block">
                                <span className="label">score</span>
                                <data className="value-large" value={totalScore}>{totalScore.toLocaleString()}</data>
                                <span className="value-sub">+{xp} xp</span>
                            </article>
                            <article className="stat-block">
                                <span className="label">rank</span>
                                <span className="value-large">{rank}</span>
                            </article>
                        </div>

                        <section className="progress-section" aria-label="Strength Level">
                            <header className="progress-header">
                                <span className="progress-label">strength level</span>
                                <span className="progress-value" style={{ color: strengthColor }}>
                                    {strengthLabel}
                                </span>
                            </header>
                            <div className="progress-bar" role="progressbar" aria-valuenow={(passwordData.score / 4) * 100} aria-valuemin="0" aria-valuemax="100">
                                <div
                                    className="progress-fill strength-fill"
                                    style={{
                                        width: `${(passwordData.score / 4) * 100}%`,
                                        backgroundColor: strengthColor
                                    }}
                                ></div>
                            </div>
                        </section>

                        <section className="progress-section" aria-label="Entropy Score">
                            <header className="progress-header">
                                <span className="progress-label">entropy score</span>
                                <span className="progress-value">{entropyScore}</span>
                            </header>
                            <div className="progress-bar" role="progressbar" aria-valuenow={Math.min((entropyScore / 100) * 100, 100)} aria-valuemin="0" aria-valuemax="100">
                                <div
                                    className="progress-fill entropy-fill"
                                    style={{
                                        width: `${Math.min((entropyScore / 100) * 100, 100)}%`,
                                        backgroundColor: '#22c55e'
                                    }}
                                ></div>
                            </div>
                        </section>

                        <section className="crack-section" aria-labelledby="crack-heading">
                            <h2 id="crack-heading" className="crack-label">time to crack</h2>
                            <div className="crack-grid">
                                <article>
                                    <h3 className="crack-type">dictionary attack</h3>
                                    <p className="crack-time">
                                        {passwordData.crack_times_display.offline_fast_hashing_1e10_per_second}
                                    </p>
                                </article>
                                <article>
                                    <h3 className="crack-type">brute force attack</h3>
                                    <p className="crack-time">
                                        {passwordData.crack_times_display.offline_slow_hashing_1e4_per_second}
                                    </p>
                                </article>
                            </div>
                        </section>

                        <nav className="buttons" aria-label="Actions">
                            <button className="btn btn-secondary" onClick={onRestart}>
                                try again
                            </button>
                            <button className="btn btn-primary">
                                share
                            </button>
                        </nav>
                    </section>

                    <aside className="ai-feedback" aria-labelledby="ai-heading">
                        <h2 id="ai-heading" className="ai-label">ai feedback</h2>
                        <p className="ai-summary">{aiFeedback.message}</p>

                        <section className="feedback-section">
                            <h3 className="feedback-title">strengths</h3>
                            <ul>
                                {aiFeedback.strengths.map((strength, index) => (
                                    <li className="feedback-item" key={index}>
                                        <span className="feedback-arrow">→</span>
                                        <span>{strength}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="feedback-section">
                            <h3 className="feedback-title">areas to improve</h3>
                            <ul>
                                {aiFeedback.improvements.map((improvement, index) => (
                                    <li className="feedback-item" key={index}>
                                        <span className="feedback-arrow">→</span>
                                        <span>{improvement}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </aside>
                </section>
            </article>
        </main>
    );
}

export default Results;
