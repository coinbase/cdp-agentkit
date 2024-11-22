export async function getBridgehubContractAddress(client) {
    const result = await client.request({ method: 'zks_getBridgehubContract' });
    return result;
}
//# sourceMappingURL=getBridgehubContractAddress.js.map