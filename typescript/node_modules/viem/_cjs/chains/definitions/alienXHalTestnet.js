"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alienxHalTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.alienxHalTestnet = (0, defineChain_js_1.defineChain)({
    id: 10241025,
    name: 'ALIENX Hal Testnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://hal-rpc.alienxchain.io/http'] },
    },
    blockExplorers: {
        default: {
            name: 'AlienX Explorer',
            url: 'https://hal-explorer.alienxchain.io',
        },
    },
    testnet: true,
});
//# sourceMappingURL=alienXHalTestnet.js.map