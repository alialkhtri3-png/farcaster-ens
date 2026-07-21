const { ethers } = require("ethers");
const fs = require("fs");

const signature =
"0xdec089aa69f3cdc95d5ff3cb2abf6fce06a96ec92599f9704c617ef3be408238172d9b604f3bc25aa99a39005c767322e563d242f1fb7a4bcb84477d9ff227181c";


const expectedSigner =
"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";


const vc = fs.readFileSync(
"shipment_vc.json",
"utf8"
);


const hash = ethers.keccak256(
ethers.toUtf8Bytes(vc)
);


const recovered =
ethers.verifyMessage(
ethers.getBytes(hash),
signature
);


console.log("Hash:");
console.log(hash);


console.log("Recovered signer:");
console.log(recovered);


console.log(
"Valid:",
recovered.toLowerCase()
===
expectedSigner.toLowerCase()
);
