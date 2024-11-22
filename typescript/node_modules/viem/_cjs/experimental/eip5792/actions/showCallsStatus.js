"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showCallsStatus = showCallsStatus;
async function showCallsStatus(client, parameters) {
    const { id } = parameters;
    await client.request({
        method: 'wallet_showCallsStatus',
        params: [id],
    });
    return;
}
//# sourceMappingURL=showCallsStatus.js.map