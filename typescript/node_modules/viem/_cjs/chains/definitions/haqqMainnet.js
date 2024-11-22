"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.haqqMainnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.haqqMainnet = (0, defineChain_js_1.defineChain)({
    id: 11235,
    name: 'HAQQ Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Islamic Coin',
        symbol: 'ISLM',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.eth.haqq.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'HAQQ Explorer',
            url: 'https://explorer.haqq.network',
            apiUrl: 'https://explorer.haqq.network/api',
        },
    },
});
//# sourceMappingURL=haqqMainnet.js.map