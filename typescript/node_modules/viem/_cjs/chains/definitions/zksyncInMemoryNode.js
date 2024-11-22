"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zksyncInMemoryNode = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const chainConfig_js_1 = require("../../zksync/chainConfig.js");
exports.zksyncInMemoryNode = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 260,
    name: 'ZKsync InMemory Node',
    network: 'zksync-in-memory-node',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['http://localhost:8011'],
        },
    },
    testnet: true,
});
//# sourceMappingURL=zksyncInMemoryNode.js.map