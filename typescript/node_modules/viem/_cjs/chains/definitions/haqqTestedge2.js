"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.haqqTestedge2 = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.haqqTestedge2 = (0, defineChain_js_1.defineChain)({
    id: 54211,
    name: 'HAQQ Testedge 2',
    nativeCurrency: {
        decimals: 18,
        name: 'Islamic Coin',
        symbol: 'ISLMT',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.eth.testedge2.haqq.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'HAQQ Explorer',
            url: 'https://explorer.testedge2.haqq.network',
            apiUrl: 'https://explorer.testedge2.haqq.network/api',
        },
    },
});
//# sourceMappingURL=haqqTestedge2.js.map