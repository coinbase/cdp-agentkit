"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWithdrawals = getWithdrawals;
const extractWithdrawalMessageLogs_js_1 = require("./extractWithdrawalMessageLogs.js");
function getWithdrawals({ logs, }) {
    const extractedLogs = (0, extractWithdrawalMessageLogs_js_1.extractWithdrawalMessageLogs)({ logs });
    return extractedLogs.map((log) => log.args);
}
//# sourceMappingURL=getWithdrawals.js.map