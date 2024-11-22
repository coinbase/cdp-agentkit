"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zilliqaTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.zilliqaTestnet = (0, defineChain_js_1.defineChain)({
    id: 33101,
    name: 'Zilliqa Testnet',
    network: 'zilliqa-testnet',
    nativeCurrency: { name: 'Zilliqa', symbol: 'ZIL', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://dev-api.zilliqa.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Ethernal',
            url: 'https://evmx.testnet.zilliqa.com',
        },
    },
    testnet: true,
});
//# sourceMappingURL=zilliqaTestnet.js.map