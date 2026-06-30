// scripts/seed.js
// Database seeding script

require('dotenv').config();
const db = require('../src/db/connection');
const { GAME_CONFIG } = require('../src/utils/constants');

async function seed() {
  try {
    console.log('🌱 Seeding database with initial data...');
    
    // Seed vehicles
    for (const vehicle of GAME_CONFIG.VEHICLES) {
      await db.query(
        `INSERT INTO vehicles (id, name, cost_coins, cost_stars, speed, handling, nitro)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (id) DO NOTHING`,
        [vehicle.id, vehicle.name, vehicle.cost_coins, vehicle.cost_stars, 
         vehicle.speed, vehicle.handling, vehicle.nitro]
      );
    }
    console.log('✅ Vehicles seeded');
    
    // Seed cosmetics
    for (const cosmetic of GAME_CONFIG.COSMETICS) {
      await db.query(
        `INSERT INTO cosmetics (id, name, type, cost_coins, cost_stars)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO NOTHING`,
        [cosmetic.id, cosmetic.name, cosmetic.type, cosmetic.cost_coins, cosmetic.cost_stars]
      );
    }
    console.log('✅ Cosmetics seeded');
    
    // Create test users
    const testUsers = [
      { telegram_id: 111111, first_name: 'Alice', username: 'alice', coins: 5000, stars: 100 },
      { telegram_id: 222222, first_name: 'Bob', username: 'bob', coins: 3500, stars: 50 },
      { telegram_id: 333333, first_name: 'Charlie', username: 'charlie', coins: 2000, stars: 25 },
    ];
    
    for (const user of testUsers) {
      await db.query(
        `INSERT INTO users (telegram_id, first_name, username, coins, stars)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (telegram_id) DO NOTHING`,
        [user.telegram_id, user.first_name, user.username, user.coins, user.stars]
      );
    }
    console.log('✅ Test users created');
    
    console.log('✅ Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
