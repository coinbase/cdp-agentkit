"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sapphireTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.sapphireTestnet = (0, defineChain_js_1.defineChain)({
    id: 23295,
    name: 'Oasis Sapphire Testnet',
    network: 'sapphire-testnet',
    nativeCurrency: { name: 'Sapphire Test Rose', symbol: 'TEST', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://testnet.sapphire.oasis.dev'],
            webSocket: ['wss://testnet.sapphire.oasis.dev/ws'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Oasis Explorer',
            url: 'https://explorer.oasis.io/testnet/sapphire',
        },
    },
    testnet: true,
});
//# sourceMappingURL=sapphireTestnet.js.map