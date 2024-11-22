"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultBridgeAddresses = getDefaultBridgeAddresses;
async function getDefaultBridgeAddresses(client) {
    const addresses = await client.request({ method: 'zks_getBridgeContracts' });
    return {
        erc20L1: addresses.l1Erc20DefaultBridge,
        sharedL1: addresses.l1SharedDefaultBridge,
        sharedL2: addresses.l2SharedDefaultBridge,
    };
}
//# sourceMappingURL=getDefaultBridgeAddresses.js.map