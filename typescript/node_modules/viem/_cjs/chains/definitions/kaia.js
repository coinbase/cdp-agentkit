"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kaia = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.kaia = (0, defineChain_js_1.defineChain)({
    id: 8_217,
    name: 'Kaia',
    nativeCurrency: {
        decimals: 18,
        name: 'Kaia',
        symbol: 'KAIA',
    },
    rpcUrls: {
        default: { http: ['https://public-en.node.kaia.io'] },
    },
    blockExplorers: {
        default: {
            name: 'KaiaScan',
            url: 'https://kaiascan.io',
            apiUrl: 'https://api-cypress.klaytnscope.com/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 96002415,
        },
    },
});
//# sourceMappingURL=kaia.js.map