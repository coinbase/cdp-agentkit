"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bifrost = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.bifrost = (0, defineChain_js_1.defineChain)({
    id: 3068,
    name: 'Bifrost Mainnet',
    nativeCurrency: { name: 'BFC', symbol: 'BFC', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://public-01.mainnet.bifrostnetwork.com/rpc'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Bifrost Blockscout',
            url: 'https://explorer.mainnet.bifrostnetwork.com',
        },
    },
    testnet: false,
});
//# sourceMappingURL=bifrost.js.map