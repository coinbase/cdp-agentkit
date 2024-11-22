"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.harmonyOne = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.harmonyOne = (0, defineChain_js_1.defineChain)({
    id: 1_666_600_000,
    name: 'Harmony One',
    nativeCurrency: {
        name: 'Harmony',
        symbol: 'ONE',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ['https://rpc.ankr.com/harmony'] },
    },
    blockExplorers: {
        default: {
            name: 'Harmony Explorer',
            url: 'https://explorer.harmony.one',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 24185753,
        },
    },
});
//# sourceMappingURL=harmonyOne.js.map