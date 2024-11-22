"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bsc = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.bsc = (0, defineChain_js_1.defineChain)({
    id: 56,
    name: 'BNB Smart Chain',
    nativeCurrency: {
        decimals: 18,
        name: 'BNB',
        symbol: 'BNB',
    },
    rpcUrls: {
        default: { http: ['https://rpc.ankr.com/bsc'] },
    },
    blockExplorers: {
        default: {
            name: 'BscScan',
            url: 'https://bscscan.com',
            apiUrl: 'https://api.bscscan.com/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 15921452,
        },
    },
});
//# sourceMappingURL=bsc.js.map