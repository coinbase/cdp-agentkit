"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronoszkEVMTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.cronoszkEVMTestnet = (0, defineChain_js_1.defineChain)({
    id: 282,
    name: 'Cronos zkEVM Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Cronos zkEVM Test Coin',
        symbol: 'zkTCRO',
    },
    rpcUrls: {
        default: { http: ['https://testnet.zkevm.cronos.org'] },
    },
    blockExplorers: {
        default: {
            name: 'Cronos zkEVM Testnet Explorer',
            url: 'https://explorer.zkevm.cronos.org/testnet',
        },
    },
    testnet: true,
});
//# sourceMappingURL=cronoszkEVMTestnet.js.map