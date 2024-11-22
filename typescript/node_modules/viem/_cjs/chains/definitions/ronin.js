"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ronin = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.ronin = (0, defineChain_js_1.defineChain)({
    id: 2020,
    name: 'Ronin',
    nativeCurrency: { name: 'RON', symbol: 'RON', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://api.roninchain.com/rpc'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Ronin Explorer',
            url: 'https://app.roninchain.com',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 26023535,
        },
    },
});
//# sourceMappingURL=ronin.js.map