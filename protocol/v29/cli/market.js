#!/usr/bin/env node
const market=require("../marketplace/IdentityMarket");

market.register({
 id:"identity-asset-001",
 type:"verified-identity",
 score:100
});

console.log("SIP Identity Marketplace");
console.log(JSON.stringify(market.status(),null,2));
console.log(JSON.stringify(market.assets,null,2));
