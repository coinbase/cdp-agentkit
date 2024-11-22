"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saakuru = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.saakuru = (0, defineChain_js_1.defineChain)({
    id: 7225878,
    name: 'Saakuru Mainnet',
    nativeCurrency: { name: 'OAS', symbol: 'OAS', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.saakuru.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Saakuru Explorer',
            url: 'https://explorer.saakuru.network',
        },
    },
    testnet: false,
});
//# sourceMappingURL=saakuru.js.map