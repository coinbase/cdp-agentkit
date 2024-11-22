"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueOpal = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.uniqueOpal = (0, defineChain_js_1.defineChain)({
    id: 8882,
    name: 'Opal Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'OPL',
        symbol: 'OPL',
    },
    rpcUrls: {
        default: { http: ['https://rpc-opal.unique.network'] },
    },
    blockExplorers: {
        default: {
            name: 'Opal Subscan',
            url: 'https://opal.subscan.io/',
        },
    },
    testnet: true,
});
//# sourceMappingURL=uniqueOpal.js.map