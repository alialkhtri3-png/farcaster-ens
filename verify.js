const { ethers } = require("ethers");

const address = "0xf17506CE67b5F1B3e476Dfc5bB33f8c60dF7f058";

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
  timestamp: 1780000000
};

const signature = "0x320f4c38e65cbbc16ed407a92e9ce4a9c6895b2cc2df893b3c03903f944f3e0e14860a1858c50f4b17febebe24e7642cd8898992deb8f6a04791eb0958fd86eb1b";

const recovered = ethers.verifyTypedData(
  domain,
  types,
  value,
  signature
);

console.log("Signer:", recovered);
console.log(
  recovered.toLowerCase() === address.toLowerCase()
    ? "✅ Signature Verified"
    : "❌ Invalid Signature"
);
