"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchain = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.matchain = (0, defineChain_js_1.defineChain)({
    id: 698,
    name: 'Matchain',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ['https://rpc.matchain.io'] },
    },
    blockExplorers: {
        default: {
            name: 'Matchain Scan',
            url: 'https://matchscan.io',
        },
    },
});
//# sourceMappingURL=matchain.js.map