"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viction = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.viction = (0, defineChain_js_1.defineChain)({
    id: 88,
    name: 'Viction',
    nativeCurrency: { name: 'Viction', symbol: 'VIC', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.viction.xyz'],
        },
    },
    blockExplorers: {
        default: {
            name: 'VIC Scan',
            url: 'https://vicscan.xyz',
        },
    },
    testnet: false,
});
//# sourceMappingURL=viction.js.map