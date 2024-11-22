"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitkubTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.bitkubTestnet = (0, defineChain_js_1.defineChain)({
    id: 25925,
    name: 'Bitkub Testnet',
    network: 'Bitkub Testnet',
    nativeCurrency: { name: 'Bitkub Test', symbol: 'tKUB', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc-testnet.bitkubchain.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Bitkub Chain Testnet Explorer',
            url: 'https://testnet.bkcscan.com',
            apiUrl: 'https://testnet.bkcscan.com/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=bitkubTestnet.js.map