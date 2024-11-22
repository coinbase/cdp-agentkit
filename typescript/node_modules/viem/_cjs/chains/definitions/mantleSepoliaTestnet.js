"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mantleSepoliaTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.mantleSepoliaTestnet = (0, defineChain_js_1.defineChain)({
    id: 5003,
    name: 'Mantle Sepolia Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'MNT',
        symbol: 'MNT',
    },
    rpcUrls: {
        default: { http: ['https://rpc.sepolia.mantle.xyz'] },
    },
    blockExplorers: {
        default: {
            name: 'Mantle Testnet Explorer',
            url: 'https://explorer.sepolia.mantle.xyz/',
            apiUrl: 'https://explorer.sepolia.mantle.xyz/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 4584012,
        },
    },
    testnet: true,
});
//# sourceMappingURL=mantleSepoliaTestnet.js.map