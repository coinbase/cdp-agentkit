"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edgewareTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.edgewareTestnet = (0, defineChain_js_1.defineChain)({
    id: 2022,
    name: 'Beresheet BereEVM Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Testnet EDG',
        symbol: 'tEDG',
    },
    rpcUrls: {
        default: { http: ['https://beresheet-evm.jelliedowl.net'] },
    },
    blockExplorers: {
        default: {
            name: 'Edgscan by Bharathcoorg',
            url: 'https://testnet.edgscan.live',
            apiUrl: 'https://testnet.edgscan.live/api',
        },
    },
});
//# sourceMappingURL=edgewareTestnet.js.map