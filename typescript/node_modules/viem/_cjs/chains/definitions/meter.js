"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meter = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.meter = (0, defineChain_js_1.defineChain)({
    id: 82,
    name: 'Meter',
    nativeCurrency: {
        decimals: 18,
        name: 'MTR',
        symbol: 'MTR',
    },
    rpcUrls: {
        default: { http: ['https://rpc.meter.io'] },
    },
    blockExplorers: {
        default: {
            name: 'MeterScan',
            url: 'https://scan.meter.io',
        },
    },
});
//# sourceMappingURL=meter.js.map