"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapProtocol = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.mapProtocol = (0, defineChain_js_1.defineChain)({
    id: 22776,
    name: 'MAP Protocol',
    nativeCurrency: {
        decimals: 18,
        name: 'MAPO',
        symbol: 'MAPO',
    },
    rpcUrls: {
        default: { http: ['https://rpc.maplabs.io'] },
    },
    blockExplorers: {
        default: {
            name: 'MAPO Scan',
            url: 'https://maposcan.io',
        },
    },
    testnet: false,
});
//# sourceMappingURL=mapProtocol.js.map