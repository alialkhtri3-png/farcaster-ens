const { ethers } = require("ethers");

const wallet = ethers.Wallet.createRandom();

const message = "SIP Identity Ownership Proof";

async function main(){

const signature = await wallet.signMessage(message);

const recovered = ethers.verifyMessage(
 message,
 signature
);

console.log({
 address: wallet.address,
 message,
 signature,
 recovered,
 valid: recovered.toLowerCase() === wallet.address.toLowerCase()
});

}

main();
