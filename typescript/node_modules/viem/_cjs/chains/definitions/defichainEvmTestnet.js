"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defichainEvmTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.defichainEvmTestnet = (0, defineChain_js_1.defineChain)({
    id: 1131,
    network: 'defichain-evm-testnet',
    name: 'DeFiChain EVM Testnet',
    nativeCurrency: {
        name: 'DeFiChain',
        symbol: 'DFI',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://eth.testnet.ocean.jellyfishsdk.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'DeFiScan',
            url: 'https://meta.defiscan.live/?network=TestNet',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 156462,
        },
    },
    testnet: true,
});
//# sourceMappingURL=defichainEvmTestnet.js.map