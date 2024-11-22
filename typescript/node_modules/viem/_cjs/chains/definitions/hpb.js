"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hpb = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.hpb = (0, defineChain_js_1.defineChain)({
    id: 269,
    name: 'High Performance Blockchain',
    nativeCurrency: { name: 'HPB', symbol: 'HPB', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://hpbnode.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'hpbScan',
            url: 'https://hscan.org',
        },
    },
    testnet: false,
});
//# sourceMappingURL=hpb.js.map