"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlobBaseFee = getBlobBaseFee;
async function getBlobBaseFee(client) {
    const baseFee = await client.request({
        method: 'eth_blobBaseFee',
    });
    return BigInt(baseFee);
}
//# sourceMappingURL=getBlobBaseFee.js.map