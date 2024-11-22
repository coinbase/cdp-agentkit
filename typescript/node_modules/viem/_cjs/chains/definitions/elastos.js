"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elastos = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.elastos = (0, defineChain_js_1.defineChain)({
    id: 20,
    name: 'Elastos Smart Chain',
    nativeCurrency: { name: 'ELA', symbol: 'ELA', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://api2.elastos.io/eth'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Elastos Explorer',
            url: 'https://esc.elastos.io',
        },
    },
    testnet: false,
});
//# sourceMappingURL=elastos.js.map