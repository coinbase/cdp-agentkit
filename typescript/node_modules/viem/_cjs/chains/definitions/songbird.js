"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.songbird = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.songbird = (0, defineChain_js_1.defineChain)({
    id: 19,
    name: 'Songbird Canary-Network',
    nativeCurrency: {
        decimals: 18,
        name: 'Songbird',
        symbol: 'SGB',
    },
    rpcUrls: {
        default: { http: ['https://songbird-api.flare.network/ext/C/rpc'] },
    },
    blockExplorers: {
        default: {
            name: 'Songbird Explorer',
            url: 'https://songbird-explorer.flare.network',
            apiUrl: 'https://songbird-explorer.flare.network/api',
        },
    },
});
//# sourceMappingURL=songbird.js.map