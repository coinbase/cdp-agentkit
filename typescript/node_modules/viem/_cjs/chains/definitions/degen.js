"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.degen = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.degen = (0, defineChain_js_1.defineChain)({
    id: 666666666,
    name: 'Degen',
    nativeCurrency: {
        decimals: 18,
        name: 'Degen',
        symbol: 'DEGEN',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.degen.tips'],
            webSocket: ['wss://rpc.degen.tips'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Degen Chain Explorer',
            url: 'https://explorer.degen.tips',
            apiUrl: 'https://explorer.degen.tips/api/v2',
        },
    },
});
//# sourceMappingURL=degen.js.map