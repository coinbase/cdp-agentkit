"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTransactionDepositedLogs = extractTransactionDepositedLogs;
const parseEventLogs_js_1 = require("../../utils/abi/parseEventLogs.js");
const abis_js_1 = require("../abis.js");
function extractTransactionDepositedLogs({ logs, }) {
    return (0, parseEventLogs_js_1.parseEventLogs)({
        abi: abis_js_1.portalAbi,
        eventName: 'TransactionDeposited',
        logs,
    });
}
//# sourceMappingURL=extractTransactionDepositedLogs.js.map