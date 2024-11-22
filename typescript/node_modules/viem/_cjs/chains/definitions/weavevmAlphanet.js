"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weaveVMAlphanet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.weaveVMAlphanet = (0, defineChain_js_1.defineChain)({
    id: 9496,
    name: 'WeaveVM Alphanet',
    nativeCurrency: { name: 'Testnet WeaveVM', symbol: 'tWVM', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://testnet-rpc.wvm.dev'] },
    },
    blockExplorers: {
        default: {
            name: 'WeaveVM Alphanet Explorer',
            url: 'https://explorer.wvm.dev',
        },
    },
    testnet: true,
});
//# sourceMappingURL=weavevmAlphanet.js.map