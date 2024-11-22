"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zksync = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const chainConfig_js_1 = require("../../zksync/chainConfig.js");
exports.zksync = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 324,
    name: 'ZKsync Era',
    network: 'zksync-era',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['https://mainnet.era.zksync.io'],
            webSocket: ['wss://mainnet.era.zksync.io/ws'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Etherscan',
            url: 'https://era.zksync.network/',
            apiUrl: 'https://api-era.zksync.network/api',
        },
        native: {
            name: 'ZKsync Explorer',
            url: 'https://explorer.zksync.io/',
            apiUrl: 'https://block-explorer-api.mainnet.zksync.io/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xF9cda624FBC7e059355ce98a31693d299FACd963',
        },
        universalSignatureVerifier: {
            address: '0xfB688330379976DA81eB64Fe4BF50d7401763B9C',
            blockCreated: 45659388,
        },
    },
});
//# sourceMappingURL=zksync.js.map