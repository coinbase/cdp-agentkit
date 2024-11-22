"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unique = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.unique = (0, defineChain_js_1.defineChain)({
    id: 8880,
    name: 'Unique Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'UNQ',
        symbol: 'UNQ',
    },
    rpcUrls: {
        default: { http: ['https://rpc.unique.network'] },
    },
    blockExplorers: {
        default: {
            name: 'Unique Subscan',
            url: 'https://unique.subscan.io/',
        },
    },
});
//# sourceMappingURL=unique.js.map