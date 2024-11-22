"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fusionTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.fusionTestnet = (0, defineChain_js_1.defineChain)({
    id: 46688,
    name: 'Fusion Testnet',
    nativeCurrency: { name: 'Fusion', symbol: 'FSN', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://testnet.fusionnetwork.io'],
            webSocket: ['wss://testnet.fusionnetwork.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'FSNscan',
            url: 'https://testnet.fsnscan.com',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 10428309,
        },
    },
    testnet: true,
});
//# sourceMappingURL=fusionTestnet.js.map