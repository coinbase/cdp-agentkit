"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hemiSepolia = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.hemiSepolia = (0, defineChain_js_1.defineChain)({
    id: 743111,
    name: 'Hemi Sepolia',
    network: 'Hemi Sepolia',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://testnet.rpc.hemi.network/rpc'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Hemi Sepolia explorer',
            url: 'https://testnet.explorer.hemi.xyz',
        },
    },
    testnet: true,
});
//# sourceMappingURL=hemiSepolia.js.map