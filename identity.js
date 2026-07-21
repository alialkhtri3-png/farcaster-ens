const { ethers } = require("ethers");

const wallet = ethers.Wallet.createRandom();

const domain = {
  name: "Farcaster ENS Identity",
  version: "1",
  chainId: 1,
  verifyingContract: "0x0000000000000000000000000000000000000000"
};

const types = {
  Identity: [
    { name: "handle", type: "string" },
    { name: "timestamp", type: "uint256" }
  ]
};

const value = {
  handle: "ali.cb.id",
  timestamp: Math.floor(Date.now() / 1000)
};

(async () => {

const signature = await wallet.signTypedData(
  domain,
  types,
  value
);

console.log("\n📍 Address:");
console.log(wallet.address);

console.log("\n✍️ Signature:");
console.log(signature);

const recovered = ethers.verifyTypedData(
  domain,
  types,
  value,
  signature
);

console.log("\n🔎 Recovered:");
console.log(recovered);

console.log(
 recovered.toLowerCase() === wallet.address.toLowerCase()
 ? "\n✅ Identity Verified"
 : "\n❌ Verification Failed"
);

})();
