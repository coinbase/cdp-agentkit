"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTxpoolStatus = getTxpoolStatus;
const fromHex_js_1 = require("../../utils/encoding/fromHex.js");
async function getTxpoolStatus(client) {
    const { pending, queued } = await client.request({
        method: 'txpool_status',
    });
    return {
        pending: (0, fromHex_js_1.hexToNumber)(pending),
        queued: (0, fromHex_js_1.hexToNumber)(queued),
    };
}
//# sourceMappingURL=getTxpoolStatus.js.map