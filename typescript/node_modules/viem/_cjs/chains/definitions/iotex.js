"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iotex = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.iotex = (0, defineChain_js_1.defineChain)({
    id: 4_689,
    name: 'IoTeX',
    nativeCurrency: {
        decimals: 18,
        name: 'IoTeX',
        symbol: 'IOTX',
    },
    rpcUrls: {
        default: {
            http: ['https://babel-api.mainnet.iotex.io'],
            webSocket: ['wss://babel-api.mainnet.iotex.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'IoTeXScan',
            url: 'https://iotexscan.io',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 22163670,
        },
    },
});
//# sourceMappingURL=iotex.js.map