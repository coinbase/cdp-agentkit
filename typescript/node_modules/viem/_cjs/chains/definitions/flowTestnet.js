"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.flowTestnet = (0, defineChain_js_1.defineChain)({
    id: 545,
    name: 'FlowEVM Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Flow',
        symbol: 'FLOW',
    },
    rpcUrls: {
        default: {
            http: ['https://testnet.evm.nodes.onflow.org'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Flow Diver',
            url: 'https://testnet.flowdiver.io',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 137518,
        },
    },
});
//# sourceMappingURL=flowTestnet.js.map