export async function getTestnetPaymasterAddress(client) {
    const result = await client.request({ method: 'zks_getTestnetPaymaster' });
    return result;
}
//# sourceMappingURL=getTestnetPaymasterAddress.js.map