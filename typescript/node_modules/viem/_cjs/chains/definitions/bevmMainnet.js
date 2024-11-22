"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bevmMainnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.bevmMainnet = (0, defineChain_js_1.defineChain)({
    id: 11501,
    name: 'BEVM Mainnet',
    nativeCurrency: { name: 'Bitcoin', symbol: 'BTC', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc-mainnet-1.bevm.io'] },
    },
    blockExplorers: {
        default: {
            name: 'Bevmscan',
            url: 'https://scan-mainnet.bevm.io',
            apiUrl: 'https://scan-mainnet-api.bevm.io/api',
        },
    },
});
//# sourceMappingURL=bevmMainnet.js.map