"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.telosTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.telosTestnet = (0, defineChain_js_1.defineChain)({
    id: 41,
    name: 'Telos',
    nativeCurrency: {
        decimals: 18,
        name: 'Telos',
        symbol: 'TLOS',
    },
    rpcUrls: {
        default: { http: ['https://testnet.telos.net/evm'] },
    },
    blockExplorers: {
        default: {
            name: 'Teloscan (testnet)',
            url: 'https://testnet.teloscan.io/',
        },
    },
    testnet: true,
});
//# sourceMappingURL=telosTestnet.js.map