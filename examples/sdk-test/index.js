import SIPClient from "@alialkhtri3-png/sip-sdk";

const sip = new SIPClient(
  "http://localhost:3000"
);

const wallet = "0x85C6CE94B0f0D3AF06e3c35280497Aa9408917e5";

const identity = await sip.identity(wallet);

console.log("🆔 SIP Identity");
console.log(JSON.stringify(identity, null, 2));
