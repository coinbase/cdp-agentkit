"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skaleNebula = void 0;
const defineChain_js_1 = require("../../../utils/chain/defineChain.js");
exports.skaleNebula = (0, defineChain_js_1.defineChain)({
    id: 1_482_601_649,
    name: 'SKALE | Nebula Gaming Hub',
    nativeCurrency: { name: 'sFUEL', symbol: 'sFUEL', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://mainnet.skalenodes.com/v1/green-giddy-denebola'],
            webSocket: ['wss://mainnet.skalenodes.com/v1/ws/green-giddy-denebola'],
        },
    },
    blockExplorers: {
        default: {
            name: 'SKALE Explorer',
            url: 'https://green-giddy-denebola.explorer.mainnet.skalenodes.com',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 2372986,
        },
    },
});
//# sourceMappingURL=nebula.js.map