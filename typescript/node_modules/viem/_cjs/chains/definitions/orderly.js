"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderly = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.orderly = (0, defineChain_js_1.defineChain)({
    id: 291,
    name: 'Orderly',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc.orderly.network'] },
    },
    blockExplorers: {
        default: {
            name: 'Orderly Explorer',
            url: 'https://explorer.orderly.network',
        },
    },
    testnet: false,
});
//# sourceMappingURL=orderly.js.map