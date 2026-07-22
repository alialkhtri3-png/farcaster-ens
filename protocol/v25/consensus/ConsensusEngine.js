class ConsensusEngine {
  constructor(){
    this.votes=[];
    this.state="initializing";
  }

  vote(node){
    this.votes.push(node);
  }

  finalize(){
    this.state="confirmed";
    return {
      consensus:"SIP Consensus v25.0.0",
      votes:this.votes.length,
      state:this.state
    };
  }
}

module.exports=ConsensusEngine;
