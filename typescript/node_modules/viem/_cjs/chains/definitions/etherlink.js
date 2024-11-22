"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.etherlink = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.etherlink = (0, defineChain_js_1.defineChain)({
    id: 42793,
    name: 'Etherlink',
    nativeCurrency: {
        decimals: 18,
        name: 'Tez',
        symbol: 'XTZ',
    },
    rpcUrls: {
        default: { http: ['https://node.mainnet.etherlink.com'] },
    },
    blockExplorers: {
        default: {
            name: 'Etherlink',
            url: 'https://explorer.etherlink.com',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 33899,
        },
    },
});
//# sourceMappingURL=etherlink.js.map