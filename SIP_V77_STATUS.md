# Sovereign Identity Engine V77

Status: ONLINE ✅

Architecture:
Express API -> ethers.js -> SIPIdentityRegistry -> EVM

Network:
Anvil Local EVM
Chain ID: 31337

Contract:
SIPIdentityRegistry

Functions:
- registerIdentity(string,bytes32)
- resolveIdentity(address)

API:
POST /api/did/register-chain
GET /did/:address

Completed:
✅ Contract deployed
✅ API connected
✅ On-chain registration
✅ Identity resolution

Next:
- DID Document
- EIP-712
- Verifiable Credentials
- Base deployment
