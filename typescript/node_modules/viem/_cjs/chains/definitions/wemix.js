"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wemix = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.wemix = (0, defineChain_js_1.defineChain)({
    id: 1111,
    name: 'WEMIX',
    network: 'wemix-mainnet',
    nativeCurrency: { name: 'WEMIX', symbol: 'WEMIX', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://api.wemix.com'] },
    },
    blockExplorers: {
        default: {
            name: 'wemixExplorer',
            url: 'https://explorer.wemix.com',
        },
    },
});
//# sourceMappingURL=wemix.js.map