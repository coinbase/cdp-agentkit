"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ektaTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.ektaTestnet = (0, defineChain_js_1.defineChain)({
    id: 1004,
    name: 'Ekta Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'EKTA',
        symbol: 'EKTA',
    },
    rpcUrls: {
        default: { http: ['https://test.ekta.io:8545'] },
    },
    blockExplorers: {
        default: {
            name: 'Test Ektascan',
            url: 'https://test.ektascan.io',
            apiUrl: 'https://test.ektascan.io/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=ektaTestnet.js.map