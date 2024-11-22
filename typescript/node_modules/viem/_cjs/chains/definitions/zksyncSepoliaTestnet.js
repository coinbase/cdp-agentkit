"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zksyncSepoliaTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const chainConfig_js_1 = require("../../zksync/chainConfig.js");
exports.zksyncSepoliaTestnet = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 300,
    name: 'ZKsync Sepolia Testnet',
    network: 'zksync-sepolia-testnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://sepolia.era.zksync.dev'],
            webSocket: ['wss://sepolia.era.zksync.dev/ws'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Etherscan',
            url: 'https://sepolia-era.zksync.network/',
            apiUrl: 'https://api-sepolia-era.zksync.network/api',
        },
        native: {
            name: 'ZKsync Explorer',
            url: 'https://sepolia.explorer.zksync.io/',
            blockExplorerApi: 'https://block-explorer-api.sepolia.zksync.dev/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xF9cda624FBC7e059355ce98a31693d299FACd963',
        },
        universalSignatureVerifier: {
            address: '0xfB688330379976DA81eB64Fe4BF50d7401763B9C',
            blockCreated: 3855712,
        },
    },
    testnet: true,
});
//# sourceMappingURL=zksyncSepoliaTestnet.js.map