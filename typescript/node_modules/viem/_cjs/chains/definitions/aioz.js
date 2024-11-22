"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aioz = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.aioz = (0, defineChain_js_1.defineChain)({
    id: 168,
    name: 'AIOZ Network',
    nativeCurrency: {
        decimals: 18,
        name: 'AIOZ',
        symbol: 'AIOZ',
    },
    rpcUrls: {
        default: {
            http: ['https://eth-dataseed.aioz.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'AIOZ Explorer',
            url: 'https://explorer.aioz.network',
        },
    },
    testnet: false,
});
//# sourceMappingURL=aioz.js.map