"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redbellyTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.redbellyTestnet = (0, defineChain_js_1.defineChain)({
    id: 153,
    name: 'Redbelly Network Testnet',
    nativeCurrency: {
        name: 'Redbelly Native Coin',
        symbol: 'RBNT',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://governors.testnet.redbelly.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Ethernal',
            url: 'https://explorer.testnet.redbelly.network',
            apiUrl: 'https://ethernal.fly.dev/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=redbellyTestnet.js.map