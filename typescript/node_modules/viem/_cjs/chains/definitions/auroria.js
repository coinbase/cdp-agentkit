"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auroria = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.auroria = (0, defineChain_js_1.defineChain)({
    id: 205205,
    name: 'Auroria Testnet',
    network: 'auroria',
    nativeCurrency: {
        name: 'Auroria Stratis',
        symbol: 'tSTRAX',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://auroria.rpc.stratisevm.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Auroria Testnet Explorer',
            url: 'https://auroria.explorer.stratisevm.com',
        },
    },
    testnet: true,
});
//# sourceMappingURL=auroria.js.map