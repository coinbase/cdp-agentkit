"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skaleRazor = void 0;
const defineChain_js_1 = require("../../../utils/chain/defineChain.js");
exports.skaleRazor = (0, defineChain_js_1.defineChain)({
    id: 278_611_351,
    name: 'SKALE | Razor Network',
    nativeCurrency: { name: 'sFUEL', symbol: 'sFUEL', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://mainnet.skalenodes.com/v1/turbulent-unique-scheat'],
            webSocket: ['wss://mainnet.skalenodes.com/v1/ws/turbulent-unique-scheat'],
        },
    },
    blockExplorers: {
        default: {
            name: 'SKALE Explorer',
            url: 'https://turbulent-unique-scheat.explorer.mainnet.skalenodes.com',
        },
    },
    contracts: {},
});
//# sourceMappingURL=razor.js.map