"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arbitrum = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.arbitrum = (0, defineChain_js_1.defineChain)({
    id: 42_161,
    name: 'Arbitrum One',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://arb1.arbitrum.io/rpc'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Arbiscan',
            url: 'https://arbiscan.io',
            apiUrl: 'https://api.arbiscan.io/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 7654707,
        },
    },
});
//# sourceMappingURL=arbitrum.js.map