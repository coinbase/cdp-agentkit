"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.impersonateAccount = impersonateAccount;
async function impersonateAccount(client, { address }) {
    await client.request({
        method: `${client.mode}_impersonateAccount`,
        params: [address],
    });
}
//# sourceMappingURL=impersonateAccount.js.map