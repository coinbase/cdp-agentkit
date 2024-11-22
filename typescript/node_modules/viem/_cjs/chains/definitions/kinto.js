"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kinto = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.kinto = (0, defineChain_js_1.defineChain)({
    id: 7887,
    name: 'Kinto Mainnet',
    network: 'Kinto Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc.kinto.xyz/http'] },
    },
    blockExplorers: {
        default: {
            name: 'Kinto Explorer',
            url: 'https://explorer.kinto.xyz',
        },
    },
    testnet: false,
});
//# sourceMappingURL=kinto.js.map