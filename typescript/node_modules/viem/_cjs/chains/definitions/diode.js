"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diode = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.diode = (0, defineChain_js_1.defineChain)({
    id: 15,
    name: 'Diode Prenet',
    nativeCurrency: {
        decimals: 18,
        name: 'DIODE',
        symbol: 'DIODE',
    },
    rpcUrls: {
        default: {
            http: ['https://prenet.diode.io:8443'],
            webSocket: ['wss://prenet.diode.io:8443/ws'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Diode Explorer',
            url: 'https://diode.io/prenet',
        },
    },
    testnet: false,
});
//# sourceMappingURL=diode.js.map