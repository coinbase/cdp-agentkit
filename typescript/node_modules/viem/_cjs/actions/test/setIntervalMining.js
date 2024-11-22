"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIntervalMining = setIntervalMining;
async function setIntervalMining(client, { interval }) {
    const interval_ = (() => {
        if (client.mode === 'hardhat')
            return interval * 1000;
        return interval;
    })();
    await client.request({
        method: 'evm_setIntervalMining',
        params: [interval_],
    });
}
//# sourceMappingURL=setIntervalMining.js.map