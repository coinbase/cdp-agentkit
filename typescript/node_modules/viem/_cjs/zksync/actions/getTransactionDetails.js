"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionDetails = getTransactionDetails;
async function getTransactionDetails(client, parameters) {
    const result = await client.request({
        method: 'zks_getTransactionDetails',
        params: [parameters.txHash],
    });
    return result;
}
//# sourceMappingURL=getTransactionDetails.js.map