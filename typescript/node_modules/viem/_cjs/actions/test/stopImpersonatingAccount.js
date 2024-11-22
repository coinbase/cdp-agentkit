"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopImpersonatingAccount = stopImpersonatingAccount;
async function stopImpersonatingAccount(client, { address }) {
    await client.request({
        method: `${client.mode}_stopImpersonatingAccount`,
        params: [address],
    });
}
//# sourceMappingURL=stopImpersonatingAccount.js.map