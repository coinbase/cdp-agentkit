"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mantle = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.mantle = (0, defineChain_js_1.defineChain)({
    id: 5000,
    name: 'Mantle',
    nativeCurrency: {
        decimals: 18,
        name: 'MNT',
        symbol: 'MNT',
    },
    rpcUrls: {
        default: { http: ['https://rpc.mantle.xyz'] },
    },
    blockExplorers: {
        default: {
            name: 'Mantle Explorer',
            url: 'https://mantlescan.xyz/',
            apiUrl: 'https://api.mantlescan.xyz/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 304717,
        },
    },
});
//# sourceMappingURL=mantle.js.map