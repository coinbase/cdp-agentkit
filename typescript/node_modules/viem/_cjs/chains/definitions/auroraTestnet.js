"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auroraTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.auroraTestnet = (0, defineChain_js_1.defineChain)({
    id: 1313161555,
    name: 'Aurora Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: { http: ['https://testnet.aurora.dev'] },
    },
    blockExplorers: {
        default: {
            name: 'Aurorascan',
            url: 'https://testnet.aurorascan.dev',
            apiUrl: 'https://testnet.aurorascan.dev/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=auroraTestnet.js.map