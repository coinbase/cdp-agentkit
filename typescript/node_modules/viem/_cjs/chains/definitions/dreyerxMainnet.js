"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dreyerxMainnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.dreyerxMainnet = (0, defineChain_js_1.defineChain)({
    id: 23451,
    name: 'DreyerX Mainnet',
    nativeCurrency: {
        name: 'DreyerX',
        symbol: 'DRX',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.dreyerx.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'DreyerX Scan',
            url: 'https://scan.dreyerx.com',
        },
    },
});
//# sourceMappingURL=dreyerxMainnet.js.map