"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.immutableZkEvm = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.immutableZkEvm = (0, defineChain_js_1.defineChain)({
    id: 13371,
    name: 'Immutable zkEVM',
    nativeCurrency: {
        decimals: 18,
        name: 'Immutable Coin',
        symbol: 'IMX',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.immutable.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Immutable Explorer',
            url: 'https://explorer.immutable.com',
            apiUrl: 'https://explorer.immutable.com/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0x236bdA4589e44e6850f5aC6a74BfCa398a86c6c0',
            blockCreated: 4335972,
        },
    },
});
//# sourceMappingURL=immutableZkEvm.js.map