"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iotaTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.iotaTestnet = (0, defineChain_js_1.defineChain)({
    id: 1075,
    name: 'IOTA EVM Testnet',
    network: 'iotaevm-testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'IOTA',
        symbol: 'IOTA',
    },
    rpcUrls: {
        default: {
            http: ['https://json-rpc.evm.testnet.iotaledger.net'],
            webSocket: ['wss://ws.json-rpc.evm.testnet.iotaledger.net'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Explorer',
            url: 'https://explorer.evm.testnet.iotaledger.net',
            apiUrl: 'https://explorer.evm.testnet.iotaledger.net/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=iotaTestnet.js.map