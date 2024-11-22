"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storyTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.storyTestnet = (0, defineChain_js_1.defineChain)({
    id: 1513,
    name: 'Story Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'IP',
        symbol: 'IP',
    },
    rpcUrls: {
        default: { http: ['https://testnet.storyrpc.io'] },
    },
    blockExplorers: {
        default: {
            name: 'Story Testnet Explorer',
            url: 'https://testnet.storyscan.xyz',
        },
    },
    testnet: true,
});
//# sourceMappingURL=storyTestnet.js.map