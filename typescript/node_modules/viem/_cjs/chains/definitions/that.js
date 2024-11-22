"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.that = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.that = (0, defineChain_js_1.defineChain)({
    id: 8428,
    name: 'THAT Mainnet',
    nativeCurrency: { name: 'THAT', symbol: 'THAT', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://api.thatchain.io/mainnet'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://that.blockscout.com',
        },
    },
    testnet: false,
});
//# sourceMappingURL=that.js.map