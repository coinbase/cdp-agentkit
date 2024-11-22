"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zkLinkNovaSepoliaTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.zkLinkNovaSepoliaTestnet = (0, defineChain_js_1.defineChain)({
    id: 810181,
    name: 'zkLink Nova Sepolia Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'ETH',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: { http: ['https://sepolia.rpc.zklink.io'] },
    },
    blockExplorers: {
        default: {
            name: 'zkLink Nova Block Explorer',
            url: 'https://sepolia.explorer.zklink.io',
        },
    },
});
//# sourceMappingURL=zkLinkNovaSepoliaTestnet.js.map