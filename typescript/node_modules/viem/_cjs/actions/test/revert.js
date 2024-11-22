"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revert = revert;
async function revert(client, { id }) {
    await client.request({
        method: 'evm_revert',
        params: [id],
    });
}
//# sourceMappingURL=revert.js.map