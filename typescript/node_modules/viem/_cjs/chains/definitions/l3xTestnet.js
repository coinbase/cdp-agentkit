"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.l3xTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.l3xTestnet = (0, defineChain_js_1.defineChain)({
    id: 12325,
    name: 'L3X Protocol Testnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc-testnet.l3x.com'],
            webSocket: ['wss://rpc-testnet.l3x.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'L3X Testnet Explorer',
            url: 'https://explorer-testnet.l3x.com',
            apiUrl: 'https://explorer-testnet.l3x.com/api/v2',
        },
    },
    testnet: true,
});
//# sourceMappingURL=l3xTestnet.js.map