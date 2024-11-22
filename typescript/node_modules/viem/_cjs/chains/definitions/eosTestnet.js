"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eosTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.eosTestnet = (0, defineChain_js_1.defineChain)({
    id: 15557,
    name: 'EOS EVM Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'EOS',
        symbol: 'EOS',
    },
    rpcUrls: {
        default: { http: ['https://api.testnet.evm.eosnetwork.com'] },
    },
    blockExplorers: {
        default: {
            name: 'EOS EVM Testnet Explorer',
            url: 'https://explorer.testnet.evm.eosnetwork.com',
            apiUrl: 'https://explorer.testnet.evm.eosnetwork.com/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 9067940,
        },
    },
    testnet: true,
});
//# sourceMappingURL=eosTestnet.js.map