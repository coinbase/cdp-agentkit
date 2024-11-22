"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yooldoVerse = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.yooldoVerse = (0, defineChain_js_1.defineChain)({
    id: 50_005,
    name: 'Yooldo Verse',
    nativeCurrency: { name: 'OAS', symbol: 'OAS', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.yooldo-verse.xyz'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Yooldo Verse Explorer',
            url: 'https://explorer.yooldo-verse.xyz',
        },
    },
});
//# sourceMappingURL=yooldoVerse.js.map