"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hychainTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.hychainTestnet = (0, defineChain_js_1.defineChain)({
    id: 29112,
    name: 'HYCHAIN Testnet',
    nativeCurrency: { name: 'HYTOPIA', symbol: 'TOPIA', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc.hychain.com/http'] },
    },
    blockExplorers: {
        default: {
            name: 'HYCHAIN Explorer',
            url: 'https://testnet-rpc.hychain.com/http',
        },
    },
    testnet: true,
});
//# sourceMappingURL=hychainTestnet.js.map