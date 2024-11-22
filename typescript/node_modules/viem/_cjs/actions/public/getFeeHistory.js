"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeeHistory = getFeeHistory;
const toHex_js_1 = require("../../utils/encoding/toHex.js");
const feeHistory_js_1 = require("../../utils/formatters/feeHistory.js");
async function getFeeHistory(client, { blockCount, blockNumber, blockTag = 'latest', rewardPercentiles, }) {
    const blockNumberHex = blockNumber ? (0, toHex_js_1.numberToHex)(blockNumber) : undefined;
    const feeHistory = await client.request({
        method: 'eth_feeHistory',
        params: [
            (0, toHex_js_1.numberToHex)(blockCount),
            blockNumberHex || blockTag,
            rewardPercentiles,
        ],
    }, { dedupe: Boolean(blockNumberHex) });
    return (0, feeHistory_js_1.formatFeeHistory)(feeHistory);
}
//# sourceMappingURL=getFeeHistory.js.map