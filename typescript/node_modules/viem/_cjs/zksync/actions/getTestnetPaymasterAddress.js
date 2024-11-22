"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestnetPaymasterAddress = getTestnetPaymasterAddress;
async function getTestnetPaymasterAddress(client) {
    const result = await client.request({ method: 'zks_getTestnetPaymaster' });
    return result;
}
//# sourceMappingURL=getTestnetPaymasterAddress.js.map