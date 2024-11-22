"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootstockTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.rootstockTestnet = (0, defineChain_js_1.defineChain)({
    id: 31,
    name: 'Rootstock Testnet',
    network: 'rootstock',
    nativeCurrency: {
        decimals: 18,
        name: 'Rootstock Bitcoin',
        symbol: 'tRBTC',
    },
    rpcUrls: {
        default: { http: ['https://public-node.testnet.rsk.co'] },
    },
    blockExplorers: {
        default: {
            name: 'RSK Explorer',
            url: 'https://explorer.testnet.rootstock.io',
        },
    },
    testnet: true,
});
//# sourceMappingURL=rootstockTestnet.js.map