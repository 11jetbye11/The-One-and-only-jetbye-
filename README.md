# Jetbye Racing 🏎️⭐

A high-octane Telegram racing game. Buy stars, collect powerful items, spin for upgrades, and dominate the leaderboards!

## 🎮 Core Features

### Racing & Progression
- Fast-paced mini-racing games
- Earn stars & coins per race
- Daily challenges & races
- Leaderboard tracking

### ⭐ Star System (Premium Currency)
- Earn free stars daily (limited)
- Buy star packs via Stripe payment
- Use stars to unlock exclusive items
- Star-only shop items (cosmetics, rare vehicles)

### 🛍️ Shop System
- **Vehicle Upgrades** – Better speed, handling, nitro
- **Cosmetics** – Paint jobs, wheels, custom decals
- **Power-ups** – Speed boost, shield, magnetism
- **Consumables** – Race boosters, extra fuel
- Prices in both coins (free earned) & stars (paid)

### 🎰 Spin Mechanic (Lucky Wheel)
- Spin daily for free (or pay stars for extra spins)
- Reward tiers:
  - Common: coins, cosmetics
  - Rare: exclusive items
  - Epic: high-value stars
  - Legendary: 2x multiplier chance or item upgrade
- **Doubling Feature**: Land on 2x = double your next item rewards or upgrade rarity

### 🏆 Leaderboards
- Global rankings (all-time & weekly)
- Country/Regional leaderboards (Wales featured)
- Friend rankings
- Seasonal competitions

### 💰 Light Monetization
- **Free players**: Earn coins, limited daily stars
- **Paying players**: Buy star packs, premium battle pass
- **Battle Pass**: Seasonal rewards & cosmetics
- Non-P2W: Skill-based racing, pay for cosmetics/convenience

## Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- Telegram Bot Token
- Stripe account (for payments)

### Installation

```bash
npm install
cp .env.example .env
# Edit .env with your credentials
npm run migrate
npm start
```

### Development

```bash
npm run dev
```

## How to Play

1. **Start** → `/start` to create account
2. **Race** → `/play` to race, earn coins & stars
3. **Shop** → Buy vehicles & cosmetics
4. **Spin** → Daily free spin + earn rewards
5. **Leaderboard** → `/top` to see rankings
6. **(Optional)** Buy star packs for premium items

## Game Balance

| Item | Cost | Earned |
|------|------|--------|
| Common cosmetic | 500 coins | Daily |
| Rare vehicle | 50 stars | Spin/shop |
| Star pack (100) | $8.99 | Purchase |
| Daily free stars | 5 stars | Claim |
| Spin (free) | 1 per day | Claim |

## Project Structure

```
src/
  index.js                    Main bot
  db/
    connection.js             PostgreSQL setup
    schema.sql                Database schema
    migrations/               Schema updates
  
  handlers/
    commands.js               /start, /play, /shop, /spin
    gameLogic.js              Race mechanics
    shop.js                   Shop & purchases
    spin.js                   Lucky wheel logic
    payments.js               Stripe integration
  
  models/
    User.js                   Player profile & stats
    Vehicle.js                Vehicle data
    Inventory.js              Player items
    Leaderboard.js            Ranking system
    Spin.js                   Spin wheel logic
  
  utils/
    constants.js              Game balance, prices
    i18n.js                   English & Welsh
    rewards.js                Spin tables, drops

scripts/
  migrate.js                  Database setup
  seed.js                     Test data
```

## Environment Variables

```
TELEGRAM_TOKEN=your_bot_token
DATABASE_URL=postgresql://user:pass@localhost/jetbye_racing
STRIPE_KEY=pk_test_xxxxx
STRIPE_SECRET=sk_test_xxxxx
NODE_ENV=development
PORT=3000
```

## API Endpoints

- `POST /api/user/create` – New player
- `POST /api/race/complete` – Finish race
- `GET /api/shop/items` – Get shop inventory
- `POST /api/shop/buy` – Purchase item
- `POST /api/spin` – Spin wheel
- `POST /api/payment/checkout` – Buy stars
- `GET /api/leaderboard` – Top players

## Monetization Strategy

✅ **Free players can enjoy fully** (no ads, no paywalls)
✅ **Cosmetics** are the main revenue (not P2W)
✅ **Stars** speed up convenience (optional)
✅ **Battle Pass** for engaged players ($4.99/season)

## License

MIT – Built for speed 🏁

## Support

Issues? Questions? Open a GitHub issue!
