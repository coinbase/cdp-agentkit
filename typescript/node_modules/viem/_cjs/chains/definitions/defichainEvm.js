"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defichainEvm = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.defichainEvm = (0, defineChain_js_1.defineChain)({
    id: 1130,
    network: 'defichain-evm',
    name: 'DeFiChain EVM Mainnet',
    nativeCurrency: {
        name: 'DeFiChain',
        symbol: 'DFI',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://eth.mainnet.ocean.jellyfishsdk.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'DeFiScan',
            url: 'https://meta.defiscan.live',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 137852,
        },
    },
});
//# sourceMappingURL=defichainEvm.js.map