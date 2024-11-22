"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b3 = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const sourceId = 8453;
exports.b3 = (0, defineChain_js_1.defineChain)({
    id: 8333,
    name: 'B3',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://mainnet-rpc.b3.fun/http'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://explorer.b3.fun',
        },
    },
    sourceId,
});
//# sourceMappingURL=b3.js.map