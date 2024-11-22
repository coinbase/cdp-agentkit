"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vanar = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.vanar = (0, defineChain_js_1.defineChain)({
    id: 2040,
    name: 'Vanar Mainnet',
    nativeCurrency: { name: 'VANRY', symbol: 'VANRY', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.vanarchain.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Vanar Mainnet Explorer',
            url: 'https://explorer.vanarchain.com/',
        },
    },
    testnet: false,
});
//# sourceMappingURL=vanar.js.map