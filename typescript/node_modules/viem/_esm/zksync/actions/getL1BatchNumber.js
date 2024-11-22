export async function getL1BatchNumber(client) {
    const result = await client.request({ method: 'zks_L1BatchNumber' });
    return result;
}
//# sourceMappingURL=getL1BatchNumber.js.map