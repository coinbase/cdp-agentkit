"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eon = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.eon = (0, defineChain_js_1.defineChain)({
    id: 7_332,
    name: 'Horizen EON',
    nativeCurrency: {
        decimals: 18,
        name: 'ZEN',
        symbol: 'ZEN',
    },
    rpcUrls: {
        default: { http: ['https://eon-rpc.horizenlabs.io/ethv1'] },
    },
    blockExplorers: {
        default: {
            name: 'EON Explorer',
            url: 'https://eon-explorer.horizenlabs.io',
        },
    },
    contracts: {},
});
//# sourceMappingURL=eon.js.map