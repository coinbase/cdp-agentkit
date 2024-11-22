"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gnosis = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.gnosis = (0, defineChain_js_1.defineChain)({
    id: 100,
    name: 'Gnosis',
    nativeCurrency: {
        decimals: 18,
        name: 'xDAI',
        symbol: 'XDAI',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.gnosischain.com'],
            webSocket: ['wss://rpc.gnosischain.com/wss'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Gnosisscan',
            url: 'https://gnosisscan.io',
            apiUrl: 'https://api.gnosisscan.io/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 21022491,
        },
    },
});
//# sourceMappingURL=gnosis.js.map