class RewardEngine {
  calculate(score){
    return {
      reward: score * 10,
      model:"SIP Contribution Reward"
    };
  }
}

module.exports = RewardEngine;
