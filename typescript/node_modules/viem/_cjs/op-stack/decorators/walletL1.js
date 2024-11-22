"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletActionsL1 = walletActionsL1;
const depositTransaction_js_1 = require("../actions/depositTransaction.js");
const finalizeWithdrawal_js_1 = require("../actions/finalizeWithdrawal.js");
const proveWithdrawal_js_1 = require("../actions/proveWithdrawal.js");
function walletActionsL1() {
    return (client) => {
        return {
            depositTransaction: (args) => (0, depositTransaction_js_1.depositTransaction)(client, args),
            finalizeWithdrawal: (args) => (0, finalizeWithdrawal_js_1.finalizeWithdrawal)(client, args),
            proveWithdrawal: (args) => (0, proveWithdrawal_js_1.proveWithdrawal)(client, args),
        };
    };
}
//# sourceMappingURL=walletL1.js.map