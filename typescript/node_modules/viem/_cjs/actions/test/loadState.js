"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadState = loadState;
async function loadState(client, { state }) {
    await client.request({
        method: `${client.mode}_loadState`,
        params: [state],
    });
}
//# sourceMappingURL=loadState.js.map