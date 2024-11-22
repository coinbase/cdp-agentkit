"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xrSepolia = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.xrSepolia = (0, defineChain_js_1.defineChain)({
    id: 2730,
    name: 'XR Sepolia',
    nativeCurrency: {
        decimals: 18,
        name: 'tXR',
        symbol: 'tXR',
    },
    rpcUrls: {
        default: { http: ['https://xr-sepolia-testnet.rpc.caldera.xyz/http'] },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://xr-sepolia-testnet.explorer.caldera.xyz',
        },
    },
    testnet: true,
});
//# sourceMappingURL=xrSepolia.js.map