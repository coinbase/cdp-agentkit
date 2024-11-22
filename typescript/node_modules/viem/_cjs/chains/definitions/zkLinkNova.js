"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zkLinkNova = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.zkLinkNova = (0, defineChain_js_1.defineChain)({
    id: 810180,
    name: 'zkLink Nova',
    nativeCurrency: {
        decimals: 18,
        name: 'ETH',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: { http: ['https://rpc.zklink.io'] },
    },
    blockExplorers: {
        default: {
            name: 'zkLink Nova Block Explorer',
            url: 'https://explorer.zklink.io',
        },
    },
});
//# sourceMappingURL=zkLinkNova.js.map