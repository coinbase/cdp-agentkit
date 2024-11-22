"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.victionTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.victionTestnet = (0, defineChain_js_1.defineChain)({
    id: 89,
    name: 'Viction Testnet',
    nativeCurrency: { name: 'Viction', symbol: 'VIC', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc-testnet.viction.xyz'],
        },
    },
    blockExplorers: {
        default: {
            name: 'VIC Scan',
            url: 'https://testnet.vicscan.xyz',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 12170179,
        },
    },
    testnet: true,
});
//# sourceMappingURL=victionTestnet.js.map