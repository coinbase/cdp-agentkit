"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchainTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.matchainTestnet = (0, defineChain_js_1.defineChain)({
    id: 699,
    name: 'Matchain Testnet',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ['https://testnet-rpc.matchain.io'] },
    },
    blockExplorers: {
        default: {
            name: 'Matchain Scan',
            url: 'https://testnet.matchscan.io',
        },
    },
    testnet: true,
});
//# sourceMappingURL=matchainTestnet.js.map