"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edgeless = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.edgeless = (0, defineChain_js_1.defineChain)({
    id: 2_026,
    name: 'Edgeless Network',
    nativeCurrency: {
        name: 'Edgeless Wrapped ETH',
        symbol: 'EwETH',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.edgeless.network/http'],
            webSocket: ['wss://rpc.edgeless.network/ws'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Edgeless Explorer',
            url: 'https://explorer.edgeless.network',
        },
    },
});
//# sourceMappingURL=edgeless.js.map