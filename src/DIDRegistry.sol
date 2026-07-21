// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DIDRegistry {

    struct DIDDocument {
        address controller;
        string did;
        bytes32 credentialRoot;
        uint256 createdAt;
        bool active;
    }

    mapping(address => DIDDocument) public identities;

    event DIDCreated(
        address indexed controller,
        string did
    );

    function createDID(
        string memory did,
        bytes32 credentialRoot
    ) external {

        identities[msg.sender] = DIDDocument(
            msg.sender,
            did,
            credentialRoot,
            block.timestamp,
            true
        );

        emit DIDCreated(
            msg.sender,
            did
        );
    }

    function getDID(address user)
        external
        view
        returns(DIDDocument memory)
    {
        return identities[user];
    }
}
