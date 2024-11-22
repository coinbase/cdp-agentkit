"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b3Sepolia = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const sourceId = 168_587_773;
exports.b3Sepolia = (0, defineChain_js_1.defineChain)({
    id: 1993,
    name: 'B3 Sepolia',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://sepolia.b3.fun/http'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://sepolia.explorer.b3.fun',
        },
    },
    testnet: true,
    sourceId,
});
//# sourceMappingURL=b3Sepolia.js.map