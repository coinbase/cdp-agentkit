"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kardiaChain = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.kardiaChain = (0, defineChain_js_1.defineChain)({
    id: 24,
    name: 'KardiaChain Mainnet',
    nativeCurrency: { name: 'KAI', symbol: 'KAI', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.kardiachain.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'KardiaChain Explorer',
            url: 'https://explorer.kardiachain.io',
        },
    },
    testnet: false,
});
//# sourceMappingURL=kardiaChain.js.map