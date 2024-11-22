export async function getTransactionDetails(client, parameters) {
    const result = await client.request({
        method: 'zks_getTransactionDetails',
        params: [parameters.txHash],
    });
    return result;
}
//# sourceMappingURL=getTransactionDetails.js.map