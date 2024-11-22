"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fusion = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.fusion = (0, defineChain_js_1.defineChain)({
    id: 32659,
    name: 'Fusion Mainnet',
    nativeCurrency: { name: 'Fusion', symbol: 'FSN', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://mainnet.fusionnetwork.io'],
            webSocket: ['wss://mainnet.fusionnetwork.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'FSNscan',
            url: 'https://fsnscan.com',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 10441605,
        },
    },
    testnet: false,
});
//# sourceMappingURL=fusion.js.map