"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fluenceTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.fluenceTestnet = (0, defineChain_js_1.defineChain)({
    id: 52_164_803,
    name: 'Fluence Testnet',
    nativeCurrency: { name: 'tFLT', symbol: 'tFLT', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.testnet.fluence.dev'],
            webSocket: ['wss://ws.testnet.fluence.dev'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://blockscout.testnet.fluence.dev',
            apiUrl: 'https://blockscout.testnet.fluence.dev/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=fluenceTestnet.js.map