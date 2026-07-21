// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DIDRegistry {

    struct Identity {
        string did;
        address owner;
        uint256 createdAt;
        bool active;
    }

    mapping(address => Identity) public identities;

    event DIDCreated(
        address indexed owner,
        string did
    );

    function registerDID(string calldata did) external {
        identities[msg.sender] = Identity({
            did: did,
            owner: msg.sender,
            createdAt: block.timestamp,
            active: true
        });

        emit DIDCreated(msg.sender, did);
    }

    function getDID(address user)
        external
        view
        returns(
            string memory,
            bool
        )
    {
        return (
            identities[user].did,
            identities[user].active
        );
    }
}
