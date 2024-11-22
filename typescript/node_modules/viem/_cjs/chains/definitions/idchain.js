"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idchain = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.idchain = (0, defineChain_js_1.defineChain)({
    id: 74,
    name: 'IDChain Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'EIDI',
        symbol: 'EIDI',
    },
    rpcUrls: {
        default: {
            http: ['https://idchain.one/rpc'],
            webSocket: ['wss://idchain.one/ws'],
        },
    },
    blockExplorers: {
        default: {
            name: 'IDChain Explorer',
            url: 'https://explorer.idchain.one',
        },
    },
    testnet: false,
});
//# sourceMappingURL=idchain.js.map