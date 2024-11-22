"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashkeyTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.hashkeyTestnet = (0, defineChain_js_1.defineChain)({
    id: 133,
    name: 'HashKey Chain Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'HashKey EcoPoints',
        symbol: 'HSK',
    },
    rpcUrls: {
        default: {
            http: ['https://hashkeychain-testnet.alt.technology'],
        },
    },
    blockExplorers: {
        default: {
            name: 'HashKey Chain Explorer',
            url: 'https://hashkeychain-testnet-explorer.alt.technology',
        },
    },
});
//# sourceMappingURL=hashkeyChainTestnet.js.map