"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockDetails = getBlockDetails;
async function getBlockDetails(client, parameters) {
    const result = await client.request({
        method: 'zks_getBlockDetails',
        params: [parameters.number],
    });
    return result;
}
//# sourceMappingURL=getBlockDetails.js.map