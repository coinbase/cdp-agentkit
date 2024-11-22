"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dchainTestnet = void 0;
const chainConfig_js_1 = require("../../op-stack/chainConfig.js");
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.dchainTestnet = (0, defineChain_js_1.defineChain)({
    ...chainConfig_js_1.chainConfig,
    id: 2713017997578000,
    name: 'Dchain Testnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: [
                'https://dchaintestnet-2713017997578000-1.jsonrpc.testnet.sagarpc.io',
            ],
        },
    },
    blockExplorers: {
        default: {
            name: 'Dchain Explorer',
            url: 'https://dchaintestnet-2713017997578000-1.testnet.sagaexplorer.io',
            apiUrl: 'https://api-dchaintestnet-2713017997578000-1.testnet.sagaexplorer.io/api',
        },
    },
    contracts: {
        ...chainConfig_js_1.chainConfig.contracts,
    },
});
//# sourceMappingURL=dchainTestnet.js.map