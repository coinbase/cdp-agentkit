"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLoggingEnabled = setLoggingEnabled;
async function setLoggingEnabled(client, enabled) {
    await client.request({
        method: `${client.mode}_setLoggingEnabled`,
        params: [enabled],
    });
}
//# sourceMappingURL=setLoggingEnabled.js.map