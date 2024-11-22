"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.satoshiVMTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.satoshiVMTestnet = (0, defineChain_js_1.defineChain)({
    id: 3110,
    name: 'SatoshiVM Testnet',
    nativeCurrency: {
        name: 'BTC',
        symbol: 'BTC',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ['https://test-rpc-node-http.svmscan.io'] },
    },
    blockExplorers: {
        default: {
            name: 'blockscout',
            url: 'https://testnet.svmscan.io',
            apiUrl: 'https://testnet.svmscan.io/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=satoshivmTestnet.js.map