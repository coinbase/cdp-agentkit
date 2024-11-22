"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bxnTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.bxnTestnet = (0, defineChain_js_1.defineChain)({
    id: 4777,
    name: 'BlackFort Exchange Network Testnet',
    nativeCurrency: {
        name: 'BlackFort Testnet Token',
        symbol: 'TBXN',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://testnet.blackfort.network/rpc'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://testnet-explorer.blackfort.network',
            apiUrl: 'https://testnet-explorer.blackfort.network/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=bxnTestnet.js.map