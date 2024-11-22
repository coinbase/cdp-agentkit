"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redstone = void 0;
const chainConfig_js_1 = require("../../op-stack/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const sourceId = 1;
exports.redstone = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    name: 'Redstone',
    id: 690,
    sourceId,
    nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
    rpcUrls: {
        default: {
            http: ['https://rpc.redstonechain.com'],
            webSocket: ['wss://rpc.redstonechain.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://explorer.redstone.xyz',
        },
    },
    contracts: {
        ...chainConfig_js_1.chainConfig.contracts,
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
        },
        portal: {
            [sourceId]: {
                address: '0xC7bCb0e8839a28A1cFadd1CF716de9016CdA51ae',
                blockCreated: 19578329,
            },
        },
        l2OutputOracle: {
            [sourceId]: {
                address: '0xa426A052f657AEEefc298b3B5c35a470e4739d69',
                blockCreated: 19578337,
            },
        },
        l1StandardBridge: {
            [sourceId]: {
                address: '0xc473ca7E02af24c129c2eEf51F2aDf0411c1Df69',
                blockCreated: 19578331,
            },
        },
    },
});
//# sourceMappingURL=redstone.js.map