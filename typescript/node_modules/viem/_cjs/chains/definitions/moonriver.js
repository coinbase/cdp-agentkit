"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moonriver = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.moonriver = (0, defineChain_js_1.defineChain)({
    id: 1285,
    name: 'Moonriver',
    nativeCurrency: {
        decimals: 18,
        name: 'MOVR',
        symbol: 'MOVR',
    },
    rpcUrls: {
        default: {
            http: ['https://moonriver.public.blastapi.io'],
            webSocket: ['wss://moonriver.public.blastapi.io'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Moonscan',
            url: 'https://moonriver.moonscan.io',
            apiUrl: 'https://api-moonriver.moonscan.io/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 1597904,
        },
    },
    testnet: false,
});
//# sourceMappingURL=moonriver.js.map