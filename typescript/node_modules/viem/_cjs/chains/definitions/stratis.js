"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stratis = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.stratis = (0, defineChain_js_1.defineChain)({
    id: 105105,
    name: 'Stratis Mainnet',
    network: 'stratis',
    nativeCurrency: {
        name: 'Stratis',
        symbol: 'STRAX',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.stratisevm.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Stratis Explorer',
            url: 'https://explorer.stratisevm.com',
        },
    },
});
//# sourceMappingURL=stratis.js.map