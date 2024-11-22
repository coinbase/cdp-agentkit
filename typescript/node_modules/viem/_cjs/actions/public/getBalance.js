"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalance = getBalance;
const toHex_js_1 = require("../../utils/encoding/toHex.js");
async function getBalance(client, { address, blockNumber, blockTag = 'latest' }) {
    const blockNumberHex = blockNumber ? (0, toHex_js_1.numberToHex)(blockNumber) : undefined;
    const balance = await client.request({
        method: 'eth_getBalance',
        params: [address, blockNumberHex || blockTag],
    });
    return BigInt(balance);
}
//# sourceMappingURL=getBalance.js.map