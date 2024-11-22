"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dchain = void 0;
const chainConfig_js_1 = require("../../op-stack/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.dchain = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 2716446429837000,
    name: 'Dchain',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://dchain-2716446429837000-1.jsonrpc.sagarpc.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Dchain Explorer',
            url: 'https://dchain-2716446429837000-1.sagaexplorer.io',
            apiUrl: 'https://api-dchain-2716446429837000-1.sagaexplorer.io/api',
        },
    },
    contracts: {
        ...chainConfig_js_1.chainConfig.contracts,
    },
});
//# sourceMappingURL=dchain.js.map