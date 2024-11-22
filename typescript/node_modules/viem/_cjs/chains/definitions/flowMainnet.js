"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowMainnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.flowMainnet = (0, defineChain_js_1.defineChain)({
    id: 747,
    name: 'FlowEVM Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Flow',
        symbol: 'FLOW',
    },
    rpcUrls: {
        default: {
            http: ['https://mainnet.evm.nodes.onflow.org'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Mainnet Explorer',
            url: 'https://flowdiver.io',
        },
    },
});
//# sourceMappingURL=flowMainnet.js.map