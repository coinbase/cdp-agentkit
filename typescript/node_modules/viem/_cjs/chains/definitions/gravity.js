"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gravity = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.gravity = (0, defineChain_js_1.defineChain)({
    id: 1625,
    name: 'Gravity Alpha Mainnet',
    nativeCurrency: { name: 'G', symbol: 'G', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.gravity.xyz'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Gravity Explorer',
            url: 'https://explorer.gravity.xyz',
            apiUrl: 'https://explorer.gravity.xyz/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
            blockCreated: 16851,
        },
    },
});
//# sourceMappingURL=gravity.js.map