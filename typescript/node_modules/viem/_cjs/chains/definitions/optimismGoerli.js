"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimismGoerli = void 0;
const chainConfig_js_1 = require("../../op-stack/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const sourceId = 5;
exports.optimismGoerli = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 420,
    name: 'Optimism Goerli',
    nativeCurrency: { name: 'Goerli Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://goerli.optimism.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Etherscan',
            url: 'https://goerli-optimism.etherscan.io',
            apiUrl: 'https://goerli-optimism.etherscan.io/api',
        },
    },
    contracts: {
        ...chainConfig_js_1.chainConfig.contracts,
        l2OutputOracle: {
            [sourceId]: {
                address: '0xE6Dfba0953616Bacab0c9A8ecb3a9BBa77FC15c0',
            },
        },
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 49461,
        },
        portal: {
            [sourceId]: {
                address: '0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383',
            },
        },
        l1StandardBridge: {
            [sourceId]: {
                address: '0x636Af16bf2f682dD3109e60102b8E1A089FedAa8',
            },
        },
    },
    testnet: true,
    sourceId,
});
//# sourceMappingURL=optimismGoerli.js.map