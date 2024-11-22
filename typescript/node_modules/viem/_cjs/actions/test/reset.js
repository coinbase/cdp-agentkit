"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reset = reset;
async function reset(client, { blockNumber, jsonRpcUrl } = {}) {
    await client.request({
        method: `${client.mode}_reset`,
        params: [{ forking: { blockNumber: Number(blockNumber), jsonRpcUrl } }],
    });
}
//# sourceMappingURL=reset.js.map