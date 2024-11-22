"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tiktrixTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.tiktrixTestnet = (0, defineChain_js_1.defineChain)({
    id: 62092,
    name: 'TikTrix Testnet',
    nativeCurrency: {
        name: 'tTTX',
        symbol: 'tTTX',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://tiktrix-rpc.xyz'],
        },
    },
    blockExplorers: {
        default: {
            name: 'TikTrix Testnet Explorer',
            url: 'https://tiktrix.xyz',
        },
    },
    testnet: true,
});
//# sourceMappingURL=tiktrixTestnet.js.map