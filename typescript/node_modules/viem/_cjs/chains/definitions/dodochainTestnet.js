"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dodochainTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.dodochainTestnet = (0, defineChain_js_1.defineChain)({
    id: 53457,
    name: 'DODOchain Testnet',
    nativeCurrency: { decimals: 18, name: 'DODO', symbol: 'DODO' },
    rpcUrls: {
        default: {
            http: ['https://dodochain-testnet.alt.technology'],
            webSocket: ['wss://dodochain-testnet.alt.technology/ws'],
        },
    },
    blockExplorers: {
        default: {
            name: 'DODOchain Testnet (Sepolia) Explorer',
            url: 'https://testnet-scan.dodochain.com',
        },
    },
    testnet: true,
});
//# sourceMappingURL=dodochainTestnet.js.map