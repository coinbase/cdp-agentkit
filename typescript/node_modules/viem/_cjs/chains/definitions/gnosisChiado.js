"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gnosisChiado = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.gnosisChiado = (0, defineChain_js_1.defineChain)({
    id: 10_200,
    name: 'Gnosis Chiado',
    nativeCurrency: {
        decimals: 18,
        name: 'Gnosis',
        symbol: 'xDAI',
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.chiadochain.net'],
            webSocket: ['wss://rpc.chiadochain.net/wss'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Blockscout',
            url: 'https://blockscout.chiadochain.net',
            apiUrl: 'https://blockscout.chiadochain.net/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 4967313,
        },
    },
    testnet: true,
});
//# sourceMappingURL=gnosisChiado.js.map