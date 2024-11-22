"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swanProximaTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.swanProximaTestnet = (0, defineChain_js_1.defineChain)({
    id: 20241133,
    name: 'Swan Proxima Testnet',
    nativeCurrency: { name: 'Swan Ether', symbol: 'sETH', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc-proxima.swanchain.io	'] },
    },
    blockExplorers: {
        default: {
            name: 'Swan Explorer',
            url: 'https://proxima-explorer.swanchain.io',
        },
    },
    testnet: true,
});
//# sourceMappingURL=swanProximaTestnet.js.map