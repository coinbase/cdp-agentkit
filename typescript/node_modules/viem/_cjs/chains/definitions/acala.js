"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acala = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.acala = (0, defineChain_js_1.defineChain)({
    id: 787,
    name: 'Acala',
    network: 'acala',
    nativeCurrency: {
        name: 'Acala',
        symbol: 'ACA',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://eth-rpc-acala.aca-api.network'],
            webSocket: ['wss://eth-rpc-acala.aca-api.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Acala Blockscout',
            url: 'https://blockscout.acala.network',
            apiUrl: 'https://blockscout.acala.network/api',
        },
    },
    testnet: false,
});
//# sourceMappingURL=acala.js.map