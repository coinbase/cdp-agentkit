"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shiden = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.shiden = (0, defineChain_js_1.defineChain)({
    id: 336,
    name: 'Shiden',
    nativeCurrency: {
        decimals: 18,
        name: 'SDN',
        symbol: 'SDN',
    },
    rpcUrls: {
        default: {
            http: ['https://shiden.public.blastapi.io'],
            webSocket: ['wss://shiden-rpc.dwellir.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Shiden Scan',
            url: 'https://shiden.subscan.io',
        },
    },
    testnet: false,
});
//# sourceMappingURL=shiden.js.map