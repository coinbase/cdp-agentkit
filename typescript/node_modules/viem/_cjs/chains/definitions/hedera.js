"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hedera = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.hedera = (0, defineChain_js_1.defineChain)({
    id: 295,
    name: 'Hedera Mainnet',
    network: 'hedera-mainnet',
    nativeCurrency: {
        symbol: 'HBAR',
        name: 'HBAR',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://mainnet.hashio.io/api'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Hashscan',
            url: 'https://hashscan.io/mainnet',
        },
    },
    testnet: false,
});
//# sourceMappingURL=hedera.js.map