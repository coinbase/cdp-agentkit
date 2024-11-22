"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mchVerse = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.mchVerse = (0, defineChain_js_1.defineChain)({
    id: 29548,
    name: 'MCH Verse',
    nativeCurrency: { name: 'Oasys', symbol: 'OAS', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.oasys.mycryptoheroes.net'],
        },
    },
    blockExplorers: {
        default: {
            name: 'MCH Verse Explorer',
            url: 'https://explorer.oasys.mycryptoheroes.net',
            apiUrl: 'https://explorer.oasys.mycryptoheroes.net/api',
        },
    },
    testnet: false,
});
//# sourceMappingURL=mchVerse.js.map