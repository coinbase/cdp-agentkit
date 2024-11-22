"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mantleTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.mantleTestnet = (0, defineChain_js_1.defineChain)({
    id: 5001,
    name: 'Mantle Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'MNT',
        symbol: 'MNT',
    },
    rpcUrls: {
        default: { http: ['https://rpc.testnet.mantle.xyz'] },
    },
    blockExplorers: {
        default: {
            name: 'Mantle Testnet Explorer',
            url: 'https://explorer.testnet.mantle.xyz',
            apiUrl: 'https://explorer.testnet.mantle.xyz/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 561333,
        },
    },
    testnet: true,
});
//# sourceMappingURL=mantleTestnet.js.map