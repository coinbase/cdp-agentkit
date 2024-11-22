"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneWorld = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.oneWorld = (0, defineChain_js_1.defineChain)({
    id: 309075,
    name: 'One World Chain Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'OWCT',
        symbol: 'OWCT',
    },
    rpcUrls: {
        default: { http: ['https://mainnet-rpc.oneworldchain.org'] },
    },
    blockExplorers: {
        default: {
            name: 'One World Explorer',
            url: 'https://mainnet.oneworldchain.org',
        },
    },
    testnet: false,
});
//# sourceMappingURL=oneWorld.js.map