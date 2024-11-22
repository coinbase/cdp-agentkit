"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.astar = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.astar = (0, defineChain_js_1.defineChain)({
    id: 592,
    name: 'Astar',
    network: 'astar-mainnet',
    nativeCurrency: {
        name: 'Astar',
        symbol: 'ASTR',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ['https://astar.api.onfinality.io/public'] },
    },
    blockExplorers: {
        default: {
            name: 'Astar Subscan',
            url: 'https://astar.subscan.io',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 761794,
        },
    },
    testnet: false,
});
//# sourceMappingURL=astar.js.map