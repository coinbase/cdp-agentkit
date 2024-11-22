"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xaiTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.xaiTestnet = (0, defineChain_js_1.defineChain)({
    id: 37714555429,
    name: 'Xai Testnet',
    nativeCurrency: { name: 'sXai', symbol: 'sXAI', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://testnet-v2.xai-chain.net/rpc'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://testnet-explorer-v2.xai-chain.net',
        },
    },
    testnet: true,
});
//# sourceMappingURL=xaiTestnet.js.map