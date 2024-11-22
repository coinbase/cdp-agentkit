"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taiko = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.taiko = (0, defineChain_js_1.defineChain)({
    id: 167000,
    name: 'Taiko Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.mainnet.taiko.xyz'],
            webSocket: ['wss://ws.mainnet.taiko.xyz'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Taikoscan',
            url: 'https://taikoscan.io',
            apiUrl: 'https://api.taikoscan.io/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcb2436774C3e191c85056d248EF4260ce5f27A9D',
        },
    },
});
//# sourceMappingURL=taiko.js.map