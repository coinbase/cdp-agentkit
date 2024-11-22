"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kava = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.kava = (0, defineChain_js_1.defineChain)({
    id: 2222,
    name: 'Kava EVM',
    network: 'kava-mainnet',
    nativeCurrency: {
        name: 'Kava',
        symbol: 'KAVA',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ['https://evm.kava.io'] },
    },
    blockExplorers: {
        default: {
            name: 'Kava EVM Explorer',
            url: 'https://kavascan.com',
            apiUrl: 'https://kavascan.com/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 3661165,
        },
    },
    testnet: false,
});
//# sourceMappingURL=kava.js.map