"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lavita = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.lavita = (0, defineChain_js_1.defineChain)({
    id: 360890,
    name: 'LAVITA Mainnet',
    nativeCurrency: { name: 'vTFUEL', symbol: 'vTFUEL', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://tsub360890-eth-rpc.thetatoken.org/rpc'],
        },
    },
    blockExplorers: {
        default: {
            name: 'LAVITA Explorer',
            url: 'https://tsub360890-explorer.thetatoken.org',
        },
    },
    testnet: false,
});
//# sourceMappingURL=lavita.js.map