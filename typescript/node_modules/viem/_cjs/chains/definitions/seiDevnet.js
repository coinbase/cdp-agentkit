"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seiDevnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.seiDevnet = (0, defineChain_js_1.defineChain)({
    id: 713_715,
    name: 'Sei Devnet',
    nativeCurrency: { name: 'Sei', symbol: 'SEI', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://evm-rpc-arctic-1.sei-apis.com'],
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
//# sourceMappingURL=seiDevnet.js.map