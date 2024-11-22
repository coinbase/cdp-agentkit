"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visionTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.visionTestnet = (0, defineChain_js_1.defineChain)({
    id: 666666,
    name: 'Vision Testnet',
    nativeCurrency: { name: 'VISION', symbol: 'VS', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://vpioneer.infragrid.v.network/ethereum/compatible'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Vision Scan',
            url: 'https://visionscan.org/?chain=vpioneer',
        },
    },
    testnet: true,
});
//# sourceMappingURL=visionTestnet.js.map