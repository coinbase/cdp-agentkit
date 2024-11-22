"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bearNetworkChainTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.bearNetworkChainTestnet = (0, defineChain_js_1.defineChain)({
    id: 751230,
    name: 'Bear Network Chain Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'tBRNKC',
        symbol: 'tBRNKC',
    },
    rpcUrls: {
        default: { http: ['https://brnkc-test.bearnetwork.net'] },
    },
    blockExplorers: {
        default: {
            name: 'BrnkTestScan',
            url: 'https://brnktest-scan.bearnetwork.net',
            apiUrl: 'https://brnktest-scan.bearnetwork.net/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=bearNetworkChainTestnet.js.map