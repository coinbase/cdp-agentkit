"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merlin = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.merlin = (0, defineChain_js_1.defineChain)({
    id: 4200,
    name: 'Merlin',
    nativeCurrency: {
        name: 'BTC',
        symbol: 'BTC',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ['https://rpc.merlinchain.io'] },
    },
    blockExplorers: {
        default: {
            name: 'blockscout',
            url: 'https://scan.merlinchain.io',
            apiUrl: 'https://scan.merlinchain.io/api',
        },
    },
});
//# sourceMappingURL=merlin.js.map