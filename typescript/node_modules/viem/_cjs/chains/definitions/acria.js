"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acria = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.acria = (0, defineChain_js_1.defineChain)({
    id: 47,
    name: 'Acria IntelliChain',
    nativeCurrency: {
        decimals: 18,
        name: 'ACRIA',
        symbol: 'ACRIA',
    },
    rpcUrls: {
        default: {
            http: ['https://aic.acria.ai'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Acria Explorer',
            url: 'https://explorer.acria.ai',
        },
    },
    testnet: false,
});
//# sourceMappingURL=acria.js.map