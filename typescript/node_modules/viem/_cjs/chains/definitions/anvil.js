"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anvil = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.anvil = (0, defineChain_js_1.defineChain)({
    id: 31_337,
    name: 'Anvil',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['http://127.0.0.1:8545'],
            webSocket: ['ws://127.0.0.1:8545'],
        },
    },
});
//# sourceMappingURL=anvil.js.map