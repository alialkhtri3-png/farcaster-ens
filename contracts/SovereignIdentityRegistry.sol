// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SovereignIdentityRegistry {

    struct Identity {
        bytes32 credentialRoot;
        uint256 score;
        bool active;
        uint256 createdAt;
    }

    mapping(address => Identity) public identities;

    event IdentityRegistered(
        address indexed wallet,
        bytes32 credentialRoot,
        uint256 score
    );


    function registerIdentity(
        bytes32 root,
        uint256 score
    ) external {

        identities[msg.sender] = Identity(
            root,
            score,
            true,
            block.timestamp
        );

        emit IdentityRegistered(
            msg.sender,
            root,
            score
        );
    }


    function verify(address wallet)
        external
        view
        returns(
            bytes32,
            uint256,
            bool
        )
    {
        Identity memory id = identities[wallet];

        return(
            id.credentialRoot,
            id.score,
            id.active
        );
    }
}
