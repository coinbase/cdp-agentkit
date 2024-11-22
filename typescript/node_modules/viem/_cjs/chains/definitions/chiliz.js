"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chiliz = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.chiliz = (0, defineChain_js_1.defineChain)({
    id: 88_888,
    name: 'Chiliz Chain',
    network: 'chiliz-chain',
    nativeCurrency: {
        decimals: 18,
        name: 'CHZ',
        symbol: 'CHZ',
    },
    rpcUrls: {
        default: {
            http: [
                'https://rpc.ankr.com/chiliz',
                'https://chiliz-rpc.publicnode.com',
            ],
        },
    },
    blockExplorers: {
        default: {
            name: 'Chiliz Explorer',
            url: 'https://scan.chiliz.com',
            apiUrl: 'https://scan.chiliz.com/api',
        },
    },
});
//# sourceMappingURL=chiliz.js.map