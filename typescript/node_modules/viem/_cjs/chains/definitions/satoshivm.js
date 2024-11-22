"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.satoshiVM = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.satoshiVM = (0, defineChain_js_1.defineChain)({
    id: 3109,
    name: 'SatoshiVM Alpha Mainnet',
    nativeCurrency: {
        name: 'BTC',
        symbol: 'BTC',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ['https://alpha-rpc-node-http.svmscan.io'] },
    },
    blockExplorers: {
        default: {
            name: 'blockscout',
            url: 'https://svmscan.io',
            apiUrl: 'https://svmscan.io/api',
        },
    },
});
//# sourceMappingURL=satoshivm.js.map