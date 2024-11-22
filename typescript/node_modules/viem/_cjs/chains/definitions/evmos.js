"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evmos = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.evmos = (0, defineChain_js_1.defineChain)({
    id: 9_001,
    name: 'Evmos',
    nativeCurrency: {
        decimals: 18,
        name: 'Evmos',
        symbol: 'EVMOS',
    },
    rpcUrls: {
        default: { http: ['https://eth.bd.evmos.org:8545'] },
    },
    blockExplorers: {
        default: {
            name: 'Evmos Block Explorer',
            url: 'https://escan.live',
        },
    },
});
//# sourceMappingURL=evmos.js.map