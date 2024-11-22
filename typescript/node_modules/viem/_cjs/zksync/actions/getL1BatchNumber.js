"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getL1BatchNumber = getL1BatchNumber;
async function getL1BatchNumber(client) {
    const result = await client.request({ method: 'zks_L1BatchNumber' });
    return result;
}
//# sourceMappingURL=getL1BatchNumber.js.map