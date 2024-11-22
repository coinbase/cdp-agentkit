"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.curtis = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.curtis = (0, defineChain_js_1.defineChain)({
    id: 33_111,
    name: 'Curtis',
    nativeCurrency: { name: 'ApeCoin', symbol: 'APE', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.curtis.apechain.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Curtis Explorer',
            url: 'https://explorer.curtis.apechain.com',
        },
    },
    testnet: true,
});
//# sourceMappingURL=curtis.js.map