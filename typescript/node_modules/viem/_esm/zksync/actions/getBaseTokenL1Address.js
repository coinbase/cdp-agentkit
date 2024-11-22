export async function getBaseTokenL1Address(client) {
    const result = await client.request({ method: 'zks_getBaseTokenL1Address' });
    return result;
}
//# sourceMappingURL=getBaseTokenL1Address.js.map