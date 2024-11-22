"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpState = dumpState;
async function dumpState(client) {
    return client.request({
        method: `${client.mode}_dumpState`,
    });
}
//# sourceMappingURL=dumpState.js.map