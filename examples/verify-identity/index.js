import SIPClient from "@alialkhtri3-png/sip-sdk";

const client = new SIPClient("http://localhost:3000");

async function verifyIdentity() {
  console.log("🔍 SIP Identity Verification");
  console.log("Endpoint:", client.endpoint);

  console.log({
    protocol: "SIP",
    verification: "ready"
  });
}

verifyIdentity();
