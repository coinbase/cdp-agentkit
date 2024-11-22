"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xLayer = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.xLayer = (0, defineChain_js_1.defineChain)({
    id: 196,
    name: 'X Layer Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'OKB',
        symbol: 'OKB',
    },
    rpcUrls: {
        default: { http: ['https://rpc.xlayer.tech'] },
    },
    blockExplorers: {
        default: {
            name: 'OKLink',
            url: 'https://www.oklink.com/xlayer',
            apiUrl: 'https://www.oklink.com/api/v5/explorer/xlayer/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 47416,
        },
    },
});
//# sourceMappingURL=xLayer.js.map