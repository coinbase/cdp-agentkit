"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goChain = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.goChain = (0, defineChain_js_1.defineChain)({
    id: 60,
    name: 'GoChain',
    nativeCurrency: {
        decimals: 18,
        name: 'GO',
        symbol: 'GO',
    },
    rpcUrls: {
        default: { http: ['https://rpc.gochain.io'] },
    },
    blockExplorers: {
        default: {
            name: 'GoChain Explorer',
            url: 'https://explorer.gochain.io',
        },
    },
    testnet: false,
});
//# sourceMappingURL=goChain.js.map