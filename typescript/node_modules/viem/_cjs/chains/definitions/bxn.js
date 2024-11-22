"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bxn = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.bxn = (0, defineChain_js_1.defineChain)({
    id: 4999,
    name: 'BlackFort Exchange Network',
    nativeCurrency: { name: 'BlackFort Token', symbol: 'BXN', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://mainnet.blackfort.network/rpc'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://explorer.blackfort.network',
            apiUrl: 'https://explorer.blackfort.network/api',
        },
    },
});
//# sourceMappingURL=bxn.js.map