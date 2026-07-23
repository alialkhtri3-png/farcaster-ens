const { ethers } = require("ethers");

async function main(){

  const wallet = ethers.Wallet.createRandom();

  const did = `did:ethr:base:${wallet.address}`;

  const credential = {
    "@context":[
      "https://www.w3.org/2018/credentials/v1"
    ],
    "type":[
      "VerifiableCredential",
      "SIPIdentityCredential"
    ],
    "issuer":"Sovereign Identity Protocol",
    "credentialSubject":{
      "id":did,
      "wallet":wallet.address,
      "protocol":"SIP"
    },
    "issuanceDate":new Date().toISOString()
  };

  const payload = JSON.stringify(credential, Object.keys(credential).sort());

  const signature = await wallet.signMessage(payload);

  const vc = {
    ...credential,
    proof:{
      type:"EcdsaSecp256k1RecoverySignature",
      created:new Date().toISOString(),
      verificationMethod:`${did}#key-1`,
      proofPurpose:"authentication",
      signatureValue:signature
    }
  };

  console.log(JSON.stringify({
    wallet:wallet.address,
    did,
    vc
  },null,2));
}

main();
