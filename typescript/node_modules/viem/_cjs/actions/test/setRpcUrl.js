"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRpcUrl = setRpcUrl;
async function setRpcUrl(client, jsonRpcUrl) {
    await client.request({
        method: `${client.mode}_setRpcUrl`,
        params: [jsonRpcUrl],
    });
}
//# sourceMappingURL=setRpcUrl.js.map