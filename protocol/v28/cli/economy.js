#!/usr/bin/env node

const EconomyEngine=require("../economy/EconomyEngine");

const economy=new EconomyEngine();

economy.addAccount({
 id:"sip-node-primary"
});

console.log("SIP Identity Economy");
console.log(JSON.stringify(economy.status(),null,2));
console.log(JSON.stringify(economy.list(),null,2));

console.log(JSON.stringify({
 reward:1000,
 model:"SIP Contribution Reward"
},null,2));
