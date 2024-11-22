"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineTransactionReceipt = exports.receiptStatuses = void 0;
exports.formatTransactionReceipt = formatTransactionReceipt;
const fromHex_js_1 = require("../encoding/fromHex.js");
const formatter_js_1 = require("./formatter.js");
const log_js_1 = require("./log.js");
const transaction_js_1 = require("./transaction.js");
exports.receiptStatuses = {
    '0x0': 'reverted',
    '0x1': 'success',
};
function formatTransactionReceipt(transactionReceipt) {
    const receipt = {
        ...transactionReceipt,
        blockNumber: transactionReceipt.blockNumber
            ? BigInt(transactionReceipt.blockNumber)
            : null,
        contractAddress: transactionReceipt.contractAddress
            ? transactionReceipt.contractAddress
            : null,
        cumulativeGasUsed: transactionReceipt.cumulativeGasUsed
            ? BigInt(transactionReceipt.cumulativeGasUsed)
            : null,
        effectiveGasPrice: transactionReceipt.effectiveGasPrice
            ? BigInt(transactionReceipt.effectiveGasPrice)
            : null,
        gasUsed: transactionReceipt.gasUsed
            ? BigInt(transactionReceipt.gasUsed)
            : null,
        logs: transactionReceipt.logs
            ? transactionReceipt.logs.map((log) => (0, log_js_1.formatLog)(log))
            : null,
        to: transactionReceipt.to ? transactionReceipt.to : null,
        transactionIndex: transactionReceipt.transactionIndex
            ? (0, fromHex_js_1.hexToNumber)(transactionReceipt.transactionIndex)
            : null,
        status: transactionReceipt.status
            ? exports.receiptStatuses[transactionReceipt.status]
            : null,
        type: transactionReceipt.type
            ? transaction_js_1.transactionType[transactionReceipt.type] || transactionReceipt.type
            : null,
    };
    if (transactionReceipt.blobGasPrice)
        receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
    if (transactionReceipt.blobGasUsed)
        receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
    return receipt;
}
exports.defineTransactionReceipt = (0, formatter_js_1.defineFormatter)('transactionReceipt', formatTransactionReceipt);
//# sourceMappingURL=transactionReceipt.js.map