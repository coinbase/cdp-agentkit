"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xdc = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.xdc = (0, defineChain_js_1.defineChain)({
    id: 50,
    name: 'XinFin Network',
    nativeCurrency: {
        decimals: 18,
        name: 'XDC',
        symbol: 'XDC',
    },
    rpcUrls: {
        default: { http: ['https://rpc.xdcrpc.com'] },
    },
    blockExplorers: {
        default: {
            name: 'XDCScan',
            url: 'https://xdcscan.com',
        },
    },
    contracts: {
        multicall3: {
            address: '0x0B1795ccA8E4eC4df02346a082df54D437F8D9aF',
            blockCreated: 75884020,
        },
    },
});
//# sourceMappingURL=xdc.js.map