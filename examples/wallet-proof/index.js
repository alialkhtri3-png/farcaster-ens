import { ethers } from "ethers";
import SIPClient from "@alialkhtri3-png/sip-sdk";

const endpoint = "http://localhost:3000";
const client = new SIPClient(endpoint);

async function walletProof() {
  const wallet = ethers.Wallet.createRandom();

  const message = "SIP Sovereign Identity Proof";

  const signature = await wallet.signMessage(message);

  const recovered = ethers.verifyMessage(
    message,
    signature
  );

  console.log("🔐 SIP Wallet Proof");
  console.log({
    address: wallet.address,
    recovered,
    valid: recovered === wallet.address,
    signature
  });

  console.log("🚀 Sending identity request...");

  try {
    const response = await fetch(
      `${endpoint}/api/identity`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          address: wallet.address,
          message,
          signature
        })
      }
    );

    const data = await response.json();

    console.log("🆔 Identity Engine Response:");
    console.log(data);

  } catch (error) {
    console.log(
      "Identity Engine unavailable:",
      error.message
    );
  }

  console.log("SIP Client:", client.endpoint);
}

walletProof();
