// src/utils/constants.js
// Game balance & configuration

const GAME_CONFIG = {
  // Star pricing (USD)
  STAR_PACKS: [
    { stars: 10, price: 0.99, bonus: 0 },
    { stars: 50, price: 4.99, bonus: 5 },
    { stars: 100, price: 8.99, bonus: 15 },
    { stars: 500, price: 39.99, bonus: 100 },
  ],

  // Daily rewards
  DAILY_STARS: 5,
  DAILY_COINS: 100,
  DAILY_FREE_SPINS: 1,

  // Race rewards
  RACE_REWARDS: {
    win: { coins: 500, stars: 2, xp: 50 },
    top3: { coins: 250, stars: 1, xp: 25 },
    complete: { coins: 100, stars: 0, xp: 10 },
  },

  // Shop items
  VEHICLES: [
    {
      id: 'starter',
      name: 'Jetbye Classic',
      cost_coins: 0,
      cost_stars: 0,
      speed: 50,
      handling: 50,
      nitro: 3,
    },
    {
      id: 'speed_demon',
      name: 'Speed Demon',
      cost_coins: 5000,
      cost_stars: 25,
      speed: 85,
      handling: 40,
      nitro: 5,
    },
    {
      id: 'legend',
      name: 'Jetbye Legend',
      cost_coins: 0,
      cost_stars: 100,
      speed: 95,
      handling: 80,
      nitro: 8,
    },
  ],

  COSMETICS: [
    { id: 'red_paint', name: 'Red Paint', cost_coins: 500, cost_stars: 0, type: 'paint' },
    { id: 'neon_glow', name: 'Neon Glow', cost_coins: 2000, cost_stars: 10, type: 'effect' },
    { id: 'gold_wheels', name: 'Gold Wheels', cost_coins: 0, cost_stars: 50, type: 'wheels' },
  ],

  POWERUPS: [
    { id: 'speed_boost', name: 'Speed Boost +50%', cost_coins: 1000, duration_seconds: 30 },
    { id: 'shield', name: 'Shield', cost_coins: 1500, duration_seconds: 45 },
    { id: 'magnetism', name: 'Coin Magnetism', cost_coins: 800, duration_seconds: 20 },
  ],

  // Spin wheel tiers
  SPIN_REWARDS: {
    common: [
      { reward: 'coins', amount: 500, weight: 40 },
      { reward: 'cosmetic', item: 'red_paint', weight: 30 },
      { reward: 'stars', amount: 1, weight: 20 },
    ],
    rare: [
      { reward: 'coins', amount: 2000, weight: 30 },
      { reward: 'vehicle', item: 'speed_demon', weight: 40 },
      { reward: 'stars', amount: 10, weight: 30 },
    ],
    epic: [
      { reward: 'stars', amount: 50, weight: 50 },
      { reward: 'cosmetic', item: 'neon_glow', weight: 40 },
      { reward: 'multiplier_2x', weight: 10 },
    ],
    legendary: [
      { reward: 'stars', amount: 100, weight: 40 },
      { reward: 'vehicle', item: 'legend', weight: 40 },
      { reward: 'multiplier_upgrade', weight: 20 },
    ],
  },

  // Spin cost
  SPIN_COST_STARS: 5, // Free once per day, then 5 stars each
  EXTRA_SPIN_COST: 5,

  // Leaderboard
  LEADERBOARD_SIZE: 50,
  SEASON_DAYS: 7,
};

const SPIN_TIERS = {
  common: 60,   // 60% chance
  rare: 25,     // 25% chance
  epic: 10,     // 10% chance
  legendary: 5, // 5% chance
};

module.exports = { GAME_CONFIG, SPIN_TIERS };
