"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAccount = parseAccount;
function parseAccount(account) {
    if (typeof account === 'string')
        return { address: account, type: 'json-rpc' };
    return account;
}
//# sourceMappingURL=parseAccount.js.map