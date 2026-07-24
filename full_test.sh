#!/bin/bash

RPC=http://127.0.0.1:8545
OWNER=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
HANDLER=0x70997970C51812dc3A010C7d01b50e0d17dc79C8

KEY1=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
KEY2=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d


echo "🚀 Starting Anvil"

pkill anvil 2>/dev/null

anvil > anvil.log 2>&1 &

sleep 3


echo "📦 Deploy SupplyChain"

forge script \
script/Deploy.s.sol:DeployScript \
--rpc-url $RPC \
--broadcast \
--private-key $KEY1


ADDR=$(jq -r '.transactions[0].contractAddress' \
broadcast/Deploy.s.sol/31337/run-latest.json)

echo "Contract:"
echo $ADDR


ID=$(cast keccak "shipment-001")

echo "🚚 Create shipment"

cast send \
$ADDR \
"createShipment(bytes32,address)" \
$ID \
$HANDLER \
--private-key $KEY1 \
--rpc-url $RPC


echo "🔄 Transfer custody"

cast send \
$ADDR \
"transferCustody(bytes32,address)" \
$ID \
$HANDLER \
--private-key $KEY1 \
--rpc-url $RPC


echo "✅ Deliver"

cast send \
$ADDR \
"deliverShipment(bytes32)" \
$ID \
--private-key $KEY2 \
--rpc-url $RPC


echo "📊 Final State"

cast call \
$ADDR \
"shipments(bytes32)" \
$ID \
--rpc-url $RPC
