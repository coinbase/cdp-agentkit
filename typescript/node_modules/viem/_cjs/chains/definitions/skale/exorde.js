"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skaleExorde = void 0;
const defineChain_js_1 = require("../../../utils/chain/defineChain.js");
exports.skaleExorde = (0, defineChain_js_1.defineChain)({
    id: 2_139_927_552,
    name: 'SKALE | Exorde',
    nativeCurrency: { name: 'sFUEL', symbol: 'sFUEL', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://mainnet.skalenodes.com/v1/light-vast-diphda'],
            webSocket: ['wss://mainnet.skalenodes.com/v1/ws/light-vast-diphda'],
        },
    },
    blockExplorers: {
        default: {
            name: 'SKALE Explorer',
            url: 'https://light-vast-diphda.explorer.mainnet.skalenodes.com',
        },
    },
    contracts: {},
});
//# sourceMappingURL=exorde.js.map