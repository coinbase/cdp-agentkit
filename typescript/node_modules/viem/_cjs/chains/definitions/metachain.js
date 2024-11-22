"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metachain = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.metachain = (0, defineChain_js_1.defineChain)({
    id: 571,
    name: 'MetaChain Mainnet',
    nativeCurrency: { name: 'Metatime Coin', symbol: 'MTC', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.metatime.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'MetaExplorer',
            url: 'https://explorer.metatime.com',
        },
    },
    contracts: {
        multicall3: {
            address: '0x0000000000000000000000000000000000003001',
            blockCreated: 0,
        },
    },
});
//# sourceMappingURL=metachain.js.map