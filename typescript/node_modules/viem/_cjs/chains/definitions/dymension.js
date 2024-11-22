"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dymension = void 0;
const utils_js_1 = require("../utils.js");
exports.dymension = (0, utils_js_1.defineChain)({
    id: 1100,
    name: 'Dymension',
    nativeCurrency: {
        name: 'DYM',
        symbol: 'DYM',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://dymension-evm-rpc.publicnode.com'],
            webSocket: ['wss://dymension-evm-rpc.publicnode.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Dym FYI',
            url: 'https://dym.fyi',
        },
    },
    testnet: false,
});
//# sourceMappingURL=dymension.js.map