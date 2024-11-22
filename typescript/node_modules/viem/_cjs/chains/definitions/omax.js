"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omax = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.omax = (0, defineChain_js_1.defineChain)({
    id: 311,
    name: 'Omax Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'OMAX',
        symbol: 'OMAX',
    },
    rpcUrls: {
        default: { http: ['https://mainapi.omaxray.com'] },
    },
    blockExplorers: {
        default: {
            name: 'Omax Explorer',
            url: 'https://omaxscan.com',
        },
    },
    testnet: false,
});
//# sourceMappingURL=omax.js.map