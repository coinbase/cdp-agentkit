"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shimmer = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.shimmer = (0, defineChain_js_1.defineChain)({
    id: 148,
    name: 'Shimmer',
    network: 'shimmer',
    nativeCurrency: {
        decimals: 18,
        name: 'Shimmer',
        symbol: 'SMR',
    },
    rpcUrls: {
        default: {
            http: ['https://json-rpc.evm.shimmer.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Shimmer Network Explorer',
            url: 'https://explorer.evm.shimmer.network',
            apiUrl: 'https://explorer.evm.shimmer.network/api',
        },
    },
});
//# sourceMappingURL=shimmer.js.map