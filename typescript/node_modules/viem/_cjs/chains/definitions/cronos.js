"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronos = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.cronos = (0, defineChain_js_1.defineChain)({
    id: 25,
    name: 'Cronos Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Cronos',
        symbol: 'CRO',
    },
    rpcUrls: {
        default: { http: ['https://evm.cronos.org'] },
    },
    blockExplorers: {
        default: {
            name: 'Cronos Explorer',
            url: 'https://explorer.cronos.org',
            apiUrl: 'https://explorer-api.cronos.org/mainnet/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 1963112,
        },
    },
});
//# sourceMappingURL=cronos.js.map