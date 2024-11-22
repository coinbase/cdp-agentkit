"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wemixTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.wemixTestnet = (0, defineChain_js_1.defineChain)({
    id: 1112,
    name: 'WEMIX Testnet',
    network: 'wemix-testnet',
    nativeCurrency: { name: 'WEMIX', symbol: 'tWEMIX', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://api.test.wemix.com'] },
    },
    blockExplorers: {
        default: {
            name: 'wemixExplorer',
            url: 'https://testnet.wemixscan.com',
            apiUrl: 'https://testnet.wemixscan.com/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=wemixTestnet.js.map