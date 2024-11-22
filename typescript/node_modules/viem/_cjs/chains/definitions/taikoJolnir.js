"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taikoJolnir = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.taikoJolnir = (0, defineChain_js_1.defineChain)({
    id: 167007,
    name: 'Taiko Jolnir (Alpha-5 Testnet)',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc.jolnir.taiko.xyz'],
        },
    },
    blockExplorers: {
        default: {
            name: 'blockscout',
            url: 'https://explorer.jolnir.taiko.xyz',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 732706,
        },
    },
    testnet: true,
});
//# sourceMappingURL=taikoJolnir.js.map