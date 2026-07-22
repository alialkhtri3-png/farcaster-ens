// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface DIDRegistryInterface {

    function registerDID(
        string calldata did
    ) external;

    function resolveDID(
        address owner
    ) external view returns(string memory);

}
