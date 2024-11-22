"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.theta = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.theta = (0, defineChain_js_1.defineChain)({
    id: 361,
    name: 'Theta Mainnet',
    nativeCurrency: { name: 'TFUEL', symbol: 'TFUEL', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://eth-rpc-api.thetatoken.org/rpc'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Theta Explorer',
            url: 'https://explorer.thetatoken.org',
        },
    },
    testnet: false,
});
//# sourceMappingURL=theta.js.map