#!/bin/bash

echo "🚀 Sovereign Identity Engine V12.2 Base Sepolia Deployment"

forge build

echo "Deploy DIDRegistry"
forge script script/Deploy.s.sol \
--rpc-url $BASE_SEPOLIA_RPC \
--broadcast \
--verify
