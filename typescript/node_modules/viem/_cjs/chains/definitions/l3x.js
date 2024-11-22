"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.l3x = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.l3x = (0, defineChain_js_1.defineChain)({
    id: 12324,
    name: 'L3X Protocol',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc-mainnet.l3x.com'],
            webSocket: ['wss://rpc-mainnet.l3x.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'L3X Mainnet Explorer',
            url: 'https://explorer.l3x.com',
            apiUrl: 'https://explorer.l3x.com/api/v2',
        },
    },
    testnet: false,
});
//# sourceMappingURL=l3x.js.map