const hre = require("hardhat");

async function main(){

 const SIP = await hre.ethers.getContractFactory(
   "SIPIdentityRegistry"
 );

 const sip = await SIP.deploy();

 await sip.waitForDeployment();

 console.log(
  "SIP Registry:",
  await sip.getAddress()
 );
}

main();
