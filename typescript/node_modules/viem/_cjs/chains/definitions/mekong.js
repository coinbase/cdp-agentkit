"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mekong = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.mekong = (0, defineChain_js_1.defineChain)({
    id: 7078815900,
    name: 'Mekong Pectra Devnet',
    nativeCurrency: { name: 'eth', symbol: 'eth', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.mekong.ethpandaops.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Block Explorer',
            url: 'https://explorer.mekong.ethpandaops.io',
        },
    },
    testnet: true,
});
//# sourceMappingURL=mekong.js.map