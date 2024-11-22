"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBridgehubContractAddress = getBridgehubContractAddress;
async function getBridgehubContractAddress(client) {
    const result = await client.request({ method: 'zks_getBridgehubContract' });
    return result;
}
//# sourceMappingURL=getBridgehubContractAddress.js.map