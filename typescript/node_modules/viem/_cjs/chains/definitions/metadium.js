"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadium = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.metadium = (0, defineChain_js_1.defineChain)({
    id: 11,
    name: 'Metadium Network',
    nativeCurrency: {
        decimals: 18,
        name: 'META',
        symbol: 'META',
    },
    rpcUrls: {
        default: { http: ['https://api.metadium.com/prod'] },
    },
    blockExplorers: {
        default: {
            name: 'Metadium Explorer',
            url: 'https://explorer.metadium.com',
        },
    },
    testnet: false,
});
//# sourceMappingURL=metadium.js.map