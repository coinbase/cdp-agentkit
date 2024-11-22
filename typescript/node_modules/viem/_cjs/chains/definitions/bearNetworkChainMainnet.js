"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bearNetworkChainMainnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.bearNetworkChainMainnet = (0, defineChain_js_1.defineChain)({
    id: 641230,
    name: 'Bear Network Chain Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'BearNetworkChain',
        symbol: 'BRNKC',
    },
    rpcUrls: {
        default: { http: ['https://brnkc-mainnet.bearnetwork.net'] },
    },
    blockExplorers: {
        default: {
            name: 'BrnkScan',
            url: 'https://brnkscan.bearnetwork.net',
            apiUrl: 'https://brnkscan.bearnetwork.net/api',
        },
    },
});
//# sourceMappingURL=bearNetworkChainMainnet.js.map