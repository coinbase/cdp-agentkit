"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seiTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.seiTestnet = (0, defineChain_js_1.defineChain)({
    id: 1328,
    name: 'Sei Testnet',
    nativeCurrency: { name: 'Sei', symbol: 'SEI', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://evm-rpc-testnet.sei-apis.com'],
            webSocket: ['wss://evm-ws-testnet.sei-apis.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Seitrace',
            url: 'https://seitrace.com',
        },
    },
    testnet: true,
});
//# sourceMappingURL=seiTestnet.js.map