"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCoinbase = setCoinbase;
async function setCoinbase(client, { address }) {
    await client.request({
        method: `${client.mode}_setCoinbase`,
        params: [address],
    });
}
//# sourceMappingURL=setCoinbase.js.map