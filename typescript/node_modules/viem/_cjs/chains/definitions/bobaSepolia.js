"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bobaSepolia = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.bobaSepolia = (0, defineChain_js_1.defineChain)({
    id: 28882,
    name: 'Boba Sepolia',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ['https://sepolia.boba.network'] },
    },
    blockExplorers: {
        default: {
            name: 'BOBAScan',
            url: 'https://testnet.bobascan.com',
        },
    },
    testnet: true,
});
//# sourceMappingURL=bobaSepolia.js.map