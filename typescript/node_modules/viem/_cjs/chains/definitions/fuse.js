"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fuse = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.fuse = (0, defineChain_js_1.defineChain)({
    id: 122,
    name: 'Fuse',
    nativeCurrency: { name: 'Fuse', symbol: 'FUSE', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc.fuse.io'] },
    },
    blockExplorers: {
        default: {
            name: 'Fuse Explorer',
            url: 'https://explorer.fuse.io',
            apiUrl: 'https://explorer.fuse.io/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 16146628,
        },
    },
});
//# sourceMappingURL=fuse.js.map