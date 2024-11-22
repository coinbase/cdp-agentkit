"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zoraTestnet = void 0;
const chainConfig_js_1 = require("../../op-stack/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
const sourceId = 5;
exports.zoraTestnet = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 999,
    name: 'Zora Goerli Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Zora Goerli',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['https://testnet.rpc.zora.energy'],
            webSocket: ['wss://testnet.rpc.zora.energy'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Explorer',
            url: 'https://testnet.explorer.zora.energy',
            apiUrl: 'https://testnet.explorer.zora.energy/api',
        },
    },
    contracts: {
        ...chainConfig_js_1.chainConfig.contracts,
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 189123,
        },
        portal: {
            [sourceId]: {
                address: '0xDb9F51790365e7dc196e7D072728df39Be958ACe',
            },
        },
    },
    sourceId,
    testnet: true,
});
//# sourceMappingURL=zoraTestnet.js.map