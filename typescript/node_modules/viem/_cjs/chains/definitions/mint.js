"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mint = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.mint = (0, defineChain_js_1.defineChain)({
    id: 185,
    name: 'Mint Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.mintchain.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Mintchain explorer',
            url: 'https://explorer.mintchain.io',
        },
    },
    testnet: false,
});
//# sourceMappingURL=mint.js.map