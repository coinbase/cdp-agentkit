"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fraxtalTestnet = void 0;
const chainConfig_js_1 = require("../../op-stack/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const sourceId = 17000;
exports.fraxtalTestnet = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 2522,
    name: 'Fraxtal Testnet',
    nativeCurrency: { name: 'Frax Ether', symbol: 'frxETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.testnet.frax.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'fraxscan testnet',
            url: 'https://holesky.fraxscan.com',
            apiUrl: 'https://api-holesky.fraxscan.com/api',
        },
    },
    contracts: {
        ...chainConfig_js_1.chainConfig.contracts,
        l2OutputOracle: {
            [sourceId]: {
                address: '0x715EA64DA13F4d0831ece4Ad3E8c1aa013167F32',
            },
        },
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
        },
        portal: {
            [sourceId]: {
                address: '0xB9c64BfA498d5b9a8398Ed6f46eb76d90dE5505d',
                blockCreated: 318416,
            },
        },
        l1StandardBridge: {
            [sourceId]: {
                address: '0x0BaafC217162f64930909aD9f2B27125121d6332',
                blockCreated: 318416,
            },
        },
    },
    sourceId,
});
//# sourceMappingURL=fraxtalTestnet.js.map