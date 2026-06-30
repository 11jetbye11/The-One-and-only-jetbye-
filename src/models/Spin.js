// src/models/Spin.js
// Lucky wheel spin logic

const { GAME_CONFIG, SPIN_TIERS } = require('../utils/constants');

class Spin {
  static getTierByProbability() {
    const rand = Math.random() * 100;
    
    if (rand < SPIN_TIERS.common) return 'common';
    if (rand < SPIN_TIERS.common + SPIN_TIERS.rare) return 'rare';
    if (rand < SPIN_TIERS.common + SPIN_TIERS.rare + SPIN_TIERS.epic) return 'epic';
    return 'legendary';
  }

  static getRewardFromTier(tier) {
    const rewards = GAME_CONFIG.SPIN_REWARDS[tier];
    
    // Weighted random selection
    const totalWeight = rewards.reduce((sum, r) => sum + r.weight, 0);
    let rand = Math.random() * totalWeight;
    
    for (const reward of rewards) {
      rand -= reward.weight;
      if (rand <= 0) {
        return { ...reward, tier };
      }
    }
    
    return rewards[0];
  }

  static spinWheel() {
    const tier = this.getTierByProbability();
    const reward = this.getRewardFromTier(tier);
    
    return {
      success: true,
      tier,
      reward,
      timestamp: new Date(),
    };
  }

  static applyMultiplier(reward, multiplier = 2) {
    if (reward.reward === 'coins' || reward.reward === 'stars') {
      return {
        ...reward,
        amount: reward.amount * multiplier,
        multiplied: true,
      };
    }
    
    // For items, return a better rarity
    if (reward.reward === 'cosmetic') {
      return {
        ...reward,
        item: this.upgradeItem(reward.item),
        upgraded: true,
      };
    }
    
    return reward;
  }

  static upgradeItem(itemId) {
    // Simple upgrade logic: if rare, make epic
    const upgrades = {
      red_paint: 'neon_glow',
      neon_glow: 'gold_wheels',
      speed_demon: 'legend',
    };
    
    return upgrades[itemId] || itemId;
  }
}

module.exports = Spin;
