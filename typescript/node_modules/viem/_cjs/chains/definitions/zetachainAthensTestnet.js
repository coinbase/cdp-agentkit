"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zetachainAthensTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.zetachainAthensTestnet = (0, defineChain_js_1.defineChain)({
    id: 7001,
    name: 'ZetaChain Athens Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Zeta',
        symbol: 'aZETA',
    },
    rpcUrls: {
        default: {
            http: ['https://zetachain-athens-evm.blockpi.network/v1/rpc/public'],
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 2715217,
        },
    },
    blockExplorers: {
        default: {
            name: 'ZetaScan',
            url: 'https://athens.explorer.zetachain.com',
        },
    },
    testnet: true,
});
//# sourceMappingURL=zetachainAthensTestnet.js.map