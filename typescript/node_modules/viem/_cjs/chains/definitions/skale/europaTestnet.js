"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skaleEuropaTestnet = void 0;
const defineChain_js_1 = require("../../../utils/chain/defineChain.js");
exports.skaleEuropaTestnet = (0, defineChain_js_1.defineChain)({
    id: 1_444_673_419,
    name: 'SKALE Europa Testnet',
    nativeCurrency: { name: 'sFUEL', symbol: 'sFUEL', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://testnet.skalenodes.com/v1/juicy-low-small-testnet'],
            webSocket: ['wss://testnet.skalenodes.com/v1/ws/juicy-low-small-testnet'],
        },
    },
    blockExplorers: {
        default: {
            name: 'SKALE Explorer',
            url: 'https://juicy-low-small-testnet.explorer.testnet.skalenodes.com',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 110_858,
        },
    },
    testnet: true,
});
//# sourceMappingURL=europaTestnet.js.map