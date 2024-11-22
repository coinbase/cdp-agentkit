export async function getL1BatchDetails(client, parameters) {
    const result = await client.request({
        method: 'zks_getL1BatchDetails',
        params: [parameters.number],
    });
    return result;
}
//# sourceMappingURL=getL1BatchDetails.js.map