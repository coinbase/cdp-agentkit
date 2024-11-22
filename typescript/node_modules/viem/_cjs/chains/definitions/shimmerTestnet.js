"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shimmerTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.shimmerTestnet = (0, defineChain_js_1.defineChain)({
    id: 1073,
    name: 'Shimmer Testnet',
    network: 'shimmer-testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Shimmer',
        symbol: 'SMR',
    },
    rpcUrls: {
        default: {
            http: ['https://json-rpc.evm.testnet.shimmer.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Shimmer Network Explorer',
            url: 'https://explorer.evm.testnet.shimmer.network',
            apiUrl: 'https://explorer.evm.testnet.shimmer.network/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=shimmerTestnet.js.map