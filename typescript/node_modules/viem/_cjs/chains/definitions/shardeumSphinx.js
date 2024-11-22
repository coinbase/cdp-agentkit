"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shardeumSphinx = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.shardeumSphinx = (0, defineChain_js_1.defineChain)({
    id: 8082,
    name: 'Shardeum Sphinx',
    nativeCurrency: { name: 'SHARDEUM', symbol: 'SHM', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://sphinx.shardeum.org'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Shardeum Explorer',
            url: 'https://explorer-sphinx.shardeum.org',
        },
    },
    testnet: true,
});
//# sourceMappingURL=shardeumSphinx.js.map