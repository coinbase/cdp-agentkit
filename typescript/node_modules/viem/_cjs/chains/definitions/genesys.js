"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genesys = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.genesys = (0, defineChain_js_1.defineChain)({
    id: 16507,
    name: 'Genesys Mainnet',
    nativeCurrency: {
        decimals: 18,
        name: 'GSYS',
        symbol: 'GSYS',
    },
    rpcUrls: {
        default: { http: ['https://rpc.genesys.network'] },
    },
    blockExplorers: {
        default: {
            name: 'Genesys Explorer',
            url: 'https://gchainexplorer.genesys.network',
        },
    },
    testnet: false,
});
//# sourceMappingURL=genesys.js.map