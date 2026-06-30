// src/handlers/gameLogic.js
// Game mechanics and race logic

const { GAME_CONFIG } = require('../utils/constants');

const handlePlay = async (ctx) => {
  const userId = ctx.from.id;
  
  try {
    const user = await ctx.dbClient.query(
      'SELECT * FROM users WHERE telegram_id = $1',
      [userId]
    );
    
    if (user.rows.length === 0) {
      return ctx.reply('❌ User not found. Please /start first');
    }
    
    // Simulate race
    const duration = Math.floor(Math.random() * 30) + 10;
    const raceResult = simulateRace(duration);
    
    const keyboard = {
      inline_keyboard: [
        [{ text: `🏁 Finish Race (${raceResult.position})`, callback_data: `race_${raceResult.position}` }],
      ],
    };
    
    await ctx.reply(
      `🏎️ **Race Started**\n\n` +
      `Time: ${duration}s\n` +
      `Expected Position: ${raceResult.position}\n\n` +
      `Speed: ${raceResult.speed}km/h\n` +
      `Distance: ${raceResult.distance}m`,
      { reply_markup: keyboard }
    );
  } catch (error) {
    console.error('Error in handlePlay:', error);
    ctx.reply('❌ Race failed!');
  }
};

const handleRaceResult = async (ctx) => {
  const userId = ctx.from.id;
  const position = ctx.match[1];
  
  try {
    const user = await ctx.dbClient.query(
      'SELECT * FROM users WHERE telegram_id = $1',
      [userId]
    );
    
    if (user.rows.length === 0) {
      return ctx.reply('❌ User not found');
    }
    
    const rewards = GAME_CONFIG.RACE_REWARDS[position] || GAME_CONFIG.RACE_REWARDS.complete;
    const userId_db = user.rows[0].id;
    
    // Update user stats
    await ctx.dbClient.query(
      `UPDATE users 
       SET coins = coins + $1, stars = stars + $2, xp = xp + $3, 
           total_races = total_races + 1, wins = wins + $4
       WHERE id = $5`,
      [
        rewards.coins,
        rewards.stars,
        rewards.xp,
        position === 'win' ? 1 : 0,
        userId_db,
      ]
    );
    
    // Save race record
    await ctx.dbClient.query(
      `INSERT INTO races (user_id, coins_earned, stars_earned, xp_earned, position)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId_db, rewards.coins, rewards.stars, rewards.xp, position]
    );
    
    let message = `🏁 **Race Complete**\n\n`;
    message += `Position: ${position.toUpperCase()}\n`;
    message += `💰 +${rewards.coins} coins\n`;
    message += `⭐ +${rewards.stars} stars\n`;
    message += `📊 +${rewards.xp} XP`;
    
    await ctx.reply(message);
  } catch (error) {
    console.error('Error in handleRaceResult:', error);
    ctx.reply('❌ Failed to save race');
  }
};

const simulateRace = (duration) => {
  const positions = ['win', 'top3', 'complete'];
  const randomPos = positions[Math.floor(Math.random() * positions.length)];
  
  return {
    position: randomPos,
    speed: Math.floor(Math.random() * 150) + 80,
    distance: duration * (Math.random() * 40 + 80),
  };
};

module.exports = {
  handlePlay,
  handleRaceResult,
  simulateRace,
};
