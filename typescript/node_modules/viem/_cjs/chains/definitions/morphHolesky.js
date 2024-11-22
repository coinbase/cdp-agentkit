"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.morphHolesky = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.morphHolesky = (0, defineChain_js_1.defineChain)({
    id: 2810,
    name: 'Morph Holesky',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc-quicknode-holesky.morphl2.io'],
            webSocket: ['wss://rpc-quicknode-holesky.morphl2.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Morph Holesky Explorer',
            url: 'https://explorer-holesky.morphl2.io',
            apiUrl: 'https://explorer-api-holesky.morphl2.io/api?',
        },
    },
    testnet: true,
});
//# sourceMappingURL=morphHolesky.js.map