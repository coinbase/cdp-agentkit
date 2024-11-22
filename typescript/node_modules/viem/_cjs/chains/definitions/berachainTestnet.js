"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.berachainTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.berachainTestnet = (0, defineChain_js_1.defineChain)({
    id: 80085,
    name: 'Berachain Artio',
    nativeCurrency: {
        decimals: 18,
        name: 'BERA Token',
        symbol: 'BERA',
    },
    rpcUrls: {
        default: { http: ['https://artio.rpc.berachain.com'] },
    },
    blockExplorers: {
        default: {
            name: 'Berachain',
            url: 'https://artio.beratrail.io',
        },
    },
    testnet: true,
});
//# sourceMappingURL=berachainTestnet.js.map