"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.songbirdTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.songbirdTestnet = (0, defineChain_js_1.defineChain)({
    id: 16,
    name: 'Songbird Testnet Coston',
    nativeCurrency: {
        decimals: 18,
        name: 'Coston Flare',
        symbol: 'CFLR',
    },
    rpcUrls: {
        default: { http: ['https://coston-api.flare.network/ext/C/rpc'] },
    },
    blockExplorers: {
        default: {
            name: 'Coston Explorer',
            url: 'https://coston-explorer.flare.network',
            apiUrl: 'https://coston-explorer.flare.network/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=songbirdTestnet.js.map