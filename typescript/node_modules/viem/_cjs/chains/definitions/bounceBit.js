"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bounceBit = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.bounceBit = (0, defineChain_js_1.defineChain)({
    id: 6001,
    name: 'BounceBit Mainnet',
    nativeCurrency: { name: 'BounceBit', symbol: 'BB', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://fullnode-mainnet.bouncebitapi.com'] },
    },
    blockExplorers: {
        default: {
            name: 'BB Scan',
            url: 'https://bbscan.io',
        },
    },
    testnet: false,
});
//# sourceMappingURL=bounceBit.js.map