"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sei = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.sei = (0, defineChain_js_1.defineChain)({
    id: 1329,
    name: 'Sei Network',
    nativeCurrency: { name: 'Sei', symbol: 'SEI', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://evm-rpc.sei-apis.com/'],
            webSocket: ['wss://evm-ws.sei-apis.com/'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Seitrace',
            url: 'https://seitrace.com',
            apiUrl: 'https://seitrace.com/pacific-1/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        },
    },
});
//# sourceMappingURL=sei.js.map