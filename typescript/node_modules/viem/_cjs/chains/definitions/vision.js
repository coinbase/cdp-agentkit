"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vision = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.vision = (0, defineChain_js_1.defineChain)({
    id: 888888,
    name: 'Vision',
    nativeCurrency: { name: 'VISION', symbol: 'VS', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://infragrid.v.network/ethereum/compatible'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Vision Scan',
            url: 'https://visionscan.org',
        },
    },
    testnet: false,
});
//# sourceMappingURL=vision.js.map