"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hederaTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.hederaTestnet = (0, defineChain_js_1.defineChain)({
    id: 296,
    name: 'Hedera Testnet',
    network: 'hedera-testnet',
    nativeCurrency: {
        symbol: 'HBAR',
        name: 'HBAR',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://testnet.hashio.io/api'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Hashscan',
            url: 'https://hashscan.io/testnet',
        },
    },
    testnet: true,
});
//# sourceMappingURL=hederaTestnet.js.map