"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inkSepolia = void 0;
const chainConfig_js_1 = require("../../op-stack/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const sourceId = 11_155_111;
exports.inkSepolia = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 763373,
    name: 'Ink Sepolia',
    nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc-gel-sepolia.inkonchain.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://explorer-sepolia.inkonchain.com/',
            apiUrl: 'https://explorer-sepolia.inkonchain.com/api/v2',
        },
    },
    contracts: {
        ...chainConfig_js_1.chainConfig.contracts,
        disputeGameFactory: {
            [sourceId]: {
                address: '0x860e626c700af381133d9f4af31412a2d1db3d5d',
            },
        },
        portal: {
            [sourceId]: {
                address: '0x5c1d29c6c9c8b0800692acc95d700bcb4966a1d7',
            },
        },
        l1StandardBridge: {
            [sourceId]: {
                address: '0x33f60714bbd74d62b66d79213c348614de51901c',
            },
        },
    },
    testnet: true,
    sourceId,
});
//# sourceMappingURL=inkSepolia.js.map