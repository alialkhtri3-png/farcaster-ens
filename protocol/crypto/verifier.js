import { ethers } from "ethers";

export function verifySignature(message, signature) {
  return ethers.verifyMessage(
    message,
    signature
  );
}

export function verifyTypedData(domain, types, value, signature) {
  return ethers.verifyTypedData(
    domain,
    types,
    value,
    signature
  );
}
