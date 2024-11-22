"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueQuartz = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.uniqueQuartz = (0, defineChain_js_1.defineChain)({
    id: 8881,
    name: 'Quartz Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'QTZ',
        symbol: 'QTZ',
    },
    rpcUrls: {
        default: { http: ['https://rpc-quartz.unique.network'] },
    },
    blockExplorers: {
        default: {
            name: 'Quartz Subscan',
            url: 'https://quartz.subscan.io/',
        },
    },
});
//# sourceMappingURL=uniqueQuartz.js.map