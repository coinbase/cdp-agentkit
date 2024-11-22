"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snapshot = snapshot;
async function snapshot(client) {
    return await client.request({
        method: 'evm_snapshot',
    });
}
//# sourceMappingURL=snapshot.js.map