"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockTransactionCount = getBlockTransactionCount;
const fromHex_js_1 = require("../../utils/encoding/fromHex.js");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
async function getBlockTransactionCount(client, { blockHash, blockNumber, blockTag = 'latest', } = {}) {
    const blockNumberHex = blockNumber !== undefined ? (0, toHex_js_1.numberToHex)(blockNumber) : undefined;
    let count;
    if (blockHash) {
        count = await client.request({
            method: 'eth_getBlockTransactionCountByHash',
            params: [blockHash],
        }, { dedupe: true });
    }
    else {
        count = await client.request({
            method: 'eth_getBlockTransactionCountByNumber',
            params: [blockNumberHex || blockTag],
        }, { dedupe: Boolean(blockNumberHex) });
    }
    return (0, fromHex_js_1.hexToNumber)(count);
}
//# sourceMappingURL=getBlockTransactionCount.js.map