"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hychain = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.hychain = (0, defineChain_js_1.defineChain)({
    id: 2911,
    name: 'HYCHAIN',
    nativeCurrency: { name: 'HYTOPIA', symbol: 'TOPIA', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc.hychain.com/http'] },
    },
    blockExplorers: {
        default: {
            name: 'HYCHAIN Explorer',
            url: 'https://explorer.hychain.com',
        },
    },
    testnet: false,
});
//# sourceMappingURL=hychain.js.map