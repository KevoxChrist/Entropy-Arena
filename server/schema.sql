-- Entropy Arena Database Schema

USE entropy_arena;

-- Users table for authentication and user management
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_admin BOOLEAN DEFAULT FALSE NOT NULL
);

-- Leaderboard table for tracking user times and ranks
CREATE TABLE leaderboard (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_rank INT NOT NULL,
    username VARCHAR(100) NOT NULL,
    time_seconds DECIMAL(10,2) NOT NULL,
    recorded_date DATE NOT NULL
);



