"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dosChainTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.dosChainTestnet = (0, defineChain_js_1.defineChain)({
    id: 3939,
    name: 'DOS Chain Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'DOS Chain Testnet',
        symbol: 'DOS',
    },
    rpcUrls: {
        default: { http: ['https://test.doschain.com'] },
    },
    blockExplorers: {
        default: {
            name: 'DOS Chain Testnet Explorer',
            url: 'https://test.doscan.io',
            apiUrl: 'https://api-test.doscan.io',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 69623,
        },
    },
    testnet: true,
});
//# sourceMappingURL=dosChainTestnet.js.map