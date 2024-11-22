"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ubiq = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.ubiq = (0, defineChain_js_1.defineChain)({
    id: 8,
    name: 'Ubiq Mainnet',
    nativeCurrency: { name: 'UBQ', symbol: 'UBQ', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://pyrus2.ubiqscan.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Ubiq Scan',
            url: 'https://ubiqscan.io',
        },
    },
    testnet: false,
});
//# sourceMappingURL=ubiq.js.map