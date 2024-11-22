"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ultron = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.ultron = (0, defineChain_js_1.defineChain)({
    id: 1231,
    name: 'Ultron Mainnet',
    nativeCurrency: { name: 'ULX', symbol: 'ULX', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://ultron-rpc.net'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Ultron Scan',
            url: 'https://ulxscan.com',
        },
    },
    testnet: false,
});
//# sourceMappingURL=ultron.js.map