class VotingEngine {
 vote(proposal){
  return {
   proposal,
   result:"recorded",
   protocol:"SIP"
  };
 }
}

module.exports=VotingEngine;
