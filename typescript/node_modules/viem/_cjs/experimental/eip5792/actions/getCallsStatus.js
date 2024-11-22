"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallsStatus = getCallsStatus;
const fromHex_js_1 = require("../../../utils/encoding/fromHex.js");
const transactionReceipt_js_1 = require("../../../utils/formatters/transactionReceipt.js");
async function getCallsStatus(client, parameters) {
    const { id } = parameters;
    const { receipts, status } = await client.request({
        method: 'wallet_getCallsStatus',
        params: [id],
    });
    return {
        status,
        receipts: receipts?.map((receipt) => ({
            ...receipt,
            blockNumber: (0, fromHex_js_1.hexToBigInt)(receipt.blockNumber),
            gasUsed: (0, fromHex_js_1.hexToBigInt)(receipt.gasUsed),
            status: transactionReceipt_js_1.receiptStatuses[receipt.status],
        })) ?? [],
    };
}
//# sourceMappingURL=getCallsStatus.js.map