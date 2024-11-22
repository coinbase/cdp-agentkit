"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bsquared = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.bsquared = (0, defineChain_js_1.defineChain)({
    id: 223,
    name: 'B2',
    nativeCurrency: {
        name: 'Bitcoin',
        symbol: 'BTC',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.bsquared.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'blockscout',
            url: 'https://explorer.bsquared.network',
        },
    },
});
//# sourceMappingURL=bsquared.js.map