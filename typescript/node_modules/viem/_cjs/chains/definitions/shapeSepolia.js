"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shapeSepolia = void 0;
const chainConfig_js_1 = require("../../op-stack/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const sourceId = 11_155_111;
exports.shapeSepolia = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 11_011,
    name: 'Shape Sepolia Testnet',
    nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://sepolia.shape.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'blockscout',
            url: 'https://explorer-sepolia.shape.network/',
            apiUrl: 'https://explorer-sepolia.shape.network/api/v2',
        },
    },
    contracts: {
        ...chainConfig_js_1.chainConfig.contracts,
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 1,
        },
    },
    testnet: true,
    sourceId,
});
//# sourceMappingURL=shapeSepolia.js.map