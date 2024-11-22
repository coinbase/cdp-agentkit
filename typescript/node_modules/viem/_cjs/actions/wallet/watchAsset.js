"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchAsset = watchAsset;
async function watchAsset(client, params) {
    const added = await client.request({
        method: 'wallet_watchAsset',
        params,
    }, { retryCount: 0 });
    return added;
}
//# sourceMappingURL=watchAsset.js.map