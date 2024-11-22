"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.qMainnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.qMainnet = (0, defineChain_js_1.defineChain)({
    id: 35441,
    name: 'Q Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Q',
        symbol: 'Q',
    },
    rpcUrls: {
        default: { http: ['https://rpc.q.org'] },
    },
    blockExplorers: {
        default: {
            name: 'Q Mainnet Explorer',
            url: 'https://explorer.q.org',
            apiUrl: 'https://explorer.q.org/api',
        },
    },
});
//# sourceMappingURL=qMainnet.js.map