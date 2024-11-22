"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStorageAt = getStorageAt;
const toHex_js_1 = require("../../utils/encoding/toHex.js");
async function getStorageAt(client, { address, blockNumber, blockTag = 'latest', slot }) {
    const blockNumberHex = blockNumber !== undefined ? (0, toHex_js_1.numberToHex)(blockNumber) : undefined;
    const data = await client.request({
        method: 'eth_getStorageAt',
        params: [address, slot, blockNumberHex || blockTag],
    });
    return data;
}
//# sourceMappingURL=getStorageAt.js.map