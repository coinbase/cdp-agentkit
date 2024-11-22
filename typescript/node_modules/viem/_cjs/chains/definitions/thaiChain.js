"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thaiChain = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.thaiChain = (0, defineChain_js_1.defineChain)({
    id: 7,
    name: 'ThaiChain',
    nativeCurrency: { name: 'TCH', symbol: 'TCH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.thaichain.org'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://exp.thaichain.org',
            apiUrl: 'https://exp.thaichain.org/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0x0DaD6130e832c21719C5CE3bae93454E16A84826',
            blockCreated: 4806386,
        },
    },
    testnet: false,
});
//# sourceMappingURL=thaiChain.js.map