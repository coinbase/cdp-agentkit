"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletActionsL2 = walletActionsL2;
const initiateWithdrawal_js_1 = require("../actions/initiateWithdrawal.js");
function walletActionsL2() {
    return (client) => {
        return {
            initiateWithdrawal: (args) => (0, initiateWithdrawal_js_1.initiateWithdrawal)(client, args),
        };
    };
}
//# sourceMappingURL=walletL2.js.map