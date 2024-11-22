"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coinex = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.coinex = (0, defineChain_js_1.defineChain)({
    id: 52,
    name: 'CoinEx Mainnet',
    nativeCurrency: { name: 'cet', symbol: 'cet', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.coinex.net'],
        },
    },
    blockExplorers: {
        default: {
            name: 'CoinEx Explorer',
            url: 'https://www.coinex.net',
        },
    },
    testnet: false,
});
//# sourceMappingURL=coinex.js.map