"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dosChain = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.dosChain = (0, defineChain_js_1.defineChain)({
    id: 7979,
    name: 'DOS Chain',
    nativeCurrency: {
        decimals: 18,
        name: 'DOS Chain',
        symbol: 'DOS',
    },
    rpcUrls: {
        default: { http: ['https://main.doschain.com'] },
    },
    blockExplorers: {
        default: {
            name: 'DOS Chain Explorer',
            url: 'https://doscan.io',
            apiUrl: 'https://api.doscan.io',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 161908,
        },
    },
});
//# sourceMappingURL=dosChain.js.map