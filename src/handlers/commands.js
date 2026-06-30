// src/handlers/commands.js
// Command handlers for bot

const Spin = require('../models/Spin');
const { GAME_CONFIG } = require('../utils/constants');

const handleStart = async (ctx) => {
  const userId = ctx.from.id;
  
  try {
    // Check if user exists
    const result = await ctx.dbClient.query(
      'SELECT * FROM users WHERE telegram_id = $1',
      [userId]
    );
    
    if (result.rows.length === 0) {
      // Create new user
      await ctx.dbClient.query(
        `INSERT INTO users (telegram_id, first_name, username, coins, stars)
         VALUES ($1, $2, $3, $4, $5)`,
        [userId, ctx.from.first_name, ctx.from.username || 'unknown', 1000, 5]
      );
    }
    
    const keyboard = {
      inline_keyboard: [
        [{ text: '🏎️ Play Race', callback_data: 'play' }],
        [{ text: '🛍️ Shop', callback_data: 'shop' }],
        [{ text: '🎰 Spin Wheel', callback_data: 'spin' }],
        [{ text: '⭐ Buy Stars', callback_data: 'buyStars' }],
        [{ text: '👤 Profile', callback_data: 'profile' }],
        [{ text: '🏆 Leaderboard', callback_data: 'top' }],
      ],
    };
    
    await ctx.reply(
      '🏎️ Welcome to Jetbye Racing!\n\n' +
      'Race fast, earn coins & stars, unlock items, and dominate the leaderboard!\n\n' +
      '💡 Free players: Race & spin daily\n' +
      '⭐ Paying players: Unlock premium items & cosmetics\n\n' +
      'Ready to race?',
      keyboard
    );
  } catch (error) {
    console.error('Error in handleStart:', error);
    ctx.reply('❌ Something went wrong!');
  }
};

const handleShop = async (ctx) => {
  const keyboard = {
    inline_keyboard: [
      [{ text: '🚗 Vehicles', callback_data: 'shop_vehicles' }],
      [{ text: '🎨 Cosmetics', callback_data: 'shop_cosmetics' }],
      [{ text: '⚡ Power-ups', callback_data: 'shop_powerups' }],
      [{ text: '⬅️ Back', callback_data: 'back' }],
    ],
  };
  
  await ctx.editMessageText('🛍️ What would you like to buy?', { reply_markup: keyboard });
};

const handleSpin = async (ctx) => {
  const userId = ctx.from.id;
  
  try {
    const user = await ctx.dbClient.query(
      'SELECT * FROM users WHERE telegram_id = $1',
      [userId]
    );
    
    if (user.rows.length === 0) {
      return ctx.reply('❌ User not found');
    }
    
    const spinResult = Spin.spinWheel();
    const reward = spinResult.reward;
    
    // Check if multiplier was hit
    let finalReward = reward;
    if (reward.reward === 'multiplier_2x') {
      // Next spin gets 2x
      await ctx.reply('🎉 You got 2x Multiplier! Your next spin rewards are doubled!');
      return;
    }
    
    // Save spin to database
    await ctx.dbClient.query(
      `INSERT INTO spins (user_id, tier, reward_type, reward_value)
       VALUES ($1, $2, $3, $4)`,
      [user.rows[0].id, spinResult.tier, finalReward.reward, JSON.stringify(finalReward)]
    );
    
    // Display result
    let message = `🎰 You spun and got: **${spinResult.tier.toUpperCase()}**\n\n`;
    
    if (finalReward.reward === 'coins') {
      message += `💰 +${finalReward.amount} Coins!`;
    } else if (finalReward.reward === 'stars') {
      message += `⭐ +${finalReward.amount} Stars!`;
    } else if (finalReward.reward === 'cosmetic') {
      message += `🎨 New cosmetic: ${finalReward.item}!`;
    } else if (finalReward.reward === 'vehicle') {
      message += `🚗 New vehicle: ${finalReward.item}!`;
    }
    
    await ctx.reply(message);
  } catch (error) {
    console.error('Error in handleSpin:', error);
    ctx.reply('❌ Spin failed!');
  }
};

const handleBuyStars = async (ctx) => {
  const keyboard = {
    inline_keyboard: GAME_CONFIG.STAR_PACKS.map((pack) => [
      { text: `⭐ ${pack.stars} stars - $${pack.price}`, callback_data: `buy_stars_${pack.stars}` },
    ]).concat([[{ text: '⬅️ Back', callback_data: 'back' }]]),
  };
  
  await ctx.editMessageText('⭐ Buy Stars\n\nSelect a pack:', { reply_markup: keyboard });
};

const handleProfile = async (ctx) => {
  const userId = ctx.from.id;
  
  try {
    const result = await ctx.dbClient.query(
      'SELECT * FROM users WHERE telegram_id = $1',
      [userId]
    );
    
    if (result.rows.length === 0) {
      return ctx.reply('❌ Profile not found');
    }
    
    const user = result.rows[0];
    const message = `
👤 **Profile**

🏎️ Level: ${user.level}
🏁 Races: ${user.total_races}
🥇 Wins: ${user.wins}
💰 Coins: ${user.coins}
⭐ Stars: ${user.stars}
📊 XP: ${user.xp}
    `;
    
    await ctx.reply(message.trim());
  } catch (error) {
    console.error('Error in handleProfile:', error);
    ctx.reply('❌ Failed to load profile');
  }
};

const handleLeaderboard = async (ctx) => {
  try {
    const result = await ctx.dbClient.query(
      `SELECT first_name, wins, xp FROM users 
       ORDER BY (wins * 10 + xp) DESC LIMIT 10`
    );
    
    let message = '🏆 **Global Leaderboard**\n\n';
    result.rows.forEach((user, i) => {
      message += `${i + 1}. ${user.first_name} - ${user.wins} wins\n`;
    });
    
    await ctx.reply(message);
  } catch (error) {
    console.error('Error in handleLeaderboard:', error);
    ctx.reply('❌ Failed to load leaderboard');
  }
};

const handleBuyItem = async (ctx) => {
  // Implement payment flow
  await ctx.reply('💳 Payment processing...');
};

module.exports = {
  handleStart,
  handleShop,
  handleSpin,
  handleBuyStars,
  handleProfile,
  handleLeaderboard,
  handleBuyItem,
};
