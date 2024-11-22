"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bscTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.bscTestnet = (0, defineChain_js_1.defineChain)({
    id: 97,
    name: 'Binance Smart Chain Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'BNB',
        symbol: 'tBNB',
    },
    rpcUrls: {
        default: { http: ['https://data-seed-prebsc-1-s1.bnbchain.org:8545'] },
    },
    blockExplorers: {
        default: {
            name: 'BscScan',
            url: 'https://testnet.bscscan.com',
            apiUrl: 'https://api-testnet.bscscan.com/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 17422483,
        },
    },
    testnet: true,
});
//# sourceMappingURL=bscTestnet.js.map