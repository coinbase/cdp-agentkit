"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getL2TransactionHashes = getL2TransactionHashes;
const extractTransactionDepositedLogs_js_1 = require("./extractTransactionDepositedLogs.js");
const getL2TransactionHash_js_1 = require("./getL2TransactionHash.js");
function getL2TransactionHashes({ logs, }) {
    const extractedLogs = (0, extractTransactionDepositedLogs_js_1.extractTransactionDepositedLogs)({ logs });
    return extractedLogs.map((log) => (0, getL2TransactionHash_js_1.getL2TransactionHash)({ log }));
}
//# sourceMappingURL=getL2TransactionHashes.js.map