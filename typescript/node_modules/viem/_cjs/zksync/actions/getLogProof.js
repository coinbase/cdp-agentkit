"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogProof = getLogProof;
async function getLogProof(client, parameters) {
    const result = await client.request({
        method: 'zks_getL2ToL1LogProof',
        params: [parameters.txHash, parameters.index],
    });
    return result;
}
//# sourceMappingURL=getLogProof.js.map