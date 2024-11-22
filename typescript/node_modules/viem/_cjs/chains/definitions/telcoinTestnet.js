"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.telcoinTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.telcoinTestnet = (0, defineChain_js_1.defineChain)({
    id: 2017,
    name: 'Telcoin Adiri Testnet',
    nativeCurrency: { name: 'Telcoin', symbol: 'TEL', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.telcoin.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'telscan',
            url: 'https://telscan.io',
        },
    },
    testnet: true,
});
//# sourceMappingURL=telcoinTestnet.js.map