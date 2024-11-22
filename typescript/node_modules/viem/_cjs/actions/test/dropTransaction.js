"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropTransaction = dropTransaction;
async function dropTransaction(client, { hash }) {
    await client.request({
        method: `${client.mode}_dropTransaction`,
        params: [hash],
    });
}
//# sourceMappingURL=dropTransaction.js.map