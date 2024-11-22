"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edgelessTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.edgelessTestnet = (0, defineChain_js_1.defineChain)({
    id: 202,
    name: 'Edgeless Testnet',
    nativeCurrency: {
        name: 'Edgeless Wrapped ETH',
        symbol: 'EwETH',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://edgeless-testnet.rpc.caldera.xyz/http'],
            webSocket: ['wss://edgeless-testnet.rpc.caldera.xyz/ws'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Edgeless Testnet Explorer',
            url: 'https://testnet.explorer.edgeless.network',
        },
    },
});
//# sourceMappingURL=edgelessTestnet.js.map