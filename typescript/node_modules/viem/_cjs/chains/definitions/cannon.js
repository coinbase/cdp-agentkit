"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cannon = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.cannon = (0, defineChain_js_1.defineChain)({
    id: 13_370,
    name: 'Cannon',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: { http: ['http://127.0.0.1:8545'] },
    },
});
//# sourceMappingURL=cannon.js.map