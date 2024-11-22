"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metachainIstanbul = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.metachainIstanbul = (0, defineChain_js_1.defineChain)({
    id: 1_453,
    name: 'MetaChain Istanbul',
    nativeCurrency: { name: 'Metatime Coin', symbol: 'MTC', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://istanbul-rpc.metachain.dev'],
        },
    },
    blockExplorers: {
        default: {
            name: 'MetaExplorer',
            url: 'https://istanbul-explorer.metachain.dev',
        },
    },
    contracts: {
        multicall3: {
            address: '0x0000000000000000000000000000000000003001',
            blockCreated: 0,
        },
    },
    testnet: true,
});
//# sourceMappingURL=metachainIstanbul.js.map