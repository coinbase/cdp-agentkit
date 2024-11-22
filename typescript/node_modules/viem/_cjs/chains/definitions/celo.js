"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.celo = void 0;
const chainConfig_js_1 = require("../../celo/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.celo = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 42_220,
    name: 'Celo',
    nativeCurrency: {
        decimals: 18,
        name: 'CELO',
        symbol: 'CELO',
    },
    rpcUrls: {
        default: { http: ['https://forno.celo.org'] },
    },
    blockExplorers: {
        default: {
            name: 'Celo Explorer',
            url: 'https://celoscan.io',
            apiUrl: 'https://api.celoscan.io/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 13112599,
        },
    },
    testnet: false,
});
//# sourceMappingURL=celo.js.map