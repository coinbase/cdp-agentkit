"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yooldoVerseTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.yooldoVerseTestnet = (0, defineChain_js_1.defineChain)({
    id: 50_006,
    name: 'Yooldo Verse Testnet',
    nativeCurrency: { name: 'OAS', symbol: 'OAS', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.testnet.yooldo-verse.xyz'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Yooldo Verse Testnet Explorer',
            url: 'https://explorer.testnet.yooldo-verse.xyz',
        },
    },
    testnet: true,
});
//# sourceMappingURL=yooldoVerseTestnet.js.map