"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.funkiMainnet = void 0;
const chainConfig_js_1 = require("../../op-stack/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const sourceId = 1;
exports.funkiMainnet = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 33979,
    name: 'Funki',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc-mainnet.funkichain.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Funki Mainnet Explorer',
            url: 'https://funkiscan.io',
        },
    },
    contracts: {
        ...chainConfig_js_1.chainConfig.contracts,
    },
    sourceId,
});
//# sourceMappingURL=funkiMainnet.js.map