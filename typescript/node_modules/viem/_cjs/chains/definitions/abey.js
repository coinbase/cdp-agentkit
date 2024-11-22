"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abey = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.abey = (0, defineChain_js_1.defineChain)({
    id: 179,
    name: 'ABEY Mainnet',
    nativeCurrency: { name: 'ABEY', symbol: 'ABEY', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.abeychain.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Abey Scan',
            url: 'https://abeyscan.com',
        },
    },
    testnet: false,
});
//# sourceMappingURL=abey.js.map