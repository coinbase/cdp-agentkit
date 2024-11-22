"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUserOperationReceipt = formatUserOperationReceipt;
const log_js_1 = require("../../../utils/formatters/log.js");
const transactionReceipt_js_1 = require("../../../utils/formatters/transactionReceipt.js");
function formatUserOperationReceipt(parameters) {
    const receipt = { ...parameters };
    if (parameters.actualGasCost)
        receipt.actualGasCost = BigInt(parameters.actualGasCost);
    if (parameters.actualGasUsed)
        receipt.actualGasUsed = BigInt(parameters.actualGasUsed);
    if (parameters.logs)
        receipt.logs = parameters.logs.map((log) => (0, log_js_1.formatLog)(log));
    if (parameters.receipt)
        receipt.receipt = (0, transactionReceipt_js_1.formatTransactionReceipt)(receipt.receipt);
    return receipt;
}
//# sourceMappingURL=userOperationReceipt.js.map