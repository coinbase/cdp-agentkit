"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reyaNetwork = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.reyaNetwork = (0, defineChain_js_1.defineChain)({
    id: 1729,
    name: 'Reya Network',
    nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
    rpcUrls: {
        default: {
            http: ['https://rpc.reya.network'],
            webSocket: ['wss://ws.reya.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Reya Network Explorer',
            url: 'https://explorer.reya.network',
        },
    },
    testnet: false,
});
//# sourceMappingURL=reyaNetwork.js.map