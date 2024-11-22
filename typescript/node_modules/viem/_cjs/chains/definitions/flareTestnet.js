"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flareTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.flareTestnet = (0, defineChain_js_1.defineChain)({
    id: 114,
    name: 'Flare Testnet Coston2',
    nativeCurrency: {
        decimals: 18,
        name: 'Coston2 Flare',
        symbol: 'C2FLR',
    },
    rpcUrls: {
        default: { http: ['https://coston2-api.flare.network/ext/C/rpc'] },
    },
    blockExplorers: {
        default: {
            name: 'Coston2 Explorer',
            url: 'https://coston2-explorer.flare.network',
            apiUrl: 'https://coston2-explorer.flare.network/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=flareTestnet.js.map