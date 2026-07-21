// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../SupplyChain.sol";

contract SupplyChainTest is Test {
    SupplyChain supplyChain;
    bytes32 shipmentId = keccak256("SHIPMENT_001");
    address destination = address(0x2);

    function setUp() public {
        supplyChain = new SupplyChain();
    }

    function testCreateShipment() public {
        supplyChain.createShipment(shipmentId, destination);
        (address origin, address handler, address dest, SupplyChain.Status status, ) = supplyChain.shipments(shipmentId);
        assertEq(origin, address(this));
        assertEq(handler, address(this));
        assertEq(dest, destination);
        assertEq(uint(status), uint(SupplyChain.Status.Created));
    }

    function testTransferCustody() public {
        supplyChain.createShipment(shipmentId, destination);
        address newHandler = address(0x3);
        supplyChain.transferCustody(shipmentId, newHandler);
        (, address handler, , SupplyChain.Status status, ) = supplyChain.shipments(shipmentId);
        assertEq(handler, newHandler);
        assertEq(uint(status), uint(SupplyChain.Status.InTransit));
    }
}
