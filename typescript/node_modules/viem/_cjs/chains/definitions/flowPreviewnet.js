"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowPreviewnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.flowPreviewnet = (0, defineChain_js_1.defineChain)({
    id: 646,
    name: 'FlowEVM Previewnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Flow',
        symbol: 'FLOW',
    },
    rpcUrls: {
        default: {
            http: ['https://previewnet.evm.nodes.onflow.org'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Previewnet Explorer',
            url: 'https://previewnet.flowdiver.io',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 6205,
        },
    },
});
//# sourceMappingURL=flowPreviewnet.js.map