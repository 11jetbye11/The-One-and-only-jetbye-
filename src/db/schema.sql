// src/db/schema.sql
-- Jetbye Racing Database Schema

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  telegram_id BIGINT UNIQUE NOT NULL,
  first_name VARCHAR(255),
  username VARCHAR(255),
  coins BIGINT DEFAULT 0,
  stars BIGINT DEFAULT 0,
  total_races INT DEFAULT 0,
  wins INT DEFAULT 0,
  xp INT DEFAULT 0,
  level INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vehicles (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cost_coins INT,
  cost_stars INT,
  speed INT,
  handling INT,
  nitro INT,
  image_url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS user_vehicles (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  vehicle_id VARCHAR(50) REFERENCES vehicles(id),
  equipped BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, vehicle_id)
);

CREATE TABLE IF NOT EXISTS cosmetics (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255),
  type VARCHAR(50), -- paint, wheels, effect
  cost_coins INT,
  cost_stars INT,
  rarity VARCHAR(20) -- common, rare, epic, legendary
);

CREATE TABLE IF NOT EXISTS user_cosmetics (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  cosmetic_id VARCHAR(50) REFERENCES cosmetics(id),
  equipped BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, cosmetic_id)
);

CREATE TABLE IF NOT EXISTS races (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  vehicle_id VARCHAR(50),
  duration_seconds INT,
  distance_traveled INT,
  coins_earned INT,
  stars_earned INT,
  xp_earned INT,
  position VARCHAR(20), -- win, top3, complete
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS spins (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  tier VARCHAR(20), -- common, rare, epic, legendary
  reward_type VARCHAR(50), -- coins, stars, cosmetic, vehicle
  reward_value VARCHAR(255),
  multiplier INT DEFAULT 1,
  stars_spent INT DEFAULT 0,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS daily_rewards (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  reward_type VARCHAR(50),
  amount INT,
  claimed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, DATE(claimed_at))
);

CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  stripe_payment_id VARCHAR(255) UNIQUE,
  amount_cents INT,
  stars_purchased INT,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS leaderboard (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  rank INT,
  score INT, -- based on wins + XP
  period VARCHAR(20), -- alltime, weekly
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, period)
);

-- Indexes for performance
CREATE INDEX idx_users_telegram_id ON users(telegram_id);
CREATE INDEX idx_races_user_id ON races(user_id);
CREATE INDEX idx_spins_user_id ON spins(user_id);
CREATE INDEX idx_leaderboard_rank ON leaderboard(rank, period);
