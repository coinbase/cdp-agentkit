"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elastosTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.elastosTestnet = (0, defineChain_js_1.defineChain)({
    id: 21,
    name: 'Elastos Smart Chain Testnet',
    nativeCurrency: { name: 'tELA', symbol: 'tELA', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://api-testnet.elastos.io/eth'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Elastos Explorer',
            url: 'https://esc-testnet.elastos.io',
        },
    },
    testnet: true,
});
//# sourceMappingURL=elastosTestnet.js.map