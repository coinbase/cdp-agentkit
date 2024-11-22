"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modeTestnet = void 0;
const chainConfig_js_1 = require("../../op-stack/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const sourceId = 11_155_111;
exports.modeTestnet = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 919,
    name: 'Mode Testnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://sepolia.mode.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://sepolia.explorer.mode.network',
            apiUrl: 'https://sepolia.explorer.mode.network/api',
        },
    },
    contracts: {
        ...chainConfig_js_1.chainConfig.contracts,
        l2OutputOracle: {
            [sourceId]: {
                address: '0x2634BD65ba27AB63811c74A63118ACb312701Bfa',
                blockCreated: 3778393,
            },
        },
        portal: {
            [sourceId]: {
                address: '0x320e1580effF37E008F1C92700d1eBa47c1B23fD',
                blockCreated: 3778395,
            },
        },
        l1StandardBridge: {
            [sourceId]: {
                address: '0xbC5C679879B2965296756CD959C3C739769995E2',
                blockCreated: 3778392,
            },
        },
        multicall3: {
            address: '0xBAba8373113Fb7a68f195deF18732e01aF8eDfCF',
            blockCreated: 3019007,
        },
    },
    testnet: true,
    sourceId,
});
//# sourceMappingURL=modeTestnet.js.map