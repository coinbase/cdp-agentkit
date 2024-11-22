export async function getLogProof(client, parameters) {
    const result = await client.request({
        method: 'zks_getL2ToL1LogProof',
        params: [parameters.txHash, parameters.index],
    });
    return result;
}
//# sourceMappingURL=getLogProof.js.map