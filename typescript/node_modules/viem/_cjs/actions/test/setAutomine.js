"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAutomine = setAutomine;
async function setAutomine(client, enabled) {
    if (client.mode === 'ganache') {
        if (enabled)
            await client.request({ method: 'miner_start' });
        else
            await client.request({ method: 'miner_stop' });
    }
    else
        await client.request({
            method: 'evm_setAutomine',
            params: [enabled],
        });
}
//# sourceMappingURL=setAutomine.js.map