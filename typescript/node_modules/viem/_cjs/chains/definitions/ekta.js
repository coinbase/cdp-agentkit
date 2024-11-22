"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ekta = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.ekta = (0, defineChain_js_1.defineChain)({
    id: 1994,
    name: 'Ekta',
    nativeCurrency: {
        decimals: 18,
        name: 'EKTA',
        symbol: 'EKTA',
    },
    rpcUrls: {
        default: { http: ['https://main.ekta.io'] },
    },
    blockExplorers: {
        default: {
            name: 'Ektascan',
            url: 'https://ektascan.io',
            apiUrl: 'https://ektascan.io/api',
        },
    },
});
//# sourceMappingURL=ekta.js.map