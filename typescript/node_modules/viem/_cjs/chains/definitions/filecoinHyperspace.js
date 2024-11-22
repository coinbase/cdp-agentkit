"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filecoinHyperspace = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.filecoinHyperspace = (0, defineChain_js_1.defineChain)({
    id: 314_1,
    name: 'Filecoin Hyperspace',
    nativeCurrency: {
        decimals: 18,
        name: 'testnet filecoin',
        symbol: 'tFIL',
    },
    rpcUrls: {
        default: { http: ['https://api.hyperspace.node.glif.io/rpc/v1'] },
    },
    blockExplorers: {
        default: {
            name: 'Filfox',
            url: 'https://hyperspace.filfox.info/en',
        },
    },
    testnet: true,
});
//# sourceMappingURL=filecoinHyperspace.js.map