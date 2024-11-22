"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMainContractAddress = getMainContractAddress;
async function getMainContractAddress(client) {
    const address = await client.request({ method: 'zks_getMainContract' });
    return address;
}
//# sourceMappingURL=getMainContractAddress.js.map