"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bounceBitTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.bounceBitTestnet = (0, defineChain_js_1.defineChain)({
    id: 6000,
    name: 'BounceBit Testnet',
    nativeCurrency: { name: 'BounceBit', symbol: 'BB', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://fullnode-testnet.bouncebitapi.com'] },
    },
    blockExplorers: {
        default: {
            name: 'BB Scan',
            url: 'https://testnet.bbscan.io',
        },
    },
    testnet: true,
});
//# sourceMappingURL=bounceBitTestnet.js.map