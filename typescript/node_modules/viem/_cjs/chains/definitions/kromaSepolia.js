"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kromaSepolia = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.kromaSepolia = (0, defineChain_js_1.defineChain)({
    id: 2358,
    name: 'Kroma Sepolia',
    nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://api.sepolia.kroma.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Kroma Sepolia Explorer',
            url: 'https://blockscout.sepolia.kroma.network',
            apiUrl: 'https://blockscout.sepolia.kroma.network/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=kromaSepolia.js.map