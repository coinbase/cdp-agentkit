"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRawTransaction = sendRawTransaction;
async function sendRawTransaction(client, { serializedTransaction }) {
    return client.request({
        method: 'eth_sendRawTransaction',
        params: [serializedTransaction],
    }, { retryCount: 0 });
}
//# sourceMappingURL=sendRawTransaction.js.map