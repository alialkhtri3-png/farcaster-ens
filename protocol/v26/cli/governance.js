const Governance=require("../governance/GovernanceEngine");

const gov=new Governance();

gov.createProposal(
 "SIP-026",
 "Enable autonomous network governance"
);

gov.vote(
 "sip-node-primary",
 "SIP-026",
 "approve"
);

console.log("SIP Autonomous Governance");

console.log(
 JSON.stringify(gov.status(),null,2)
);

console.log(
 JSON.stringify(gov.proposals,null,2)
);

console.log(
 JSON.stringify(gov.votes,null,2)
);
