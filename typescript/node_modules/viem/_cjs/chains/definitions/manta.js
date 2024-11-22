"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manta = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.manta = (0, defineChain_js_1.defineChain)({
    id: 169,
    name: 'Manta Pacific Mainnet',
    network: 'manta',
    nativeCurrency: {
        decimals: 18,
        name: 'ETH',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: { http: ['https://pacific-rpc.manta.network/http'] },
    },
    blockExplorers: {
        default: {
            name: 'Manta Explorer',
            url: 'https://pacific-explorer.manta.network',
            apiUrl: 'https://pacific-explorer.manta.network/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 332890,
        },
    },
});
//# sourceMappingURL=manta.js.map