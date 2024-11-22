"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fantom = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.fantom = (0, defineChain_js_1.defineChain)({
    id: 250,
    name: 'Fantom',
    nativeCurrency: {
        decimals: 18,
        name: 'Fantom',
        symbol: 'FTM',
    },
    rpcUrls: {
        default: { http: ['https://rpc.ankr.com/fantom'] },
    },
    blockExplorers: {
        default: {
            name: 'FTMScan',
            url: 'https://ftmscan.com',
            apiUrl: 'https://api.ftmscan.com/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 33001987,
        },
    },
});
//# sourceMappingURL=fantom.js.map