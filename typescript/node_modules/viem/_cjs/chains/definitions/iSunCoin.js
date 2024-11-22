"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iSunCoin = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.iSunCoin = (0, defineChain_js_1.defineChain)({
    id: 8017,
    name: 'iSunCoin Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'ISC',
        symbol: 'ISC',
    },
    rpcUrls: {
        default: {
            http: ['https://mainnet.isuncoin.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'iSunCoin Explorer',
            url: 'https://baifa.io/app/chains/8017',
        },
    },
});
//# sourceMappingURL=iSunCoin.js.map