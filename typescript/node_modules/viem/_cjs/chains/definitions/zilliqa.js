"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zilliqa = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.zilliqa = (0, defineChain_js_1.defineChain)({
    id: 32769,
    name: 'Zilliqa',
    network: 'zilliqa',
    nativeCurrency: { name: 'Zilliqa', symbol: 'ZIL', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://api.zilliqa.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Ethernal',
            url: 'https://evmx.zilliqa.com',
        },
    },
    testnet: false,
});
//# sourceMappingURL=zilliqa.js.map