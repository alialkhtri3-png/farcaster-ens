#!/usr/bin/env node

const Consensus=require("../consensus/ConsensusEngine");
const Election=require("../election/LeaderElection");

const engine=new Consensus();

engine.vote("sip-node-primary");
engine.vote("sip-node-secondary");

console.log("SIP Distributed Consensus");

console.log(JSON.stringify(
 engine.finalize(),
 null,
 2
));

console.log(JSON.stringify(
 Election.elect([
  "sip-node-primary",
  "sip-node-secondary"
 ]),
 null,
 2
));
