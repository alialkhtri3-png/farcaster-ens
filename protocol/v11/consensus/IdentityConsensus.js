class IdentityConsensus {
  validate(identity){
    return {
      verified:true,
      score:identity.score || 0
    };
  }
}

module.exports = IdentityConsensus;
