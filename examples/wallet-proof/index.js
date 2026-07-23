import { ethers } from "ethers";
import SIPClient from "@alialkhtri3-png/sip-sdk";

const client = new SIPClient("http://localhost:3000");

async function walletProof() {
  const wallet = ethers.Wallet.createRandom();

  const message = "SIP Wallet Ownership Proof";

  const signature = await wallet.signMessage(message);

  console.log("🔐 Wallet Proof");
  console.log({
    address: wallet.address,
    message,
    signature
  });

  console.log("SIP Client:", client.endpoint);
}

walletProof();
