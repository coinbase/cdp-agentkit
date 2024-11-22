"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zkFairTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.zkFairTestnet = (0, defineChain_js_1.defineChain)({
    id: 43851,
    name: 'ZKFair Testnet',
    network: 'zkfair-testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'USD Coin',
        symbol: 'USDC',
    },
    rpcUrls: {
        default: {
            http: ['https://testnet-rpc.zkfair.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'zkFair Explorer',
            url: 'https://testnet-scan.zkfair.io',
        },
    },
    testnet: true,
});
//# sourceMappingURL=zkFairTestnet.js.map