"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lukso = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.lukso = (0, defineChain_js_1.defineChain)({
    id: 42,
    network: 'lukso',
    name: 'LUKSO',
    nativeCurrency: {
        name: 'LUKSO',
        symbol: 'LYX',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.mainnet.lukso.network'],
            webSocket: ['wss://ws-rpc.mainnet.lukso.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'LUKSO Mainnet Explorer',
            url: 'https://explorer.execution.mainnet.lukso.network',
            apiUrl: 'https://api.explorer.execution.mainnet.lukso.network/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 468183,
        },
    },
});
//# sourceMappingURL=lukso.js.map