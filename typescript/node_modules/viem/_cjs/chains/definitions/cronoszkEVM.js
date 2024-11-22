"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronoszkEVM = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.cronoszkEVM = (0, defineChain_js_1.defineChain)({
    id: 388,
    name: 'Cronos zkEVM Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Cronos zkEVM CRO',
        symbol: 'zkCRO',
    },
    rpcUrls: {
        default: { http: ['https://mainnet.zkevm.cronos.org'] },
    },
    blockExplorers: {
        default: {
            name: 'Cronos zkEVM (Mainnet) Chain Explorer',
            url: 'https://explorer.zkevm.cronos.org',
        },
    },
});
//# sourceMappingURL=cronoszkEVM.js.map