"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expanse = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.expanse = (0, defineChain_js_1.defineChain)({
    id: 2,
    name: 'Expanse Network',
    nativeCurrency: {
        decimals: 18,
        name: 'EXP',
        symbol: 'EXP',
    },
    rpcUrls: {
        default: { http: ['https://node.expanse.tech'] },
    },
    blockExplorers: {
        default: {
            name: 'Expanse Explorer',
            url: 'https://explorer.expanse.tech',
        },
    },
    testnet: false,
});
//# sourceMappingURL=expanse.js.map