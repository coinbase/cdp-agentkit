"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guruNetwork = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.guruNetwork = (0, defineChain_js_1.defineChain)({
    id: 260,
    name: 'Guru Network Mainnet',
    nativeCurrency: {
        name: 'GURU Token',
        symbol: 'GURU',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.gurunetwork.ai/archive/260'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Guruscan',
            url: 'https://scan.gurunetwork.ai',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 271691,
        },
    },
    testnet: false,
});
//# sourceMappingURL=guruNetwork.js.map