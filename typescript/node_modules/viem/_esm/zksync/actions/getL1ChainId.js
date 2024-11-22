export async function getL1ChainId(client) {
    const result = await client.request({ method: 'zks_L1ChainId' });
    return result;
}
//# sourceMappingURL=getL1ChainId.js.map