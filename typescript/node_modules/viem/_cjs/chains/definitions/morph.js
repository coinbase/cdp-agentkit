"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.morph = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.morph = (0, defineChain_js_1.defineChain)({
    id: 2818,
    name: 'Morph',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.morphl2.io'],
            webSocket: ['wss://rpc.morphl2.io:8443'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Morph Explorer',
            url: 'https://explorer.morphl2.io',
        },
    },
    testnet: false,
});
//# sourceMappingURL=morph.js.map