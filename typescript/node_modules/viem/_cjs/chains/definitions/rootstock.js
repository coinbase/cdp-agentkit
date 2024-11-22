"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootstock = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.rootstock = (0, defineChain_js_1.defineChain)({
    id: 30,
    name: 'Rootstock Mainnet',
    network: 'rootstock',
    nativeCurrency: {
        decimals: 18,
        name: 'Rootstock Bitcoin',
        symbol: 'RBTC',
    },
    rpcUrls: {
        default: { http: ['https://public-node.rsk.co'] },
    },
    blockExplorers: {
        default: {
            name: 'RSK Explorer',
            url: 'https://explorer.rsk.co',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 4249540,
        },
    },
});
//# sourceMappingURL=rootstock.js.map