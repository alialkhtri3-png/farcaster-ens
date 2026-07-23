// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SIPIdentityRegistry {

    struct Identity {
        string did;
        bytes32 identityHash;
        uint256 createdAt;
        bool active;
    }

    mapping(address => Identity) private identities;

    event IdentityRegistered(
        address indexed wallet,
        string did,
        bytes32 identityHash
    );

    function registerIdentity(
        string memory did,
        bytes32 identityHash
    ) external {

        identities[msg.sender] = Identity(
            did,
            identityHash,
            block.timestamp,
            true
        );

        emit IdentityRegistered(
            msg.sender,
            did,
            identityHash
        );
    }


    function resolveIdentity(
        address wallet
    )
    external
    view
    returns(
        string memory,
        bytes32,
        uint256,
        bool
    ){

        Identity memory id = identities[wallet];

        return(
            id.did,
            id.identityHash,
            id.createdAt,
            id.active
        );
    }
}
