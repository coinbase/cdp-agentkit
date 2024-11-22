"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseTokenL1Address = getBaseTokenL1Address;
async function getBaseTokenL1Address(client) {
    const result = await client.request({ method: 'zks_getBaseTokenL1Address' });
    return result;
}
//# sourceMappingURL=getBaseTokenL1Address.js.map