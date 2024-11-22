"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skaleTitanTestnet = void 0;
const defineChain_js_1 = require("../../../utils/chain/defineChain.js");
exports.skaleTitanTestnet = (0, defineChain_js_1.defineChain)({
    id: 1_020_352_220,
    name: 'SKALE Titan Hub',
    nativeCurrency: { name: 'sFUEL', symbol: 'sFUEL', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://testnet.skalenodes.com/v1/aware-fake-trim-testnet'],
            webSocket: ['wss://testnet.skalenodes.com/v1/ws/aware-fake-trim-testnet'],
        },
    },
    blockExplorers: {
        default: {
            name: 'SKALE Explorer',
            url: 'https://aware-fake-trim-testnet.explorer.testnet.skalenodes.com',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 104_072,
        },
    },
    testnet: true,
});
//# sourceMappingURL=titanTestnet.js.map