"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestPermissions = requestPermissions;
async function requestPermissions(client, permissions) {
    return client.request({
        method: 'wallet_requestPermissions',
        params: [permissions],
    }, { retryCount: 0 });
}
//# sourceMappingURL=requestPermissions.js.map