"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dfk = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.dfk = (0, defineChain_js_1.defineChain)({
    id: 53_935,
    name: 'DFK Chain',
    nativeCurrency: {
        decimals: 18,
        name: 'Jewel',
        symbol: 'JEWEL',
    },
    rpcUrls: {
        default: {
            http: ['https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc'],
        },
    },
    blockExplorers: {
        default: {
            name: 'DFKSubnetScan',
            url: 'https://subnets.avax.network/defi-kingdoms',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 14790551,
        },
    },
});
//# sourceMappingURL=dfk.js.map