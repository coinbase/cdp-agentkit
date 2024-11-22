"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avalancheFuji = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.avalancheFuji = (0, defineChain_js_1.defineChain)({
    id: 43_113,
    name: 'Avalanche Fuji',
    nativeCurrency: {
        decimals: 18,
        name: 'Avalanche Fuji',
        symbol: 'AVAX',
    },
    rpcUrls: {
        default: { http: ['https://api.avax-test.network/ext/bc/C/rpc'] },
    },
    blockExplorers: {
        default: {
            name: 'SnowTrace',
            url: 'https://testnet.snowtrace.io',
            apiUrl: 'https://api-testnet.snowtrace.io',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 7096959,
        },
    },
    testnet: true,
});
//# sourceMappingURL=avalancheFuji.js.map