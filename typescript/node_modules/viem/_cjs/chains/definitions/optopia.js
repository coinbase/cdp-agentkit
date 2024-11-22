"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optopia = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.optopia = (0, defineChain_js_1.defineChain)({
    id: 62050,
    name: 'Optopia',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc-mainnet.optopia.ai'] },
    },
    blockExplorers: {
        default: {
            name: 'Optopia Explorer',
            url: 'https://scan.optopia.ai',
        },
    },
    testnet: false,
});
//# sourceMappingURL=optopia.js.map