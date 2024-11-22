"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bsquaredTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.bsquaredTestnet = (0, defineChain_js_1.defineChain)({
    id: 1123,
    name: 'B2 Testnet',
    nativeCurrency: {
        name: 'Bitcoin',
        symbol: 'BTC',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://testnet-rpc.bsquared.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'blockscout',
            url: 'https://testnet-explorer.bsquared.network',
        },
    },
    testnet: true,
});
//# sourceMappingURL=bsquaredTestnet.js.map