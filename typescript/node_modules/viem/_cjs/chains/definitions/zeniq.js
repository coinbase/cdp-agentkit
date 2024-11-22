"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zeniq = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.zeniq = (0, defineChain_js_1.defineChain)({
    id: 383414847825,
    name: 'Zeniq Mainnet',
    nativeCurrency: { name: 'ZENIQ', symbol: 'ZENIQ', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://api.zeniq.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Zeniq Explorer',
            url: 'https://zeniqscan.com',
        },
    },
    testnet: false,
});
//# sourceMappingURL=zeniq.js.map