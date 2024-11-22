"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classic = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.classic = (0, defineChain_js_1.defineChain)({
    id: 61,
    name: 'Ethereum Classic',
    nativeCurrency: {
        decimals: 18,
        name: 'ETC',
        symbol: 'ETC',
    },
    rpcUrls: {
        default: { http: ['https://etc.rivet.link'] },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://blockscout.com/etc/mainnet',
        },
    },
});
//# sourceMappingURL=classic.js.map