class IdentityEconomy {
  constructor(){
    this.accounts = [];
  }

  register(id, score){
    this.accounts.push({
      id,
      score,
      rewards: score * 10
    });
  }

  status(){
    return {
      economy:"SIP Identity Economy v28.0.0",
      accounts:this.accounts.length,
      state:"active"
    };
  }

  list(){
    return this.accounts;
  }
}

module.exports = IdentityEconomy;
