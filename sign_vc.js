const { ethers } = require("ethers");
const fs = require("fs");

const privateKey =
"0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const wallet = new ethers.Wallet(privateKey);

const vc = fs.readFileSync(
"shipment_vc.json",
"utf8"
);

async function main(){

const hash = ethers.keccak256(
ethers.toUtf8Bytes(vc)
);

const signature =
await wallet.signMessage(
ethers.getBytes(hash)
);

console.log("Signer:");
console.log(wallet.address);

console.log("Hash:");
console.log(hash);

console.log("Signature:");
console.log(signature);

}

main();
