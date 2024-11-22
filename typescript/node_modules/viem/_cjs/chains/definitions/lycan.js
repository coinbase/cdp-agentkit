"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lycan = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.lycan = (0, defineChain_js_1.defineChain)({
    id: 721,
    name: 'Lycan',
    nativeCurrency: {
        decimals: 18,
        name: 'Lycan',
        symbol: 'LYC',
    },
    rpcUrls: {
        default: {
            http: [
                'https://rpc.lycanchain.com',
                'https://us-east.lycanchain.com',
                'https://us-west.lycanchain.com',
                'https://eu-north.lycanchain.com',
                'https://eu-west.lycanchain.com',
                'https://asia-southeast.lycanchain.com',
            ],
            webSocket: [
                'wss://rpc.lycanchain.com',
                'wss://us-east.lycanchain.com',
                'wss://us-west.lycanchain.com',
                'wss://eu-north.lycanchain.com',
                'wss://eu-west.lycanchain.com',
                'wss://asia-southeast.lycanchain.com',
            ],
        },
    },
    blockExplorers: {
        default: {
            name: 'Lycan Explorer',
            url: 'https://explorer.lycanchain.com',
        },
    },
});
//# sourceMappingURL=lycan.js.map