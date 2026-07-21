// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SupplyChain {
    enum Status { Created, InTransit, Delivered, Cancelled }

    struct Shipment {
        address origin;
        address handler;
        address destination;
        Status status;
        uint256 timestamp;
    }

    mapping(bytes32 => Shipment) public shipments;

    event ShipmentCreated(bytes32 indexed shipmentId, address indexed origin, address indexed destination);
    event CustodyTransferred(bytes32 indexed shipmentId, address indexed newHandler);
    event ShipmentDelivered(bytes32 indexed shipmentId);
    event ShipmentCancelled(bytes32 indexed shipmentId);

    function createShipment(bytes32 shipmentId, address destination) external {
        require(shipments[shipmentId].origin == address(0), "Shipment already exists");
        
        shipments[shipmentId] = Shipment({
            origin: msg.sender,
            handler: msg.sender,
            destination: destination,
            status: Status.Created,
            timestamp: block.timestamp
        });

        emit ShipmentCreated(shipmentId, msg.sender, destination);
    }

    function transferCustody(bytes32 shipmentId, address newHandler) external {
        Shipment storage shipment = shipments[shipmentId];
        require(shipment.origin != address(0), "Shipment does not exist");
        require(msg.sender == shipment.handler, "Not current handler");
        require(shipment.status == Status.InTransit || shipment.status == Status.Created, "Invalid status");

        shipment.handler = newHandler;
        shipment.status = Status.InTransit;
        shipment.timestamp = block.timestamp;

        emit CustodyTransferred(shipmentId, newHandler);
    }

    function deliverShipment(bytes32 shipmentId) external {
        Shipment storage shipment = shipments[shipmentId];
        require(shipment.origin != address(0), "Shipment does not exist");
        require(msg.sender == shipment.handler || msg.sender == shipment.destination, "Unauthorized");
        require(shipment.status == Status.InTransit, "Must be in transit to deliver");

        shipment.status = Status.Delivered;
        shipment.timestamp = block.timestamp;

        emit ShipmentDelivered(shipmentId);
    }
}
