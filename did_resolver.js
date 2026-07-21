const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(
  "http://127.0.0.1:8545"
);

const contract = new ethers.Contract(
  "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
  [
    "function getDID(address) view returns(tuple(address controller,string did,bytes32 credentialRoot,uint256 createdAt,bool active))"
  ],
  provider
);

async function main(){

const wallet =
"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

const identity =
await contract.getDID(wallet);

console.log({
 DID: identity.did,
 controller: identity.controller,
 credentialRoot: identity.credentialRoot,
 createdAt: identity.createdAt.toString(),
 active: identity.active
});

}

main();
