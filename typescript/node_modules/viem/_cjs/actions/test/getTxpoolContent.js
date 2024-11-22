"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTxpoolContent = getTxpoolContent;
async function getTxpoolContent(client) {
    return await client.request({
        method: 'txpool_content',
    });
}
//# sourceMappingURL=getTxpoolContent.js.map