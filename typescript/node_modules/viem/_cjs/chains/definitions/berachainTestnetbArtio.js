"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.berachainTestnetbArtio = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.berachainTestnetbArtio = (0, defineChain_js_1.defineChain)({
    id: 80084,
    name: 'Berachain bArtio',
    nativeCurrency: {
        decimals: 18,
        name: 'BERA Token',
        symbol: 'BERA',
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 109269,
        },
    },
    rpcUrls: {
        default: { http: ['https://bartio.rpc.berachain.com'] },
    },
    blockExplorers: {
        default: {
            name: 'Berachain bArtio Beratrail',
            url: 'https://bartio.beratrail.io',
        },
    },
    testnet: true,
});
//# sourceMappingURL=berachainTestnetbArtio.js.map