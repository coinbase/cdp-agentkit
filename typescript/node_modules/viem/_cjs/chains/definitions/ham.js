"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ham = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.ham = (0, defineChain_js_1.defineChain)({
    id: 5112,
    name: 'Ham',
    nativeCurrency: {
        decimals: 18,
        name: 'Ham',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.ham.fun'],
            webSocket: ['wss://rpc.ham.fun'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Ham Chain Explorer',
            url: 'https://explorer.ham.fun',
            apiUrl: 'https://explorer.ham.fun/api/v2',
        },
    },
});
//# sourceMappingURL=ham.js.map