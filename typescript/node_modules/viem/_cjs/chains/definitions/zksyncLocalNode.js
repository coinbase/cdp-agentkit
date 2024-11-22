"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zksyncLocalNode = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const chainConfig_js_1 = require("../../zksync/chainConfig.js");
exports.zksyncLocalNode = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 270,
    name: 'ZKsync CLI Local Node',
    network: 'zksync-cli-local-node',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['http://localhost:3050'],
        },
    },
    testnet: true,
});
//# sourceMappingURL=zksyncLocalNode.js.map