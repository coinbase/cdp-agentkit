"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.botanixTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.botanixTestnet = (0, defineChain_js_1.defineChain)({
    id: 3636,
    name: 'Botanix Testnet',
    nativeCurrency: { name: 'Botanix', symbol: 'BTC', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://poa-node.botanixlabs.dev'],
        },
    },
    blockExplorers: {
        default: {
            name: 'blockscout',
            url: 'https://blockscout.botanixlabs.dev',
            apiUrl: 'https://blockscout.botanixlabs.dev',
        },
    },
    testnet: true,
});
//# sourceMappingURL=botanixTestnet.js.map