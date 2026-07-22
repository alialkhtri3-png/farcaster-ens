// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CredentialRegistry {

    struct Credential {
        bytes32 hash;
        address issuer;
        uint256 timestamp;
        bool valid;
    }

    mapping(bytes32 => Credential) public credentials;

    event CredentialIssued(
        bytes32 indexed id,
        bytes32 hash,
        address issuer
    );


    function issueCredential(
        bytes32 id,
        bytes32 hash
    ) external {

        credentials[id] = Credential({
            hash: hash,
            issuer: msg.sender,
            timestamp: block.timestamp,
            valid: true
        });

        emit CredentialIssued(
            id,
            hash,
            msg.sender
        );
    }


    function verifyCredential(
        bytes32 id,
        bytes32 hash
    )
    external
    view
    returns(bool)
    {
        Credential memory c = credentials[id];

        return (
            c.valid &&
            c.hash == hash
        );
    }
}
