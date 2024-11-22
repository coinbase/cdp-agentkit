"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.morphSepolia = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.morphSepolia = (0, defineChain_js_1.defineChain)({
    id: 2710,
    name: 'Morph Sepolia',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc-testnet.morphl2.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Morph Testnet Explorer',
            url: 'https://explorer-testnet.morphl2.io',
            apiUrl: 'https://explorer-api-testnet.morphl2.io/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=morphSepolia.js.map