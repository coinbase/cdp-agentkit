"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superlumio = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.superlumio = (0, defineChain_js_1.defineChain)({
    id: 8866,
    name: 'SuperLumio',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://mainnet.lumio.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Lumio explorer',
            url: 'https://explorer.lumio.io',
        },
    },
    testnet: false,
});
//# sourceMappingURL=superlumio.js.map