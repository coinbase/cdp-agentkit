"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arbitrumNova = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.arbitrumNova = (0, defineChain_js_1.defineChain)({
    id: 42_170,
    name: 'Arbitrum Nova',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://nova.arbitrum.io/rpc'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Arbiscan',
            url: 'https://nova.arbiscan.io',
            apiUrl: 'https://api-nova.arbiscan.io/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 1746963,
        },
    },
});
//# sourceMappingURL=arbitrumNova.js.map