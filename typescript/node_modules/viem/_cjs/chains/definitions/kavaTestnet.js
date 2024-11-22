"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kavaTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.kavaTestnet = (0, defineChain_js_1.defineChain)({
    id: 2221,
    name: 'Kava EVM Testnet',
    network: 'kava-testnet',
    nativeCurrency: {
        name: 'Kava',
        symbol: 'KAVA',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ['https://evm.testnet.kava.io'] },
    },
    blockExplorers: {
        default: {
            name: 'Kava EVM Testnet Explorer',
            url: 'https://testnet.kavascan.com/',
            apiUrl: 'https://testnet.kavascan.com/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xDf1D724A7166261eEB015418fe8c7679BBEa7fd6',
            blockCreated: 7242179,
        },
    },
    testnet: true,
});
//# sourceMappingURL=kavaTestnet.js.map