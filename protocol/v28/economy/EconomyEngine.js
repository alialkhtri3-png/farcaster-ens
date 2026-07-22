class EconomyEngine {
  constructor(){
    this.accounts=[];
  }

  addAccount(node){
    this.accounts.push({
      id: node.id,
      score:100,
      rewards:1000
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

module.exports = EconomyEngine;
