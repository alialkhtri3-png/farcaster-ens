import { ethers } from "ethers";
import SIPClient from "@alialkhtri3-png/sip-sdk";

const endpoint = "http://localhost:3000";
const client = new SIPClient(endpoint);

async function registerIdentity() {

  const wallet = ethers.Wallet.createRandom();

  const did = `did:ethr:base:${wallet.address}`;

  const credential = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1"
    ],
    type: [
      "VerifiableCredential",
      "SIPIdentityCredential"
    ],
    issuer: "Sovereign Identity Protocol",
    credentialSubject: {
      id: did,
      wallet: wallet.address,
      protocol: "SIP"
    },
    issuanceDate: new Date().toISOString()
  };

  const message = JSON.stringify(credential);

  const signature = await wallet.signMessage(message);

  const recovered = ethers.verifyMessage(
    message,
    signature
  );

  console.log("🆔 SIP DID Identity");

  console.log({
    wallet: wallet.address,
    did,
    verified:
      recovered === wallet.address
  });


  console.log("🎫 Verifiable Credential");

  console.log(
    JSON.stringify(
      credential,
      null,
      2
    )
  );


  try {

    const response = await fetch(
      `${endpoint}/api/identity`,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          address:wallet.address,
          did,
          credential,
          signature
        })
      }
    );


    const result = await response.json();

    console.log("🚀 Engine Result");

    console.log(result);


  } catch(e){

    console.log(
      "Engine offline:",
      e.message
    );

  }

  console.log(
    "SIP Endpoint:",
    client.endpoint
  );

}


registerIdentity();
