"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nahmii = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.nahmii = (0, defineChain_js_1.defineChain)({
    id: 5551,
    name: 'Nahmii 2 Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'ETH',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: { http: ['https://l2.nahmii.io'] },
    },
    blockExplorers: {
        default: {
            name: 'Nahmii 2 Explorer',
            url: 'https://explorer.n2.nahmii.io',
        },
    },
    testnet: false,
});
//# sourceMappingURL=nahmii.js.map