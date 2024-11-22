"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inspectTxpool = inspectTxpool;
async function inspectTxpool(client) {
    return await client.request({
        method: 'txpool_inspect',
    });
}
//# sourceMappingURL=inspectTxpool.js.map