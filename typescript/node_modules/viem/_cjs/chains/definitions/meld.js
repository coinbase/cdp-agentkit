"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meld = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.meld = (0, defineChain_js_1.defineChain)({
    id: 333000333,
    name: 'Meld',
    nativeCurrency: {
        decimals: 18,
        name: 'Meld',
        symbol: 'MELD',
    },
    rpcUrls: {
        default: { http: ['https://rpc-1.meld.com'] },
    },
    blockExplorers: {
        default: { name: 'MELDscan', url: 'https://meldscan.io' },
    },
    contracts: {
        multicall3: {
            address: '0x769ee5a8e82c15c1b6e358f62ac8eb6e3abe8dc5',
            blockCreated: 360069,
        },
    },
});
//# sourceMappingURL=meld.js.map