"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jbc = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.jbc = (0, defineChain_js_1.defineChain)({
    id: 8899,
    name: 'JIBCHAIN L1',
    network: 'jbc',
    nativeCurrency: { name: 'JBC', symbol: 'JBC', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc-l1.jibchain.net'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://exp-l1.jibchain.net',
            apiUrl: 'https://exp-l1.jibchain.net/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xc0C8C486D1466C57Efe13C2bf000d4c56F47CBdC',
            blockCreated: 2299048,
        },
    },
    testnet: false,
});
//# sourceMappingURL=jbc.js.map