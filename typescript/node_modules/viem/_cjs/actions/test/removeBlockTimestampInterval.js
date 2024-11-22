"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBlockTimestampInterval = removeBlockTimestampInterval;
async function removeBlockTimestampInterval(client) {
    await client.request({
        method: `${client.mode}_removeBlockTimestampInterval`,
    });
}
//# sourceMappingURL=removeBlockTimestampInterval.js.map