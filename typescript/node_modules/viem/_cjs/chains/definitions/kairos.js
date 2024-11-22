"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kairos = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.kairos = (0, defineChain_js_1.defineChain)({
    id: 1_001,
    name: 'Kairos Testnet',
    network: 'kairos',
    nativeCurrency: {
        decimals: 18,
        name: 'Kairos KAIA',
        symbol: 'KAIA',
    },
    rpcUrls: {
        default: { http: ['https://public-en-kairos.node.kaia.io'] },
    },
    blockExplorers: {
        default: {
            name: 'KaiaScan',
            url: 'https://kairos.kaiascan.io',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 123390593,
        },
    },
    testnet: true,
});
//# sourceMappingURL=kairos.js.map