"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alienx = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.alienx = (0, defineChain_js_1.defineChain)({
    id: 10241024,
    name: 'AlienX Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc.alienxchain.io/http'] },
    },
    blockExplorers: {
        default: {
            name: 'AlienX Explorer',
            url: 'https://explorer.alienxchain.io',
        },
    },
    testnet: false,
});
//# sourceMappingURL=alienX.js.map