"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGasPrice = getGasPrice;
async function getGasPrice(client) {
    const gasPrice = await client.request({
        method: 'eth_gasPrice',
    });
    return BigInt(gasPrice);
}
//# sourceMappingURL=getGasPrice.js.map