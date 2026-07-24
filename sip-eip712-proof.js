const { Wallet } = require("ethers");

async function createProof(){

const wallet = new Wallet(process.env.PRIVATE_KEY);

const domain = {
 name:"Sovereign Identity Protocol",
 version:"1",
 chainId:1,
 verifyingContract:"0x00000000fc5110de311d17466426d829428d5a32"
};

const types={
 IdentityClaim:[
  {name:"address",type:"address"},
  {name:"username",type:"string"},
  {name:"timestamp",type:"uint256"}
 ]
};

const message={
 address:wallet.address,
 username:"yourname.eth",
 timestamp:Math.floor(Date.now()/1000)
};

const signature =
 await wallet.signTypedData(
  domain,
  types,
  message
 );

console.log(JSON.stringify({
 protocol:"SIP",
 version:"V50",
 type:"EIP712_IDENTITY_PROOF",
 address:wallet.address,
 username:message.username,
 timestamp:message.timestamp,
 signature
},null,2));

}

createProof();
