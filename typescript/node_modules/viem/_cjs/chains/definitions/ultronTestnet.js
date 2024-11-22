"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ultronTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.ultronTestnet = (0, defineChain_js_1.defineChain)({
    id: 1230,
    name: 'Ultron Testnet',
    nativeCurrency: { name: 'ULX', symbol: 'ULX', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://ultron-dev.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Ultron Scan',
            url: 'https://explorer.ultron-dev.io',
        },
    },
    testnet: true,
});
//# sourceMappingURL=ultronTestnet.js.map