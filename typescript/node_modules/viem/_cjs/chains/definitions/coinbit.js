"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coinbit = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.coinbit = (0, defineChain_js_1.defineChain)({
    id: 112,
    name: 'Coinbit Mainnet',
    nativeCurrency: { name: 'GIDR', symbol: 'GIDR', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://coinbit-rpc-mainnet.chain.sbcrypto.app'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Coinbit Explorer',
            url: 'https://coinbit-explorer.chain.sbcrypto.app',
        },
    },
    testnet: false,
});
//# sourceMappingURL=coinbit.js.map