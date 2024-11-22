"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edgeware = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.edgeware = (0, defineChain_js_1.defineChain)({
    id: 2021,
    name: 'Edgeware EdgeEVM Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Edgeware',
        symbol: 'EDG',
    },
    rpcUrls: {
        default: { http: ['https://edgeware-evm.jelliedowl.net'] },
    },
    blockExplorers: {
        default: {
            name: 'Edgscan by Bharathcoorg',
            url: 'https://edgscan.live',
            apiUrl: 'https://edgscan.live/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 18117872,
        },
    },
});
//# sourceMappingURL=edgeware.js.map