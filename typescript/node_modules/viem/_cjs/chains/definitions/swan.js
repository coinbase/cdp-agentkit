"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swan = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.swan = (0, defineChain_js_1.defineChain)({
    id: 254,
    name: 'Swan Chain Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://mainnet-rpc.swanchain.org'] },
    },
    blockExplorers: {
        default: {
            name: 'Swan Explorer',
            url: 'https://swanscan.io',
        },
    },
    testnet: false,
});
//# sourceMappingURL=swan.js.map