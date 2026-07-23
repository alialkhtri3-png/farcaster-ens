const { ethers } = require("ethers");
const fetch = require("node-fetch");

async function main(){

const wallet = ethers.Wallet.createRandom();

const message = "SIP Identity Ownership Proof";

const signature = await wallet.signMessage(message);

const did = `did:ethr:base:${wallet.address}`;

const vc = {
 "@context":["https://www.w3.org/2018/credentials/v1"],
 "type":["VerifiableCredential","SIPIdentityCredential"],
 "credentialSubject":{
   "id":did,
   "wallet":wallet.address,
   "protocol":"SIP"
 }
};

const res = await fetch(
 "http://localhost:3000/api/did/register",
 {
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({
   address:wallet.address,
   did,
   credential:JSON.stringify(vc),
   signature
  })
 });

console.log(await res.json());

}

main();
