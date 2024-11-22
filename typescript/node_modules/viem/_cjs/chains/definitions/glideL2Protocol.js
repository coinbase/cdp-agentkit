"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.glideL2Protocol = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.glideL2Protocol = (0, defineChain_js_1.defineChain)({
    id: 253,
    name: 'Glide L2 Protocol XP',
    nativeCurrency: { name: 'GLXP', symbol: 'GLXP', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc-api.glideprotocol.xyz/l2-rpc'],
            webSocket: ['wss://rpc-api.glideprotocol.xyz/l2-rpc'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Glide Protocol Explore',
            url: 'https://blockchain-explorer.glideprotocol.xyz',
        },
    },
    testnet: false,
});
//# sourceMappingURL=glideL2Protocol.js.map