"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evmosTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.evmosTestnet = (0, defineChain_js_1.defineChain)({
    id: 9_000,
    name: 'Evmos Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Evmos',
        symbol: 'EVMOS',
    },
    rpcUrls: {
        default: { http: ['https://eth.bd.evmos.dev:8545'] },
    },
    blockExplorers: {
        default: {
            name: 'Evmos Testnet Block Explorer',
            url: 'https://evm.evmos.dev/',
        },
    },
});
//# sourceMappingURL=evmosTestnet.js.map