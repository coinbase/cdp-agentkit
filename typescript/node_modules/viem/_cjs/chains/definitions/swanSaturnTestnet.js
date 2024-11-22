"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swanSaturnTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.swanSaturnTestnet = (0, defineChain_js_1.defineChain)({
    id: 2024,
    name: 'Swan Saturn Testnet',
    nativeCurrency: { name: 'Swan Ether', symbol: 'sETH', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://saturn-rpc.swanchain.io'] },
    },
    blockExplorers: {
        default: {
            name: 'Swan Explorer',
            url: 'https://saturn-explorer.swanchain.io',
        },
    },
    testnet: true,
});
//# sourceMappingURL=swanSaturnTestnet.js.map