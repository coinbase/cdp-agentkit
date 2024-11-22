"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disChain = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.disChain = (0, defineChain_js_1.defineChain)({
    id: 513100,
    name: 'DisChain',
    nativeCurrency: {
        decimals: 18,
        name: 'DIS',
        symbol: 'DIS',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.dischain.xyz'],
        },
    },
    blockExplorers: {
        default: {
            name: 'DisChain Explorer',
            url: 'https://www.oklink.com/dis',
        },
    },
});
//# sourceMappingURL=disChain.js.map