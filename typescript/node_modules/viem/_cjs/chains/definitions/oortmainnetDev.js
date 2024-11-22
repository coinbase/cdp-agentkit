"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oortMainnetDev = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.oortMainnetDev = (0, defineChain_js_1.defineChain)({
    id: 9700,
    name: 'OORT MainnetDev',
    nativeCurrency: {
        decimals: 18,
        name: 'OORT',
        symbol: 'OORT',
    },
    rpcUrls: {
        default: { http: ['https://dev-rpc.oortech.com'] },
    },
    blockExplorers: {
        default: {
            name: 'OORT MainnetDev Explorer',
            url: 'https://dev-scan.oortech.com',
        },
    },
});
//# sourceMappingURL=oortmainnetDev.js.map