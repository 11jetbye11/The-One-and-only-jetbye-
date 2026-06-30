// src/index.js
// Jetbye Racing - Main Bot Entry Point

require('dotenv').config();
const { Telegraf } = require('telegraf');
const db = require('./db/connection');
const commands = require('./handlers/commands');
const gameLogic = require('./handlers/gameLogic');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

// Middleware
bot.use(async (ctx, next) => {
  ctx.dbClient = db;
  ctx.gameConfig = require('./utils/constants').GAME_CONFIG;
  await next();
});

// Commands
bot.command('start', commands.handleStart);
bot.command('play', gameLogic.handlePlay);
bot.command('shop', commands.handleShop);
bot.command('spin', commands.handleSpin);
bot.command('profile', commands.handleProfile);
bot.command('top', commands.handleLeaderboard);
bot.command('buyStars', commands.handleBuyStars);

// Action handlers (button clicks)
bot.action(/race_(.*)/, gameLogic.handleRaceResult);
bot.action(/buy_(.*)/, commands.handleBuyItem);
bot.action(/spin_/, commands.handleSpinAction);

// Error handling
bot.catch((err, ctx) => {
  console.error('Bot error:', err);
  ctx.reply('❌ Oops! Something went wrong. Try again!');
});

// Start bot
bot.launch(() => {
  console.log('🏎️ Jetbye Racing Bot is live!');
});

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

module.exports = bot;
