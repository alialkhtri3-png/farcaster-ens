// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../SupplyChain.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envOr("PRIVATE_KEY", uint256(0));
        
        if (deployerPrivateKey == 0) {
            // محاكاة أو مفتاح افتراضي للاختبار المحلي إذا لم يتم تحديد المفتاح بعد
            vm.startBroadcast();
        } else {
            vm.startBroadcast(deployerPrivateKey);
        }

        SupplyChain supplyChain = new SupplyChain();

        vm.stopBroadcast();
    }
}
