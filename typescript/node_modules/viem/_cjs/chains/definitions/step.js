"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.step = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.step = (0, defineChain_js_1.defineChain)({
    id: 1234,
    name: 'Step Network',
    nativeCurrency: { name: 'FITFI', symbol: 'FITFI', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.step.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Step Scan',
            url: 'https://stepscan.io',
        },
    },
    testnet: false,
});
//# sourceMappingURL=step.js.map