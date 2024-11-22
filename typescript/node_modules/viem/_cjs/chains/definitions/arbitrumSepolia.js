"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arbitrumSepolia = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.arbitrumSepolia = (0, defineChain_js_1.defineChain)({
    id: 421_614,
    name: 'Arbitrum Sepolia',
    nativeCurrency: {
        name: 'Arbitrum Sepolia Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://sepolia-rollup.arbitrum.io/rpc'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Arbiscan',
            url: 'https://sepolia.arbiscan.io',
            apiUrl: 'https://api-sepolia.arbiscan.io/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 81930,
        },
    },
    testnet: true,
});
//# sourceMappingURL=arbitrumSepolia.js.map