"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meterTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.meterTestnet = (0, defineChain_js_1.defineChain)({
    id: 83,
    name: 'Meter Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'MTR',
        symbol: 'MTR',
    },
    rpcUrls: {
        default: { http: ['https://rpctest.meter.io'] },
    },
    blockExplorers: {
        default: {
            name: 'MeterTestnetScan',
            url: 'https://scan-warringstakes.meter.io',
        },
    },
});
//# sourceMappingURL=meterTestnet.js.map