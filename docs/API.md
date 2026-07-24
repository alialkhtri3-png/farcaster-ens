# Sovereign Identity Protocol (SIP) API

## Identity Score

GET /api/identity-score/:address

Example:

curl http://localhost:3000/api/identity-score/0xADDRESS

Response:

{
 identityScore: 87,
 label:"ACTIVE",
 risk:"LOW"
}

---

## Reputation

GET /api/reputation/:address

---

## Graph Intelligence

GET /api/graph/:address

---

## Behavior Intelligence

GET /api/behavior/:address

---

## Authentication

POST /api/auth/verify

Features:

- Wallet signature verification
- DID generation
- Session creation
- Audit logging
- Behavior tracking
