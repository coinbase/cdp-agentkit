"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bobSepolia = void 0;
const chainConfig_js_1 = require("../../op-stack/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const sourceId = 11_155_111;
exports.bobSepolia = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 808813,
    name: 'BOB Sepolia',
    nativeCurrency: {
        decimals: 18,
        name: 'ETH',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['https://bob-sepolia.rpc.gobob.xyz'],
            webSocket: ['wss://bob-sepolia.rpc.gobob.xyz'],
        },
    },
    blockExplorers: {
        default: {
            name: 'BOB Sepolia Explorer',
            url: 'https://bob-sepolia.explorer.gobob.xyz',
        },
    },
    contracts: {
        ...chainConfig_js_1.chainConfig.contracts,
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 35677,
        },
        l2OutputOracle: {
            [sourceId]: {
                address: '0x14D0069452b4AE2b250B395b8adAb771E4267d2f',
                blockCreated: 4462615,
            },
        },
        portal: {
            [sourceId]: {
                address: '0x867B1Aa872b9C8cB5E9F7755feDC45BB24Ad0ae4',
                blockCreated: 4462615,
            },
        },
    },
    testnet: true,
    sourceId,
});
//# sourceMappingURL=bobSepolia.js.map